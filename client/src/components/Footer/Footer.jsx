import React, { Component } from "react";
import iconEmail from '../../assets/icons-feather-1.5px/mail.svg';
import iconGithub from '../../assets/icons-feather-1.5px/github.svg';
import iconLinkedIn from '../../assets/icons-feather-1.5px/linkedin.svg';

const sourceUrl = "https://opendata.vancouver.ca/explore/dataset/street-trees/information/?disjunctive.species_name&disjunctive.common_name&disjunctive.height_range_id"

class Footer extends Component {

  render() {

    return (
      <footer className="footer">
        {/* <div className="footer__about">
          <h1 className="about__name">Cristian Niculescu</h1>
          <div className="about__link-container">
            <a className="about__link" href="mailto:Cristian.Niculescu@gmail.com">
              <img className="about__icon" src={iconEmail} alt="email icon" />
              <h4 className="about__text">Cristian.Niculescu@gmail.com</h4>
            </a>
            <a className="about__link" href="https://github.com/CristianNic">
              <img className="about__icon" src={iconGithub} alt="github icon" />
              <h4 className="about__text">Github.com/CristianNic</h4>
            </a>
            <a className="about__link" href="https://github.com/CristianNic">
              <img className="about__icon" src={iconLinkedIn} alt="linkedin icon" />
              <h4 className="about__text">Linkedin.com/in/cristian-niculescu/</h4>
            </a>
          </div>
        </div> */}
        <a href={sourceUrl}>
          <h3 className="footer__data-source">
            <span className="black bold">Find out more: </span>
            <span className="black underline"> City of Vancouver Open Data Portal, Street Trees</span>
          </h3>
        </a>
        </footer>
    );
  }
}

export default Footer;

// TODO: Make with love & My info w/ Link to GitHub & LinkedIn? 