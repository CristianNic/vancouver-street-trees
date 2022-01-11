import React, { Component } from "react";
import { Divider } from "semantic-ui-react";

class Footer extends Component {

  render() {

    return (
      <footer className="footer">
        <Divider></Divider>
          <h2 className="footer__made-with">Made with <span style={{ color: '#e25555' }}>&nbsp;&#9829;&nbsp;</span> in Vancouver</h2>        
        </footer>
    );
  }
}

export default Footer;
