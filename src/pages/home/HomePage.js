import React from "react";
import { Container } from "reactstrap";

import s from "./HomePage.module.scss";
import errorImg from "../../images/error-page-img.svg";

class HomePage extends React.Component {
  render() {
    return (
      <div className={s.homePage}>
        <Container>
          <div className={`${s.errorContainer}`}>
            <h1 className={s.errorInfo}>Peugeot 604</h1>
            <p className={s.errorHelp}>
              We’re working on it and we’ll get it fixed as soon as possible.
            </p>
            <p className={s.errorHelp}>You can back or use our Help Center</p>
          </div>
        </Container>
      </div>
    );
  }
}

export default HomePage;
