import { useState } from 'react';
import './Newsletter.css';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      console.log('Newsletter signup:', email);
      setIsSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setIsSubmitted(false);
      }, 3000);
    }
  };

  return (
    <section className="newsletter">
      <div className="newsletter__container">
        <div className="newsletter__content">
          <h2 className="newsletter__title">Stay Connected</h2>
          <p className="newsletter__description">
            Subscribe to receive updates on new arrivals, special offers, and exclusive content.
          </p>

          {!isSubmitted ? (
            <form className="newsletter__form" onSubmit={handleSubmit}>
              <input
                type="email"
                className="newsletter__input"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="newsletter__button">
                Subscribe
              </button>
            </form>
          ) : (
            <p className="newsletter__success">Thank you for subscribing!</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
