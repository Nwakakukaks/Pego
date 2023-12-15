import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import styles from './Footer.module.scss';
import Link from 'next/link';
import Image from 'next/image'

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
              <Link href="/#">
                <Image
                  src="/assets/icons/email.svg"
                  alt="Email"
                  className={styles.iconWhite}
                  height={30}
                  width={30}
                  
                />
              </Link>
            </div>
          </Col>
          <Col lg={8} md={8}>
            <Container style={{ paddingTop: 12 }}>
              <Row>
                <Col lg={4} md={4}>
                  <b>Application</b>
                  <ul className={styles.list}>
                    <li>
                      <Link className={styles.link} href="/#learn-more">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} href="/#features">
                        Features
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} href="/#pricing">
                        Pricing
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} href="/#beta">
                        Beta Preview
                      </Link>
                    </li>
                  </ul>
                </Col>
                <Col lg={4} md={4}>
                  <b>Documentation</b>
                  <ul className={styles.list}>
                    <li>
                      <Link className={styles.link} href="/#">
                        Getting Started
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} href="/#">
                        Developers
                      </Link>
                    </li>
                    <li>
                      <Link className={styles.link} href="/#">
                        API
                      </Link>
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
