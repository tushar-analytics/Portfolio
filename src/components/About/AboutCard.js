import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Tushar Chaudhary </span>
            from <span className="purple"> Bijnor, India.</span>
            <br />
            I am currently learning Machine Learning tools.
            <br />
            I am persuing Bachelors Of Technology In Computer Sceince from JSS
            Academy Of Technical Education, Noida
            <br />
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Reading Tech news
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Tushar</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
