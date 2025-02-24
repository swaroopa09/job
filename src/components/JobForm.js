import React, { useState, useEffect } from "react";
import "./JobForm.css";
import { Button, Form, Modal, Card, Container, Row, Col } from "react-bootstrap";

const JobForm = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    jobId: "",
    jobTitle: "",
    companyName: "",
    interviewDateTime: "",
    description: "",
  });
  const [jobList, setJobList] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.jobId || !formData.jobTitle || !formData.companyName || !formData.interviewDateTime || !formData.description) {
      alert("Please fill all fields before submitting.");
      return;
    }
    setJobList([...jobList, formData]);
    setFormData({ jobId: "", jobTitle: "", companyName: "", interviewDateTime: "", description: "" });
    setShow(false);
  };

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="job-container">
      <Button className="job-add-button" onClick={handleShow}>
        Add Job
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Add Job</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="job-form-grid">
              <Form.Group className="job-form-group" controlId="jobId">
                <Form.Label>Job ID</Form.Label>
                <Form.Control type="text" name="jobId" placeholder="Enter Job ID" value={formData.jobId} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="job-form-group" controlId="jobTitle">
                <Form.Label>Job Title</Form.Label>
                <Form.Control type="text" name="jobTitle" placeholder="Enter Job Title" value={formData.jobTitle} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="job-form-group" controlId="companyName">
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" name="companyName" placeholder="Enter Company Name" value={formData.companyName} onChange={handleChange} />
              </Form.Group>

              <Form.Group className="job-form-group date-time-group" controlId="interviewDateTime">
                <Form.Label>Interview Date & Time</Form.Label>
                <Form.Control type="datetime-local" name="interviewDateTime" value={formData.interviewDateTime} onChange={handleChange} className="date-time-input" />
              </Form.Group>

              <Form.Group className="job-form-group job-full-width" controlId="description">
                <Form.Label>Job Description</Form.Label>
                <Form.Control as="textarea" rows={3} name="description" placeholder="Enter Description" value={formData.description} onChange={handleChange} />
              </Form.Group>
            </div>

            <div className="job-form-buttons">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      <Container>
      <div className="job-list">
        <Row>
          {jobList.map((job, index) => (
            isMobile ? (
              <Col key={index} xs={12} sm={6} md={4}>
                <Card className="job-card">
                  <Card.Body>
                    <Card.Title className="job-title">
                      <span className="job-id">{job.jobId}</span> - {job.jobTitle}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Company: {job.companyName}</Card.Subtitle>
                    <Card.Text>
                      <strong>Date & Time:</strong> {job.interviewDateTime}
                      <br />
                      <strong>Job Description:</strong>
                      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word", maxHeight: expanded[index] ? "none" : "60px", overflow: "hidden" }}>{job.description}</pre>
                    </Card.Text>

                    <Button variant="link" onClick={() => toggleExpand(index)}>
                      {expanded[index] ? "Show Less" : "More"}
                    </Button>

                    <div className="job-card-buttons">
                      <Button variant="primary">Apply</Button>
                      <Button variant="outline-secondary">Share</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ) : (
              <Col key={index} xs={12} sm={6} md={4}>
                <Card className="job-card">
                  <Card.Body>
                    <Card.Title className="job-title">
                      <span className="job-id">{job.jobId}</span> - {job.jobTitle}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Company: {job.companyName}</Card.Subtitle>
                    <Card.Text>
                      <strong>Date & Time:</strong> {job.interviewDateTime}
                      <br />
                      <strong>Job Description:</strong>
                      <div className="job-description-box">
                        <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{job.description}</pre>
                      </div>
                    </Card.Text>
                    <div className="job-card-buttons">
                      <Button variant="primary">Apply</Button>
                      <Button variant="outline-secondary">Share</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            )
          ))}
        </Row>
      </div>  
      </Container>
    </div>
  );
};

export default JobForm;
