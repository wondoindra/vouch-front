import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Container,
  Card,
  CardTitle,
  CardHeader,
  CardFooter,
  CardText,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
  Table,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledCollapse
} from "reactstrap";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tickets: [],
      ticketlogs: [],
      reset: false,
      logURL: "http://localhost:8080/logs/",
      URL: "http://localhost:8080/tickets/",
      id: "",
      modal: false,
      modalconfirmation: false,
      deletemodal: false,
      collapse: false,
      updatecollapse: false,
      ticketname: ""
    };
    this.toggle = this.toggle.bind(this);
  }

  toggleCollapse = () => {
    this.setState({
      collapse: !this.state.collapse
    });
  };

  toggleCancel = () => {
    this.setState({
      deletemodal: !this.state.deletemodal
    });
  };

  toggleDelete = () => {
    this.setState({
      deletemodal: !this.state.deletemodal,
      modalconfirmation: !this.state.modalconfirmation
    });
    this.handleDelete(this.state.id);
  };

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleUpdateClick = async ticketname => {
    await this.setState({
      active: !this.state.active,
      name: ticketname
    });
  };

  handleLogs = async ticketid => {
    await this.setState({
      reset: !this.state.reset,
      logURL: `http://localhost:8080/logs/${ticketid}`
    });

    await this.getLogs();
  };

  handleShow = async () => {
    await this.setState({ active: !this.state.active });
    await this.setState({
      URL: "http://localhost:8080/tickets/"
    });
    await this.getTickets();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCreate = async event => {
    event.preventDefault();

    await this.setState({
      URL: "http://localhost:8080/ticket/add"
    });
    const data = {
      name: this.state.name,
      ticketlog: this.state.ticketlog
    };

    console.log(data);

    await axios
      .post(this.state.URL, data)
      .then(response => {
        this.setState({
          title: "Ticket create success",
          message: response.data.status,
          modal: true,
          URL: "http://localhost:8080/tickets/",
          collapse: false
        });
      })
      .catch(error => {
        this.setState({
          title: "Failed",
          message: error.response.data,
          modal: true,
          URL: "http://localhost:8080/tickets/",
          collapse: false
        });
      });
    await this.getTickets();
  };

  handleUpdate = async event => {
    event.preventDefault();

    await this.setState({
      URL: `http://localhost:8080/ticket/update`
    });
    const data = {
      name: this.state.name,
      status: this.state.status,
      ticketlog: this.state.ticketlog
    };

    await axios
      .put(this.state.URL, data)
      .then(response => {
        this.setState({
          title: "Ticket update success",
          message: response.data.status,
          modal: true,
          URL: "http://localhost:8080/tickets/"
        });
      })
      .catch(error => {
        this.setState({
          title: "Failed",
          message: error.response.data,
          modal: true,
          URL: "http://localhost:8080/tickets/"
        });
      });
    await this.getTickets();
  };

  handleDelete = async ticketid => {
    await this.setState({
      id: ticketid,
      URL: "http://localhost:8080/ticket/delete"
    });

    if (this.state.modalconfirmation) {
      const data = {
        id: this.state.id
      };
      await axios
        .post(this.state.URL, data)
        .then(response => {
          this.setState({
            title: "Ticket delete success",
            message: response.data.status,
            modal: true,
            modalconfirmation: !this.state.modalconfirmation,
            id: "",
            URL: "http://localhost:8080/tickets/"
          });
        })
        .catch(error => {
          this.setState({
            title: "Failed",
            message: error.response.data,
            modal: true,
            modalconfirmation: !this.state.modalconfirmation,
            id: "",
            URL: "http://localhost:8080/tickets/"
          });
        });
      await this.getTickets();
    } else {
      this.toggleCancel();
    }
  };

  getLogs = async () => {
    if (this.state.reset) {
      await axios
        .get(`${this.state.logURL}`)
        .then(results => {
          return results;
        })
        .then(data => {
          let ticketlogs = data.data.map(log => {
            return (
              <CardText key={log._id}>
                <strong>{log.updatedAt}:</strong> {log.ticketlog}
              </CardText>
            );
          });
          this.setState({ ticketlogs: ticketlogs });
        });
    } else {
      this.setState({ ticketlogs: [] });
    }
    await this.getTickets();
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      status: this.state.status
    };
    await this.setState({
      URL: `http://localhost:8080/tickets/${data.status}`
    });
    await this.getTickets();
  };

  getTickets = async () => {
    await axios
      .get(`${this.state.URL}`)
      .then(results => {
        return results;
      })
      .then(data => {
        let tickets = data.data.map((list, index) => {
          return (
            <Row className="mb-4" key={list._id}>
              <Col />
              <Col xs="6">
                <Card outline color="info">
                  <CardHeader tag="h4">
                    {list.name}
                    <Button
                      color="danger"
                      onClick={() => this.handleDelete(list._id)}
                      className="float-right"
                    >
                      Delete
                    </Button>
                    <Button
                      color="warning"
                      id={`toggler${index}`}
                      className="float-right mr-3"
                    >
                      Update
                    </Button>
                  </CardHeader>
                  <Table responsive borderless>
                    <thead />
                    <tbody>
                      <tr>
                        <th scope="row">Ticket No :</th>
                        <td>{list._id}</td>
                      </tr>
                      <tr>
                        <th scope="row">Status :</th>
                        <td>{list.status}</td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <Button
                            color="success"
                            id={`logtoggler${index}`}
                            onClick={() => this.handleLogs(list._id)}
                          >
                            Logs
                          </Button>
                        </th>
                        <td />
                      </tr>
                    </tbody>
                  </Table>
                  <UncontrolledCollapse toggler={`logtoggler${index}`}>
                    <CardFooter>{this.state.ticketlogs}</CardFooter>
                  </UncontrolledCollapse>
                </Card>
                <UncontrolledCollapse
                  className="mt-3 mb-5"
                  toggler={`toggler${index}`}
                >
                  <Form onSubmit={this.handleUpdate}>
                    <FormGroup>
                      <Label>Ticket status</Label>
                      <Input
                        type="select"
                        name="status"
                        onChange={this.handleChange}
                      >
                        <option>Open</option>
                        <option>Active</option>
                        <option>Failed</option>
                        <option>Closed</option>
                      </Input>
                    </FormGroup>
                    <FormGroup>
                      <Label>Ticket log</Label>
                      <Input
                        type="text"
                        name="ticketlog"
                        placeholder="Ticket log"
                        onChange={this.handleChange}
                        defaultValue="New log"
                      />
                    </FormGroup>
                    <Button
                      color="warning"
                      onClick={() => this.handleUpdateClick(list.name)}
                      type="submit"
                    >
                      Update ticket
                    </Button>
                  </Form>
                </UncontrolledCollapse>
              </Col>
              <Col />
            </Row>
          );
        });
        this.setState({
          tickets: tickets
        });
      });
  };

  componentDidMount() {
    this.getTickets();
  }

  render() {
    return (
      <Container className="mt-4">
        <Button color="success" onClick={() => this.toggleCollapse()}>
          Create ticket
        </Button>
        <Collapse isOpen={this.state.collapse}>
          <Form className="mb-5" onSubmit={this.handleCreate}>
            <Row>
              <Col />
              <Col xs="6">
                <CardTitle className="text-center m-3">
                  Create new ticket
                </CardTitle>
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
                    name="ticketlog"
                    placeholder="Ticket log"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button
                  color="success"
                  type="submit"
                  onClick={this.handleClick}
                >
                  Add ticket
                </Button>
              </Col>
              <Col />
            </Row>
          </Form>
        </Collapse>
        {this.state.form}
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col />
            <Col xs="6">
              <CardTitle className="text-center m-3">
                Sort ticket by status
              </CardTitle>
              <FormGroup>
                <Input type="select" name="status" onChange={this.handleChange}>
                  <option>Open</option>
                  <option>Active</option>
                  <option>Failed</option>
                  <option>Closed</option>
                </Input>
                <ButtonGroup className="mt-3">
                  <Button
                    color="primary"
                    size="lg"
                    type="submit"
                    onClick={this.handleClick}
                  >
                    Sort ticket
                  </Button>
                  <Button color="primary" size="lg" onClick={this.handleShow}>
                    Show ticket
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
            <Col />
          </Row>
        </Form>
        {this.state.tickets}
        <Modal
          isOpen={this.state.deletemodal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>Confirm delete ticket</ModalHeader>
          <ModalBody>Confirm delete ticket</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={() => this.toggleDelete()}>
              Confirm
            </Button>
            <Button color="danger" onClick={() => this.toggleCancel()}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{this.state.title}</ModalHeader>
          <ModalBody>{this.state.message}</ModalBody>
          <ModalFooter>
            <Button color="danger" onClick={this.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </Container>
    );
  }
}

export default Home;
