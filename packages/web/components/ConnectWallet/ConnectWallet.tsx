import styles from './ConnectWallet.module.scss';
import React from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { Blockchains } from '@core/enums/blockchains';
import { getTranslation } from '@modules/localization/translate';

interface ConnectWalletProps {
  blockchain: Blockchains;
  onConnectClick: () => void;
  isLoading: boolean;
}

const ConnectWallet = ({
  blockchain,
  onConnectClick,
  isLoading,
}: ConnectWalletProps) => {
  const t = getTranslation(blockchain);
  return (
    <Container fluid>
      <Row className={styles.intro}>
        <Col md={1} sm={12}></Col>
        <Col md={3} sm={12}>
          <div className={styles.logo}>
            <img src={t.logoIcon} alt="" />
          </div>
        </Col>
        <Col md={5} sm={12}>
          <div className={styles.introContainer}>
            <h1>
              <div className={styles.mainTitle}>{t.connectWalletTitle}</div>
            </h1>
            <div className={styles.subtitle}>{t.connectWalletSubtitle}</div>
            <p>{t.connectWalletDescription}</p>
            <div style={{ paddingTop: 30}}>
              <Button
                className={styles.buttonHighlight}
                onClick={() => onConnectClick()}
                disabled={isLoading}
              >
                {isLoading ? 'Connecting...' : t.connectButtonLabel}
              </Button>,
              
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ConnectWallet;
