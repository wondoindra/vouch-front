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
  ModalFooter
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

    const URL = "http://localhost:8080/ticket/delete";
    const data = {
      _id: this.state._id
    };

    await axios
      .post(URL, data)
      .then(response => {
        this.setState({
          title: "Ticket deleted",
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
            <Label>Ticket id</Label>
            <Input
              type="text"
              name="_id"
              placeholder="Ticket id"
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button type="submit" onClick={this.handleClick}>
            Delete ticket
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
