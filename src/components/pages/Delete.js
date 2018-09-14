import React, { Component } from "react";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  CardTitle
} from "reactstrap";
import axios from "axios";

export default class Delete extends Component {
  constructor(props) {
    super(props);

    this.state = { modal: false };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();

    const URL = "https://vouch-backend.herokuapp.com/ticket/delete";
    const data = {
      id: this.state.id
    };

    await axios
      .post(URL, data)
      .then(response => {
        this.setState({
          title: "Ticket delete success",
          message: response.data.status,
          modal: true
        });
      })
      .catch(error => {
        this.setState({
          title: "Failed",
          message: error.response.data,
          modal: true
        });
      });
  };

  render() {
    return (
      <Container className="mt-4">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col />
            <Col xs="6">
              <CardTitle className="text-center m-3">Delete ticket</CardTitle>
              <FormGroup>
                <Label>Ticket id</Label>
                <Input
                  type="text"
                  name="id"
                  placeholder="Ticket id"
                  onChange={this.handleChange}
                />
              </FormGroup>
              <Button type="submit" onClick={this.handleClick}>
                Delete ticket
              </Button>
            </Col>
            <Col />
          </Row>
        </Form>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
          <ModalBody>{this.state.message}</ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}
