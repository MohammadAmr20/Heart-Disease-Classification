import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import axios from "axios";
// Define the Zod schema
const schema = z.object({
  Age: z.number().min(1, { message: "Age is required" }),
  Sex: z.enum(["M", "F"], { message: "Gender is required" }),
  ChestPainType: z.enum(["ASY", "NAP", "ATA", "TA"], {
    message: "Chest Pain Type is required",
  }),
  RestingBP: z
    .number()
    .min(1, { message: "Resting Blood Pressure is required" }),
  Cholesterol: z.number().min(1, { message: "Cholesterol is required" }),
  FastingBS: z.enum(["0", "1"], { message: "Fasting Blood Sugar is required" }),
  RestingECG: z.enum(["Normal", "LVH", "ST"], {
    message: "Resting ECG is required",
  }),
  ExerciseAngina: z.enum(["Y", "N"], {
    message: "Exercise Angina is required",
  }),
  MaxHR: z.number().min(1, { message: "Maximum Heart Rate is required" }),
  Oldpeak: z.number().min(-8, { message: "Old Peak is required" }),
  ST_Slope: z.enum(["Up", "Flat", "Down"], { message: "ST Slope is required" }),
  model: z.enum(["knn", "logistic", "nn"], {
    message: "You must choose a model.",
  }),
});

const InputForm = ({ setPrediction }) => {
  // Initialize React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onBlur", // You can use "onChange" or "onSubmit" as well
  });

  const onSubmit = async (data) => {
    data["FastingBS"] = Number(data["FastingBS"]);
    console.log(data);
    const model = data["model"];
    delete data["model"];
    try {
      const response = await axios.post(
        `http://20.164.17.84:5000/predict/${model}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Success:", response.data);
      setPrediction(response.data[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="Age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your age"
            {...register("Age", { valueAsNumber: true })}
            isInvalid={!!errors.Age}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Age?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="Sex">
          <Form.Label>Gender</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("Sex")}
            isInvalid={!!errors.Sex}
          >
            <option value="">Choose gender</option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.Sex?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="ChestPainType">
          <Form.Label>Chest Pain Type</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("ChestPainType")}
            isInvalid={!!errors.ChestPainType}
          >
            <option value="">Choose type</option>
            <option value="ASY">Asymptomatic</option>
            <option value="NAP">Non-Anginal Pain</option>
            <option value="ATA">Atypical Angina</option>
            <option value="TA">Typical Angina</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.ChestPainType?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="RestingBP">
          <Form.Label>Resting Blood Pressure</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter your BP"
            {...register("RestingBP", { valueAsNumber: true })}
            isInvalid={!!errors.RestingBP}
          />
          <Form.Control.Feedback type="invalid">
            {errors.RestingBP?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="Cholesterol">
          <Form.Label>Cholesterol</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Cholesterol level"
            {...register("Cholesterol", { valueAsNumber: true })}
            isInvalid={!!errors.Cholesterol}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Cholesterol?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="FastingBS">
          <Form.Label>Fasting Blood Sugar</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("FastingBS")}
            isInvalid={!!errors.FastingBS}
          >
            <option value="">Choose type</option>
            <option value="0">less than 100 mg/dL</option>
            <option value="1">greater than or equal 100 mg/dL</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.FastingBS?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="RestingECG">
          <Form.Label>Resting ECG</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("RestingECG")}
            isInvalid={!!errors.RestingECG}
          >
            <option value="">Choose type</option>
            <option value="Normal">Normal</option>
            <option value="LVH">Left Ventricular Hypertrophy</option>
            <option value="ST">ST-T wave abnormality</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.RestingECG?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="ExerciseAngina">
          <Form.Label>Does Exercise cause you angina?</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("ExerciseAngina")}
            isInvalid={!!errors.ExerciseAngina}
          >
            <option value="">Choose type</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.ExerciseAngina?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="Oldpeak">
          <Form.Label>Old Peak</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Old peak level"
            {...register("Oldpeak", { valueAsNumber: true })}
            isInvalid={!!errors.Oldpeak}
          />
          <Form.Control.Feedback type="invalid">
            {errors.Oldpeak?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Col} controlId="ST_Slope">
          <Form.Label>ST Slope</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("ST_Slope")}
            isInvalid={!!errors.ST_Slope}
          >
            <option value="">Choose type</option>
            <option value="Up">Up: Upward slope (considered normal).</option>
            <option value="Flat">Flat slope (can indicate abnormality).</option>
            <option value="Down">
              Downward slope (can indicate more severe abnormality).
            </option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.ST_Slope?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="MaxHR">
          <Form.Label>Maximum Heart Rate</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Maximum HR"
            {...register("MaxHR", { valueAsNumber: true })}
            isInvalid={!!errors.MaxHR}
          />
          <Form.Control.Feedback type="invalid">
            {errors.MaxHR?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="model">
          <Form.Label>Choose Model</Form.Label>
          <Form.Select
            aria-label="Default select example"
            {...register("model")}
            isInvalid={!!errors.model}
          >
            <option value="">Choose type</option>
            <option value="knn">K-Nearest Neighbours</option>
            <option value="logistic">Logistic Regression</option>
            <option value="nn">Neural Network (Deep Learning)</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.model?.message}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Col className="text-center">
          <Button
            variant="success"
            className="mt-3 justify-content-center w-25"
            type="submit"
          >
            Predict
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default InputForm;
