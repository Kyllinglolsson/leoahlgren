// Projects.js

import { projectsPageTxt } from '../contentoptions';
import { useImages } from '../components/images';
import '../styles/projects.css'; // Ändrade till projects.css

const Projects = () => {
  const projectImages = useImages('projects');

  if (projectImages.length === 0) {
    return <div className="loading-container">Loading...</div>; // Eller någon annan loading indikator
  }

  return (
    <div className="projects">
      <div className="body">
        {projectImages.length > 0 && (
          <div className="projectsBodyWrapper0">
            <div className="projectsBodyImageBox0">
              {projectImages[0] && <img src={projectImages[0]} alt="BodyImage0" />}
            </div>
            <div className="projectsBodyTextBox0">
              <div className="staticText0">
                <p>{projectsPageTxt.projectsTxt_1}</p>
              </div>
            </div>
          </div>
        )}

        {projectImages.length > 1 && (
          <div className="projectsBodyWrapper1">
            <div className="projectsBodyImageBox1">
              {projectImages[1] && <img src={projectImages[1]} alt="BodyImage1" />}
            </div>
            <div className="projectsBodyTextBox1">
              <div className="staticText1">
                <p>{projectsPageTxt.projectsTxt_2}</p>
              </div>
            </div>
          </div>
        )}

        {projectImages.length > 2 && (
          <div className="projectsBodyWrapper2">
            <div className="projectsBodyImageBox2">
              {projectImages[2] && <img src={projectImages[2]} alt="BodyImage2" />}
            </div>
            <div className="projectsBodyTextBox2">
              <div className="staticText2">
                <p>{projectsPageTxt.projectsTxt_3}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="projectsFooterWrapper0">
        <div className="projectsFooterBox0"></div>
        <div className="projectsFooterTextBox0">
          <div className="footerStaticText">
            <p className="projectsFooterTxt_0">{projectsPageTxt.projectsFooterTxt_0}</p>
            <p className="projectsFooterTxt_1">{projectsPageTxt.projectsFooterTxt_1}</p>
            <p className="projectsFooterTxt_2">{projectsPageTxt.projectsFooterTxt_2}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
