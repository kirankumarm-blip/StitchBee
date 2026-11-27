import React from 'react';
import { ArrowRight } from 'lucide-react';

const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Select Your Service',
    description:
      'Choose from stitching, customization, repair, restoration and shopping services.',
    image:
      'https://www.image2url.com/r2/default/images/1795766238112-66278256-8ffd-4d51-9cee-8b8477b069a6.jpg',
    alt: 'Customer browsing StitchBeez stitching, leather bags, footwear, and customization services on smartphone',
  },
  {
    number: '02',
    title: 'Share Your Requirements',
    description:
      'Upload reference photos, select materials, provide customization details and measurements wherever applicable.',
    image:
      'https://www.image2url.com/r2/default/images/1795766287769-cb7fa53a-caa0-46dc-982b-cb47c1919510.jpg',
    alt: 'Customer sharing reference designs on smartphone with fabric swatches, leather samples, and measuring tape',
  },
  {
    number: '03',
    title: 'Confirm Your Order',
    description:
      'Connect with a suitable professional, review the quotation and confirm your order.',
    image:
      'https://www.image2url.com/r2/default/images/1795766319790-19afe00c-3e63-4315-a1c0-32997d44eb5a.jpg',
    alt: 'Craftsman reviewing customer materials and customization details in workshop',
  },
  {
    number: '04',
    title: 'Receive Your Order',
    description:
      'Receive your finished creation, customized product or restored item.',
    image:
      'https://www.image2url.com/r2/default/images/1795766415092-37b59a3e-62f9-4633-96d9-7a1a411b68c4.jpg',
    alt: 'Customer receiving finished StitchBeez parcel at doorstep',
  },
];

export default function HowStitchBeezWorks({ theme = 'light', onExploreServices }) {
  const isLight = theme === 'light';

  const handleExploreClick = () => {
    if (onExploreServices) {
      onExploreServices();
      return;
    }
    const categoriesEl = document.getElementById('categories-section');
    if (categoriesEl) {
      categoriesEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="how-it-works"
      className={`hiw-section ${isLight ? 'is-light' : 'is-dark'}`}
      aria-labelledby="hiw-heading"
    >
      <div className="landing-container hiw-container">
        <div className="hiw-header">
          <h2 id="hiw-heading" className="hiw-title">
            How <span className="hiw-brand-pink">StitchBeez</span> Works
          </h2>
          <p className="hiw-subtitle">
            Your requirements. Our expertise. Four simple steps.
          </p>
        </div>

        <div className="hiw-steps-grid">
          <div className="hiw-connector-line" aria-hidden="true" />
          {HOW_IT_WORKS_STEPS.map((step) => (
            <article key={step.number} className="hiw-step-item">
              <div className="hiw-step-badge-wrap">
                <span className="hiw-step-number">{step.number}</span>
              </div>

              <div className="hiw-step-media">
                <img
                  src={step.image}
                  alt={step.alt}
                  className="hiw-step-img"
                  loading="lazy"
                />
              </div>

              <h3 className="hiw-step-title">{step.title}</h3>
              <p className="hiw-step-desc">{step.description}</p>
            </article>
          ))}
        </div>

        <div className="hiw-cta-wrap">
          <button
            type="button"
            className="hiw-cta-btn"
            onClick={handleExploreClick}
          >
            <span>Explore Our Services</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
