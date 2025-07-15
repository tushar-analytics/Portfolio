import React from "react";
import { Col, Row } from "react-bootstrap";
import { SiAnaconda } from "react-icons/si";
import {
  SiVisualstudiocode,
  SiMicrosoftexcel,
  SiWindows11,
  SiScikitlearn
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={4} md={2} className="tech-icons">
        <SiWindows11 />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiVisualstudiocode />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiMicrosoftexcel />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiScikitlearn />
      </Col>
      <Col xs={4} md={2} className="tech-icons">
        <SiAnaconda />
      </Col>
    </Row>
  );
}

export default Toolstack;
