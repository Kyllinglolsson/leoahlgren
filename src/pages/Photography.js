// Photography.js

import React, { useState, useEffect, useRef } from 'react';
import { portfolioPageTxt } from '../contentoptions';
import { useGridImages } from '../components/images';
import '../styles/photography.css';
import Colcade from 'colcade';

const Photography = () => {
  const images = useGridImages('portfolio');
  const [lightboxImage, setLightboxImage] = useState(null);
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && images.length > 0) {
      new Colcade(gridRef.current, {
        columns: '.grid-col',
        items: '.grid-item'
      });
    }
  }, [images]);

  const openLightbox = (src) => {
    setLightboxImage(src);
    document.body.classList.add('lightbox-open');
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.classList.remove('lightbox-open');
  };

  if (images.length === 0) {
    return (
      <div className="portfolio">
        <div className="body">
          <div className="loading-container">
            <div className="loading-text">Loading...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio">
      <div className="body">
        <div className={`grid ${lightboxImage ? 'blurred' : ''}`} ref={gridRef}>
          <div className="grid-col"></div>
          <div className="grid-col"></div>
          <div className="grid-col"></div>
          <div className="grid-col"></div>

          {images.map((image, index) => (
            <div className="grid-item" key={index} onClick={() => openLightbox(image)}>
              <img src={image} alt={`BodyImage${index}`} />
            </div>
          ))}
        </div> {/* grid */}

        <div className="portfolioFooterWrapper0">
          <div className="portfolioFooterBox0"></div>
          <div className="portfolioFooterTextBox0">
            <div className="portfolioFooterStaticText">
              <p className="portfolioFooterTxt_0">{portfolioPageTxt.portfolioFooterTxt_0}</p>
              <p className="portfolioFooterTxt_1">{portfolioPageTxt.portfolioFooterTxt_1}</p>
              <p className="portfolioFooterTxt_2">{portfolioPageTxt.portfolioFooterTxt_2}</p>
            </div>
          </div>
        </div> {/* footerWrapper0 */}
      </div> {/* body */}

      {lightboxImage && (
        <div className="lightbox" onClick={closeLightbox}>
          <img src={lightboxImage} alt="LightboxImage" />
        </div>
      )}
    </div>
  );
};

export default Photography;
