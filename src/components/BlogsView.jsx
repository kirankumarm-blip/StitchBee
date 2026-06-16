import React from 'react';

export default function BlogsView({ setRole }) {
  const articles = [
    {
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=600&q=80",
      category: "Bespoke Fitting",
      title: "The standard size chart was never designed to fit your unique shape",
      description: "There's a fundamental contradiction at the center of mass production: ready-to-wear clothing ignores individual anatomy. StitchBee bridges this gap by making bespoke fit accessible to everyone.",
      date: "April 21, 2026",
      readTime: "8 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      category: "Digital Innovation",
      title: "Phasing out tape measures: How AI scanning is empowering local boutiques",
      description: "Boutique tailoring is going digital. Local shops are adopting AI camera measurements and 3D mockups to reduce fitting errors, save fabric, and increase customer satisfaction.",
      date: "May 12, 2026",
      readTime: "5 min read"
    },
    {
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      category: "Student gig economy",
      title: "The gig economy fits: Why fashion students make the perfect fitting assistants",
      description: "By connecting design students with customers for local measurement visits, we create high-value part-time jobs while guaranteeing measuring precision for tailors.",
      date: "June 02, 2026",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="blog-view-container animate-fade-in">
      <div className="blog-view-header">
        <h1 className="blog-view-title">StitchBee Insights</h1>
        <p className="blog-view-subtitle">
          Stories and articles about how we work, custom tailoring innovation, and local craftsmanship.
        </p>
      </div>

      <div className="blog-grid">
        {articles.map((article, idx) => (
          <div key={idx} className="blog-card" onClick={() => alert(`Reading article: "${article.title}"`)}>
            <div className="blog-card-img-wrapper">
              <img src={article.image} alt={article.title} className="blog-card-img" />
            </div>
            <div className="blog-card-content">
              <span className="blog-card-category">{article.category}</span>
              <h2 className="blog-card-title">{article.title}</h2>
              <p className="blog-card-description">{article.description}</p>
              <div className="blog-card-meta">
                {article.date} &middot; {article.readTime}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
        <button className="btn btn-secondary" onClick={() => setRole('landing')}>
          Back to Home
        </button>
      </div>
    </div>
  );
}
