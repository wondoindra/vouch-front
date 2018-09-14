import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Container
} from "reactstrap";
import axios from "axios";

export default class Create extends Component {
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

    const URL = "https://vouch-backend.herokuapp.com/ticket/add";
    const data = {
      name: this.state.name,
      logs: this.state.logs
    };

    await axios
      .post(URL, data)
      .then(response => {
        this.setState({
          title: "Ticket create success",
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
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label>Ticket name</Label>
            <Input
              type="text"
              name="name"
              placeholder="Ticket name"
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label>Ticket log</Label>
            <Input
              type="text"
              name="logs"
              placeholder="Ticket log"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" onClick={this.handleClick}>
            Add ticket
          </Button>
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
