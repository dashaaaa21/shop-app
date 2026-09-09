import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
import './AboutPage.css';

const values = [
  {
    icon: '✦',
    title: 'Timeless Design',
    description:
      'We reject the cycle of fast fashion. Every piece is conceived to transcend seasons — to be worn, loved, and passed on.',
  },
  {
    icon: '◈',
    title: 'Responsible Craft',
    description:
      'Our fabrics are sourced from certified mills in Italy, Portugal and Japan. We trace every thread back to its origin.',
  },
  {
    icon: '◇',
    title: 'Quiet Luxury',
    description:
      'No logos. No noise. Only proportion, texture, and the confidence of a woman who knows exactly who she is.',
  },
  {
    icon: '○',
    title: 'Made to Last',
    description:
      'Each garment is cut and finished by hand in small batches. We offer free repairs for life — because we mean it.',
  },
];

const team = [
  {
    name: 'Léa Morin',
    role: 'Creative Director',
    image:
      'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=700&fit=crop&q=80',
    quote: '"Fashion should feel like a second skin, not a costume."',
  },
  {
    name: 'Sofía Reyes',
    role: 'Head of Design',
    image:
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&h=700&fit=crop&q=80',
    quote: '"Restraint is the most radical thing you can do right now."',
  },
  {
    name: 'Nadia Khoury',
    role: 'Head of Production',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=700&fit=crop&q=80',
    quote: '"Every seam is a decision. We make them carefully."',
  },
];

const editorialImages = [
  {
    src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&q=80',
    alt: 'Editorial — structured coat',
  },
  {
    src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80',
    alt: 'Editorial — evening silhouette',
  },
  {
    src: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&h=1000&fit=crop&q=80',
    alt: 'Editorial — tailored separates',
  },
  {
    src: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&q=80',
    alt: 'Editorial — minimalist dress',
  },
];

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'About — VALORÉ';
  }, []);

  return (
    <div className="about-page">
      <Header />

      {/* ── HERO VIDEO BANNER ── */}
      <section className="about-hero">
        <div className="about-hero__media">
          {/* Looping fashion gif via a public Unsplash video */}
          <video
            className="about-hero__video"
            autoPlay
            muted
            loop
            playsInline
            poster="https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=1600&h=900&fit=crop&q=85"
          >
            <source
              src="https://videos.pexels.com/video-files/3770494/3770494-uhd_2560_1440_25fps.mp4"
              type="video/mp4"
            />
          </video>
          <div className="about-hero__overlay" />
          <div className="about-hero__content">
            <p className="about-hero__eyebrow">Est. 2019 · Paris</p>
            <h1 className="about-hero__title">
              Dressed with<br />
              <em>intention.</em>
            </h1>
            <p className="about-hero__subtitle">
              VALORÉ is a fashion house built on the belief that true style<br />
              is deliberate, sustainable, and quietly extraordinary.
            </p>
          </div>
          <div className="about-hero__scroll">
            <span />
          </div>
        </div>
      </section>

      {/* ── BRAND STORY ── */}
      <section className="about-story">
        <div className="container">
          <div className="about-story__grid">
            <div className="about-story__text">
              <p className="about-story__label">Our Story</p>
              <h2 className="about-story__title">
                Born from a frustration<br />with the disposable.
              </h2>
              <p className="about-story__body">
                VALORÉ was founded in 2019 by a trio of women who had spent
                a decade inside the fashion industry — and grown tired of it.
                Tired of collections that expired before they arrived. Tired of
                fabrics that told no story. Tired of clothing designed to be
                replaced, not remembered.
              </p>
              <p className="about-story__body">
                So they started over. With a shared atelier in the 11th
                arrondissement, a commitment to working only with heritage mills,
                and a radical premise: what if a brand only made things worth
                keeping?
              </p>
              <p className="about-story__body">
                Five years on, VALORÉ dresses women across 40 countries. The
                atelier is still in the 11th. The premise hasn't changed.
              </p>
              <Link to="/collection" className="about-story__cta">
                Explore the Collection →
              </Link>
            </div>
            <div className="about-story__images">
              <div className="about-story__img-main">
                <img
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=900&fit=crop&q=85"
                  alt="VALORÉ atelier"
                />
              </div>
              <div className="about-story__img-accent">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&h=500&fit=crop&q=85"
                  alt="Fabric detail"
                />
                <div className="about-story__stat-card">
                  <span className="about-story__stat-number">40+</span>
                  <span className="about-story__stat-label">Countries</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="about-values">
        <div className="container">
          <div className="about-values__header">
            <p className="about-values__label">What We Stand For</p>
            <h2 className="about-values__title">Four principles.<br />No exceptions.</h2>
          </div>
          <div className="about-values__grid">
            {values.map((v) => (
              <div key={v.title} className="about-values__card">
                <span className="about-values__icon">{v.icon}</span>
                <h3 className="about-values__card-title">{v.title}</h3>
                <p className="about-values__card-text">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL STRIP ── */}
      <section className="about-editorial">
        <div className="about-editorial__track">
          {editorialImages.map((img, i) => (
            <div key={i} className="about-editorial__item">
              <img src={img.src} alt={img.alt} />
            </div>
          ))}
        </div>
        <div className="about-editorial__caption">
          <p>AW 2026 — "Solitude in Form"</p>
        </div>
      </section>

      {/* ── MANIFESTO ── */}
      <section className="about-manifesto">
        <div className="container">
          <blockquote className="about-manifesto__quote">
            "We don't design trends.<br />
            We design<em> witnesses</em> —<br />
            garments that absorb your life<br />
            and give it back to you,<br />
            season after season."
          </blockquote>
          <p className="about-manifesto__author">— Léa Morin, Creative Director</p>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="about-team">
        <div className="container">
          <div className="about-team__header">
            <p className="about-team__label">The People</p>
            <h2 className="about-team__title">Behind every stitch.</h2>
          </div>
          <div className="about-team__grid">
            {team.map((member) => (
              <div key={member.name} className="about-team__card">
                <div className="about-team__photo">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="about-team__info">
                  <h3 className="about-team__name">{member.name}</h3>
                  <p className="about-team__role">{member.role}</p>
                  <p className="about-team__quote">{member.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NUMBERS ── */}
      <section className="about-numbers">
        <div className="container">
          <div className="about-numbers__grid">
            {[
              { num: '2019', label: 'Founded' },
              { num: '12', label: 'Heritage Mills' },
              { num: '40+', label: 'Countries' },
              { num: '∞', label: 'Free Repairs' },
            ].map((item) => (
              <div key={item.label} className="about-numbers__item">
                <span className="about-numbers__num">{item.num}</span>
                <span className="about-numbers__label">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
      <Footer />
    </div>
  );
};

export default AboutPage;
