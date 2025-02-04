import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      id: 'interactive',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
            fill="currentColor"/>
        </svg>
      ),
      title: "Interactive Visualization",
      description: "Watch algorithms come to life with step-by-step visualization and real-time updates"
    },
    {
      id: 'performance',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.07.63-.07.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"
            fill="currentColor"/>
        </svg>
      ),
      title: "Performance Analysis",
      description: "Compare algorithm efficiency with detailed time and space complexity insights"
    },
    {
      id: 'learning',
      icon: (
        <svg viewBox="0 0 24 24" width="48" height="48">
          <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"
            fill="currentColor"/>
        </svg>
      ),
      title: "Comprehensive Learning",
      description: "Master algorithms through interactive examples and detailed explanations"
    }
  ];

  const algorithms = [
    {
      title: "Searching Algorithms",
      description: "Explore and understand different searching techniques through interactive visualizations",
      path: "/searching",
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="currentColor"/>
        </svg>
      ),
      features: ["Linear Search", "Binary Search"]
    },
    {
      title: "Sorting Algorithms",
      description: "Learn sorting algorithms with step-by-step visualization and complexity analysis",
      path: "/sorting",
      icon: (
        <svg viewBox="0 0 24 24" width="32" height="32">
          <path d="M3 18h6v-2H3v2zM3 6v2h18V6H3zm0 7h12v-2H3v2z" 
            fill="currentColor"/>
        </svg>
      ),
      features: ["Bubble Sort", "Quick Sort", "Merge Sort", "Heap Sort"]
    }
  ];

  return (
    <div className="landing-page">
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-content">
          <div className="logo">
            <svg className="logo-icon" viewBox="0 0 24 24" width="32" height="32">
              <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"
                fill="currentColor"/>
            </svg>
            <span>VSS</span>
          </div>
          <nav className="nav-links">
            <button onClick={() => navigate('/searching')}>Searching</button>
            <button onClick={() => navigate('/sorting')}>Sorting</button>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section">
          <div className="hero-content">
            <h1 className="main-title">
              {/* Visualization Searching & Sorting algorithms */}
              <span className="gradient-text">Visualization Searching & Sorting Algorithms</span>
            </h1>
            <p className="subtitle">
              Interactive learning platform that helps you understand complex algorithms
              through beautiful visualizations and step-by-step explanations
            </p>
          </div>

          <div className="algorithms-grid">
            {algorithms.map((algo) => (
              <div 
                key={algo.title}
                className="algorithm-card"
                onClick={() => navigate(algo.path)}
              >
                <div className="card-content">
                  <div className="card-icon">{algo.icon}</div>
                  <h3>{algo.title}</h3>
                  <p>{algo.description}</p>
                  <div className="algorithm-features">
                    {algo.features.map((feature) => (
                      <span key={feature} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="card-overlay">
                  <button className="explore-btn">
                    Explore Now
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" 
                        fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="features-section">
          <h2>Why Choose Our Platform?</h2>
          <div className="features-grid">
            {features.map((feature) => (
              <div 
                key={feature.id}
                className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}
                onMouseEnter={() => setActiveFeature(feature.id)}
                onMouseLeave={() => setActiveFeature(null)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="cta-section">
          <div className="cta-content">
            <h2>Start Your Learning Journey</h2>
            <p>
              From basic searching to advanced sorting algorithms, we provide
              comprehensive learning resources with practical examples
            </p>
            <div className="cta-buttons">
              <button 
                className="cta-btn primary"
                onClick={() => navigate('/searching')}
              >
                Start with Searching
                <svg viewBox="0 0 24 24" width="20" height="20">
                  <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" 
                    fill="currentColor"/>
                </svg>
              </button>
              <button 
                className="cta-btn secondary"
                onClick={() => navigate('/sorting')}
              >
                Explore Sorting
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
