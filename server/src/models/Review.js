import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Comment is required'],
      trim: true,
      maxlength: [500, 'Comment cannot exceed 500 characters'],
    },
    helpful: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure user can only review a product once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Static method to calculate average rating for a product
reviewSchema.statics.calcAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: '$product',
        avgRating: { $avg: '$rating' },
        numRating: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    const Product = mongoose.model('Product');
    await Product.findByIdAndUpdate(productId, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      reviewsCount: stats[0].numRating,
    });
  } else {
    const Product = mongoose.model('Product');
    await Product.findByIdAndUpdate(productId, {
      rating: 0,
      reviewsCount: 0,
    });
  }
};

// Update product rating after save
reviewSchema.post('save', function () {
  this.constructor.calcAverageRating(this.product);
});

// Update product rating after remove
reviewSchema.post('findOneAndDelete', function (doc) {
  if (doc) {
    doc.constructor.calcAverageRating(doc.product);
  }
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
