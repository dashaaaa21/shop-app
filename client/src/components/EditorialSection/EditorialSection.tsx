import './EditorialSection.css';

const EditorialSection = () => {
  return (
    <section className="editorial-section">
      <div className="editorial-section__container">
        <div className="editorial-section__images">
          <img
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=90"
            alt="Fashion editorial"
            className="editorial-section__image editorial-section__image--1"
          />
          <img
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=500&q=90"
            alt="Fashion editorial"
            className="editorial-section__image editorial-section__image--2"
          />
        </div>

        <div className="editorial-section__content">
          <h2 className="editorial-section__title">
            Crafted for those who believe<br />
            <span className="editorial-section__title--blur">elegance</span> is never accidental.
          </h2>
          <p className="editorial-section__description">
            Every piece in our new collection is designed<br />
            to outlast trends and outlive seasons.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
