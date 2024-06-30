// Main.js

import { mainPageTxt } from '../contentoptions';
import { useImages } from '../components/images';
import '../styles/main.css';

const Main = () => {
  const mainImages = useImages('main');

  if (mainImages.length === 0) {
    return <div>Loading...</div>; // Eller någon annan loading indikator
  }

  return (
    <div className="main">
      <div className="body">
        <div className="bodyWrapper0">
          <div className="bodyImageBox0">
            <img src={mainImages[0]} alt="BodyImage0" />
          </div>
          <div className="bodyTextBox0">
            <div className="staticText0">
              <p>{mainPageTxt.mainTxt_1}</p>
            </div>
          </div>
        </div> {/* bodyWrapper0 */}
        <div className="bodyWrapper1">
          <div className="bodyImageBox1">
            <img src={mainImages[1]} alt="BodyImage1" />
          </div>
          <div className="bodyTextBox1">
            <div className="staticText1">
              <p>{mainPageTxt.mainTxt_2}</p>
            </div>
          </div>
        </div> {/* bodyWrapper1 */}
        <div className="bodyWrapper2">
          <div className="bodyImageBox2">
            <img src={mainImages[2]} alt="BodyImage2" />
          </div>
          <div className="bodyTextBox2">
            <div className="staticText2">
              <p>{mainPageTxt.mainTxt_3}</p>
            </div>
          </div>
        </div> {/* bodyWrapper2 */}
      </div> {/* body */}
      <div className="footerWrapper0">
        <div className="footerImageBox0">
          <img src={mainImages[3]} alt="footerImage0" />
        </div>
        <div className="footerTextBox0">
          <div className="footerStaticText">
            <p className="mainFooterTxt_0">{mainPageTxt.mainFooterTxt_0}</p>
            <p className="mainFooterTxt_1">{mainPageTxt.mainFooterTxt_1}</p>
            <p className="mainFooterTxt_2">{mainPageTxt.mainFooterTxt_2}</p>
          </div>
        </div>
      </div> {/* footerWrapper0 */}
    </div> // main
  );
}

export default Main;
