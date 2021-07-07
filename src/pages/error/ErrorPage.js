import React from "react";
import { Container } from "reactstrap";

import s from "./ErrorPage.module.scss";

class ErrorPage extends React.Component {
  render() {
    return (
      <div className={s.errorPage}>
        <Container>
          <div className={`${s.errorContainer}`}>
            <h1 className={s.errorInfo}>Peugeot 504</h1>
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

export default ErrorPage;
