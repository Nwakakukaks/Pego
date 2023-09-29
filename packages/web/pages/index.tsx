/* eslint-disable react/no-unescaped-entities */
import type { NextPage } from "next";
import styles from "../styles/Home.module.scss";
import PageHead from "../components/PageHead/PageHead";
import { Button, Col, Container, Row, Card } from "react-bootstrap";
import Navigation from "components/Navigation/Navigation";
import Footer from "components/Footer/Footer";
import SpeedIcon from "@mui/icons-material/Speed";
import CodeIcon from "@mui/icons-material/Code";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Image from "next/image";
import sub from "../public/assets/pegora/sub.png";
import token from "../public/assets/pegora/token.png";
import nft from "../public/assets/pegora/nft.png";
import chain from "../public/assets/pegora/chain.png";

const MainLanding: NextPage = () => {
  const handleEnter = async () => {
    location.href = "/dashboard/";
  };

  return (
    <div className={styles.container}>
      <PageHead />
      <Navigation />
      <main className={styles.main}>
        <Container fluid>
          <Row className={styles.intro}>
            <Col md={1} sm={12}></Col>
            <Col md={6} sm={12}>
              <div className={styles.introContainer}>
                <h1>
                  <div className={styles.mainTitle}>Pegora</div>
                </h1>
                <div className={styles.subtitle}>
                  Streamlined Smart Contract Development and Deployment Solution
                </div>
                <p style={{ color: "#888888" }}>
                  Pegora is a blockchain application manager designed to provide
                  you with comprehensive control over your smart contracts
                  within the Pego Network ecosystem. With Pegora, you gain the
                  capability to seamlessly create, deploy, monitor, and gain
                  valuable insights for your smart contracts.
                </p>

                <div style={{ paddingTop: 30 }}>
                  <Button
                    className={styles.buttonHighlight}
                    onClick={() => handleEnter()}
                  >
                    Launch Beta
                  </Button>

                  <Button className={styles.buttonDefault} href="#learn-more">
                    Demo
                  </Button>
                </div>
              </div>
            </Col>
            <Col md={5} sm={12}></Col>
          </Row>
        </Container>

        <Container>
          <div
            id="learn-more"
            style={{
              background: "#eae0d5",
              borderRadius: "10px",
              marginBottom: "30px",
            }}
            className=""
          >
            <Row className="section-container advanced-section">
              <div className="">
                <iframe
                  width="100%"
                  height="300"
                  src="https://www.youtube.com/embed/VIDEO_ID_HERE"
                  title="YouTube video player"
                  frameBorder="0"
                ></iframe>
              </div>
            </Row>
          </div>
        </Container>

        <div className="container mx-auto">
          <div className="mb-8 mt-10">
            <h2 className="text-3xl mt-10 mb-2 text-white font-semibold text-center">
              Contract Templates
            </h2>
            <p className= "font-semibold text-gray-400 text-center">
              Explore a wide range of contract templates and customize them for
              your needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-10 mx-16 items-center">
            {/* Token Contract */}
            <div className="ml-10">
              <Image alt="" src={token} width={400} height={300} />
            </div>

            <div className="bg-color-hey rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">Token Contracts</h3>
                <p className="text-gray-900 mb-2">
                  ERC20 standard token contracts for seamless transactions on
                  the blockchain.
                </p>
                <ul className="list-disc  font-semibold text-gray-700 pl-6">
                  <li>Transfer and manage tokens securely</li>
                  <li>Create your own digital currency</li>
                  <li>Facilitate peer-to-peer transactions</li>
                </ul>
              </div>
            </div>

            {/* NFT Contract */}
            <div className="bg-color-hey rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">NFT Contracts</h3>
                <p className="text-gray-900 mb-2">
                  ERC721 standard NFT contracts for creating unique digital
                  assets.
                </p>
                <ul className="list-disc  font-semibold text-gray-700 pl-6">
                  <li>Mint and manage non-fungible tokens</li>
                  <li>Build your own digital collectibles</li>
                  <li>Enable ownership tracking for unique items</li>
                </ul>
              </div>
            </div>

            <div className="ml-28">
              <Image alt="" src={nft} width={300} height={300} />
            </div>

            {/* One-Time Subscription */}
            <div className="ml-8">
              <Image alt="" src={sub} width={400} height={300} />
            </div>

            <div className="bg-color-hey rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  One-Time Subscription
                </h3>
                <p className="text-gray-900 mb-2">
                  Contracts to enable one-time payments for product
                  subscriptions.
                </p>
                <ul className="list-disc  font-semibold text-gray-700 pl-6">
                  <li>Offer one-time payment options</li>
                  <li>Grant access to premium content or services</li>
                  <li>Automate subscription handling</li>
                </ul>
              </div>
            </div>

            {/* Supply Chain Management */}
            <div className="bg-color-hey rounded-lg shadow-md">
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  Supply Chain Management
                </h3>
                <p className="text-gray-900 mb-2">
                  Contracts for tracking and verifying products at each supply
                  chain stage.
                </p>
                <ul className="list-disc  font-semibold text-gray-700 pl-6">
                  <li>Enhance product traceability</li>
                  <li>Improve transparency and accountability</li>
                  <li>Minimize fraud and errors</li>
                </ul>
              </div>
            </div>

            <div className="ml-28">
              <Image alt="" src={chain} width={300} height={250} />
            </div>

            {/* Additional Contracts */}
            {/* Add more contract descriptions here */}

            {/* Placeholder for future contracts */}
          </div>
        </div>

        <Container>
          <Row
            id="features"
            className="section-container"
            style={{ minHeight: "auto" }}
          >
            <Col md={12} sm={12}>
              <h2 className="section-heading">More Features</h2>
            </Col>
          </Row>
          <Row className="feature-cards">
            <Col xs={12} sm={6} md={6} lg={3} className="feature-card">
              <Card body>
                <CodeIcon className="feature-icon" />
                <Card.Title>Custom Code</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Can't find the right template? Write your own code!
                </Card.Subtitle>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="feature-card">
              <Card body>
                <ArrowDownwardIcon className="feature-icon" />
                <Card.Title>Contract Import</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Import existing contracts which have been previously deployed
                  so you can manage them together.
                </Card.Subtitle>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6} lg={3} className="feature-card">
              <Card body>
                <SpeedIcon className="feature-icon" />
                <Card.Title>Dashboard & Analytics</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  See details and statistics for your deployed contracts on the
                  blockchain.
                </Card.Subtitle>
              </Card>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row
            id="pricing"
            className="section-container"
            style={{ minHeight: "auto", marginTop: "60px" }}
          >
            <Col md={12} sm={12}>
              <h2 className="section-heading">Pricing</h2>
              <h4 className="usability-subtitle">
                We keep things free for as much as we can
              </h4>
            </Col>
          </Row>
          <Row className="pricing-cards">
            <Col xs={12} sm={6} md={6} lg={4} className="pricing-card">
              <Card body>
                <Card.Title>
                  <p>Beta Release</p>
                </Card.Title>
                <hr />
                <Card.Subtitle className="mb-4" style={{ textAlign: "center" }}>
                  <h6>Available Now</h6>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  <ul className="pricing-list">
                    <li>Unlimited apps</li>
                    <li>Unlimited linked wallets</li>
                    <li>Analytics Dashboard</li>
                  </ul>
                  <hr />
                  Features are ongoing development and experimental.
                </Card.Subtitle>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} className="pricing-card">
              <Card body>
                <Card.Title>
                  <p>Standard Free</p>
                </Card.Title>
                <hr />
                <Card.Subtitle className="mb-4" style={{ textAlign: "center" }}>
                  <h6>Coming Soon</h6>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  <ul className="pricing-list">
                    <li>Up to 3 apps</li>
                    <li>Up to 6 linked wallets</li>
                    <li>Basic Analytics</li>
                  </ul>
                  <hr />
                  Stable release.
                </Card.Subtitle>
              </Card>
            </Col>
            <Col xs={12} sm={6} md={6} lg={4} className="pricing-card">
              <Card body>
                <Card.Title>
                  <p>Pro</p>
                </Card.Title>
                <hr />
                <Card.Subtitle className="mb-4" style={{ textAlign: "center" }}>
                  <h6>Coming Soon</h6>
                </Card.Subtitle>
                <Card.Subtitle className="mb-2">
                  <ul className="pricing-list">
                    <li>Up to 10 apps</li>
                    <li>Up to 20 linked wallets</li>
                    <li>Advanced Analytics</li>
                  </ul>
                  <hr />
                  Stable release.
                  <br />
                  Pricing announced soon.
                </Card.Subtitle>
              </Card>
            </Col>
          </Row>
        </Container>

        <Footer />
      </main>
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  return {
    props: {},
  };
};

export default MainLanding;
