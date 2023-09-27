import React from 'react';
import { Navbar } from 'react-bootstrap';
import styles from './Navigation.module.scss';

const Navigation = () => {
  const handleEnterApp = async () => {
    location.href = '/dashboard/';
  };

  return (
    <>
      <Navbar fixed="top" className={styles.nav} collapseOnSelect expand="sm">
        <Navbar.Brand className={styles.brand} href="/">
          <img src="/assets/blocks/logo.png" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="navbar-scroll"
          data-bs-target="navbar-scroll"
        />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a
              className={styles.linkItemBoldWhite}
              onClick={() => handleEnterApp()}
            >
              LAUNCH APP
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default Navigation;
