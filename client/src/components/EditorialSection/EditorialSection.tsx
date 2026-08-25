import './EditorialSection.css';

const EditorialSection = () => {
  return (
    <section className="editorial-section">
      <div className="editorial-section__container">
        <div className="editorial-section__images">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=90"
            alt="Fashion editorial"
            className="editorial-section__image editorial-section__image--1"
          />
          <img
            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&q=90"
            alt="Fashion editorial"
            className="editorial-section__image editorial-section__image--2"
          />
        </div>

        <div className="editorial-section__content">
          <h2 className="editorial-section__title">
            A modern collection built on comfort,<br />
            <span className="editorial-section__title--blur">precision,</span> and style.
          </h2>
          <p className="editorial-section__description">
            Discover expertly crafted pieces designed<br />
            for timeless moments.
          </p>
        </div>
      </div>
    </section>
  );
};

export default EditorialSection;
