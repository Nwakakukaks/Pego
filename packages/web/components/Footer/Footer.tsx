import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <section className={styles.footer}>
      <Container>
        <Row>
          <Col lg={4} md={4}>
            <div className={styles.brand}>
              <p>Pegora</p>
            </div>
            <p className={styles.appDescription}>
              Pegora is a blockchain app manager that lets you create,
              manage and view analytics for all your smart contracts on Pego network.
            </p>
            <div className={styles.label}>Connect with us</div>
            <div className={styles.followUs}>
              <a href="/#">
                <img
                  src="/assets/icons/email.svg"
                  alt="Email"
                  className={styles.iconWhite}
                />
              </a>
            </div>
          </Col>
          <Col lg={8} md={8}>
            <Container style={{ paddingTop: 12 }}>
              <Row>
                <Col lg={4} md={4}>
                  <b>Application</b>
                  <ul className={styles.list}>
                    <li>
                      <a className={styles.link} href="/#learn-more">
                        About
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/#features">
                        Features
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/#pricing">
                        Pricing
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/#beta">
                        Beta Preview
                      </a>
                    </li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>Documentation</b>
                  <ul className={styles.list}>
                    <li>
                      <a className={styles.link} href="/#">
                        Getting Started
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/#">
                        Developers
                      </a>
                    </li>
                    <li>
                      <a className={styles.link} href="/#">
                        API
                      </a>
                    </li>
                  </ul>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Footer;
