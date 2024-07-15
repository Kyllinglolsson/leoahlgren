// About.js

import { aboutPageTxt } from '../contentoptions';
import { useImages } from '../components/images';
import '../styles/about.css';

const About = () => {
  const aboutImages = useImages('about');

  if (aboutImages.length === 0) {
    return <div className="loading-container">Loading...</div>; // Eller någon annan loading indikator
  }

  return (
    <div className="about">

      <div className="body">
        <div className="contentWrapper">
          {aboutImages.length > 0 && ( // Visa endast om bilder har importerats
            <div className="imageBox">
              <img src={aboutImages[0]} alt="aboutImage" className="backgroundImage" />
              <div className="textBox">
                <div className="text-overlay">{aboutPageTxt.aboutTxt_1}</div>
                <div className="text-overlay">{aboutPageTxt.aboutTxt_2}</div>
                <div className="text-overlay">{aboutPageTxt.aboutTxt_3}</div>
                <div className="text-overlay">{aboutPageTxt.aboutTxt_4}</div>
              </div> {/* textBox */}
            </div> // imageBox
          )} {/* aboutImages.length > 0 */}
        </div> {/* contentWrapper */}
      </div> {/* body */}
    </div> // about
  );
}

export default About;
