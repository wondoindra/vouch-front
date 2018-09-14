import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Container,
  Card,
  CardHeader,
  Form,
  FormGroup,
  Input,
  Table,
  Row,
  Col
} from "reactstrap";

class Home extends Component {
  constructor() {
    super();

    this.state = {
      tickets: [],
      URL: "https://vouch-backend.herokuapp.com/tickets/"
    };
  }

  handleClick = () => {
    this.setState({ active: !this.state.active });
  };

  handleShow = async () => {
    await this.setState({ active: !this.state.active });
    await this.setState({
      URL: "https://vouch-backend.herokuapp.com/tickets/"
    });
    await this.getTickets();
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const data = {
      status: this.state.status
    };
    await this.setState({
      URL: `https://vouch-backend.herokuapp.com/tickets/${data.status}`
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
        let tickets = data.data.map(list => {
          return (
            <Row className="mb-4">
              <Col />
              <Col xs="6">
                <Card outline color="secondary" key={list._id}>
                  <CardHeader tag="h4">{list.name}</CardHeader>
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
                        <th scope="row">Logs :</th>
                        <td>{list.logs}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
              </Col>
              <Col />
            </Row>
          );
        });
        this.setState({ tickets: tickets });
      });
  };

  componentDidMount() {
    this.getTickets();
  }

  render() {
    return (
      <Container className="mt-4">
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col />
            <Col xs="6">
              <FormGroup>
                <Input type="select" name="status" onChange={this.handleChange}>
                  <option>Open</option>
                  <option>Active</option>
                  <option>Failed</option>
                  <option>Closed</option>
                </Input>
                <ButtonGroup className="mt-3">
                  <Button size="lg" type="submit" onClick={this.handleClick}>
                    Sort ticket
                  </Button>
                  <Button size="lg" onClick={this.handleShow}>
                    Show ticket
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
            <Col />
          </Row>
          <FormGroup className="mt-5">{this.state.tickets}</FormGroup>
        </Form>
      </Container>
    );
  }
}

export default Home;
