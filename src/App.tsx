
import React, { useEffect, useRef } from 'react';

export default function App() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Ensure Splitting is initialized after the app is mounted
    if (window.Splitting) {
      window.Splitting();
    }
    
    // Initialize video playback if available
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.error("Video playback failed:", err);
      });
    }
    
    // Let the console know our React app has loaded
    console.log('DreamFrame React application initialized');
  }, []);

  // Handle persona selection
  const handlePersonaClick = (index: number) => {
    // Remove active class from all items
    document.querySelectorAll('.hero-switcher .list-item .item').forEach(item => {
      item.classList.remove('active');
    });
    
    // Add active class to selected item
    const selectedItem = document.querySelector(`.hero-switcher .list-item .item[data-media-persona="${index}"]`);
    if (selectedItem) {
      selectedItem.classList.add('active');
    }
    
    // Update background items
    document.querySelectorAll('.hero-wrapper__bg .bg-item').forEach(item => {
      item.classList.remove('active');
    });
    const matchingBg = document.querySelector(`.hero-wrapper__bg .bg-item[data-media-persona="${index}"]`);
    if (matchingBg) {
      matchingBg.classList.add('active');
    }
    
    // Update gradient color
    const itemColor = `--${index}-color`;
    const heroGradient = document.querySelector('.hero-gradient');
    if (heroGradient) {
      (heroGradient as HTMLElement).style.backgroundColor = `var(${itemColor})`;
    }
  };

  return (
    <div className="app">
      <header id="header" className="loading">
        <div className="header-wrapper">
          <div className="header-wrapper__logo">
            <img src="/assets/img/logo.png" alt="DreamFrame Logo" />
          </div>
          <div className="header-wrapper__box">
            <img src="/assets/img/box.png" alt="" />
          </div>
          <nav className="header-wrapper__menu">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a className="btn-large" href="#"><span>Contact</span></a></li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        <section className="hero">
          <div className="hero loading">
            <div className="hero-wrapper">
              <div className="hero-wrapper__bg">
                {[1, 2, 3, 4, 5].map(num => (
                  <div key={num} className={`bg-item ${num === 1 ? 'active' : ''}`} data-media-persona={num}>
                    <img src={`/assets/img/p${num}.png`} alt={`Persona ${num}`} />
                  </div>
                ))}
              </div>
              <div className="hero-wrapper__video">
                <video ref={videoRef} muted loop playsInline>
                  <source src="/assets/video/hero.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="hero-wrapper__content">
                <div className="title" data-splitting>
                  <span>Transformando</span>
                  <span>descrições textuais</span>
                </div>
                <div className="content-bottom">
                  <p>DreamFrame converte suas ideias em vídeos realistas com inteligência artificial avançada.</p>
                  <div className="col-right">
                    <span>em vídeos</span>
                    <span>realistas</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="hero-personas">
              <canvas></canvas>
            </div>
            <div className="hero-switcher loading">
              <div className="item-ovl"></div>
              <div className="list-item">
                {[1, 2, 3, 4, 5].map(num => (
                  <div 
                    key={num} 
                    className={`item ${num === 1 ? 'active' : ''}`} 
                    data-media-persona={num}
                    data-state={num}
                    onClick={() => handlePersonaClick(num)}
                  >
                    <img src={`/assets/img/p${num}.png`} alt={`Persona ${num}`} />
                    <p>Persona {num}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="hero-gradient"></div>
          </div>
        </section>
        
        {/* Process section for animation-process.min.js */}
        <section className="process">
          <div className="process__front">
            <div className="both">
              <div className="button-discover"></div>
            </div>
          </div>
          <div className="process__back"></div>
          <div className="process__front--content"></div>
          <div className="process__items">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={num} className="process__item" data-index={num}>
                <div className="process__item-content">
                  <h3>Step {num}</h3>
                  <p>Process description {num}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
