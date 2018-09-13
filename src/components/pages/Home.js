import React, { Component } from "react";
import axios from "axios";
import {
  Button,
  ButtonGroup,
  Container,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Form,
  FormGroup,
  Input
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
            <Card
              className="text-center"
              body
              inverse
              color="info"
              key={list._id}
            >
              <CardBody>
                <CardTitle>Ticket no: {list._id}</CardTitle>
                <CardTitle>{list.name}</CardTitle>
                <CardSubtitle>{list.status}</CardSubtitle>
                <CardText>{list.logs}</CardText>
              </CardBody>
            </Card>
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
      <Container>
        <Form onSubmit={this.handleSubmit}>
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
        </Form>
        {this.state.tickets}
      </Container>
    );
  }
}

export default Home;
