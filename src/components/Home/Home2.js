import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/Tushar_Phot0.png";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiOutlineTwitter,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Aspiring Data Analyst skilled in Python, SQL, Pandas. 
              Passionate about turning data into insights. 🤷‍♂️
              <br />
              <br />I am fluent in classics like
              <i>
                <b className="purple"> SQL, Python, PowerBI, MS Excel. </b>
              </i>
              <br />
              <br />
              My field of Interest's are building new &nbsp;
              <i>
                <b className="purple">Artificial Intelligence models and Products </b> and
                also in areas related to{" "}
                <b className="purple">
                  Machine Learning.
                </b>
              </i>
              <br />
              <br />
              Whenever possible, I apply my passion for building data-driven solutions using <b className="purple">Python, SQL</b> and
              <i>
                <b className="purple">
                  {" "}
                  Modern Machine Learning tools
                </b>
              </i>
              &nbsp; like
              <i>
                <b className="purple"> Scikit-learn & TensorFlow</b>
              </i>
            </p>
          </Col>
          <Col md={4} className="myAvtar">
              <img 
              src={myImg} 
              className="img-fluid" 
              alt="avatar" 
              style={{ width: "200px", height: "200px", borderRadius: "20%"}} />
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="https://github.com/tushar-analytics"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/tusharchaudhary017/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.instagram.com/tusharchaudhary_0"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillInstagram />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
