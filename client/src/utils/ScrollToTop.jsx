import { Component } from 'react';
import { withRouter } from "react-router";

/*  React Router remembers scroll position when switching between routes,
    this moves the user to the top of the liked page  */

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    if (location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children } = this.props;
    return children;
  }
}

export default withRouter(ScrollToTop);