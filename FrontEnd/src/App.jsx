// import { useState } from "react";
import "./App.css";
import Form from "./components/InputForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Container } from "react-bootstrap";
import { Button, Alert } from "react-bootstrap";
import healthyMan from "../src/assets/HealthyMan.png";
import diseasedMan from "../src/assets/DiseasedMan.png";
import { useState } from "react";
const PredictedState = ({ state }) => {
  return (
    <div className="d-flex flex-column align-items-center ">
      <img alt="alt" src={state ? diseasedMan : healthyMan} className="w-50" />
      <Alert variant={state ? "danger" : "success"} className="mt-5 w-100">
        {state
          ? "Be Careful! You might encounter Angina soon."
          : "Hooray! Thanks God you're fine."}
      </Alert>
    </div>
  );
};

function App() {
  const [prediction, setPrediction] = useState(-1);
  return (
    <Container>
      <Row>
        <Col
          md="auto"
          className="d-flex flex-column align-items-center min-vh-100"
        >
          <Form setPrediction={setPrediction} />
        </Col>
        <Col className="justify-content-center d-flex flex-column align-items-center">
          {prediction !== -1 && <PredictedState state={prediction} />}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
