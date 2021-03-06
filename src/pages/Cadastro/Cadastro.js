import React, { Component } from 'react';
import './styles.css';
import { Row, Form, Button, Card } from 'react-bootstrap'

import Menu from '../../components/Menu'
import Footer from '../../components/Footer'

import { storagedTokenIsValid, setStoragedToken } from '../../services/token'

import api from '../../services/api';

class Cadastro extends Component {
  state = {
    nome: '',
    email: '',
    password: '',
  }

  async componentDidMount() {
    const isValid = await storagedTokenIsValid()
    // Se já estiver logado, encaminha para a sala
    if (isValid) {
      await console.log('Boa, ta logado!')
      await this.props.history.push("/sala")
    }
  }

  handleNameChange = event => {
    this.setState({ nome: event.target.value });
  }

  handleEmailChange = event => {
    this.setState({ email: event.target.value })
  }

  handlePasswordChange = event => {
    this.setState({ password: event.target.value })
  }

  handleSubmit = async event => {
    // Cancela o comportamento normal do submit para validarmos e enviarmos os dados
    event.preventDefault()

    const { nome, email, password } = this.state

    // if (!nome.isValid || !email.isValid || !password.isValid) {
    //   return
    // }

    // Requisita o login para a api
    const response = await api.post('alunos', { nome, email, password })

    // Salva o token da sessão no cache do navegador
    await setStoragedToken(response.data.data.user.stsTokenManager.accessToken)
    await this.props.history.push('/sala');
  }

  render() {
    return (
      <div className="container-fluid justify-content-center align-items-center">
        <Row>
          <Menu />
        </Row>
        <Row className="justify-content-center align-items-center" style={{ minHeight: (window.innerHeight - 200) }}>
          <Card bg="light" style={{ width: '18rem' }} >

            <Form className="col-12" onSubmit={this.handleSubmit}>
              <Form.Group controlId="formBasicName">
                <Form.Label><b>Nome</b></Form.Label>
                <Form.Control placeholder="Digite seu nome" onChange={this.handleNameChange} required />
              </Form.Group>
              <Form.Group controlId="formBasicEmail" className="mt-3">
                <Form.Label><b>Email</b></Form.Label>
                <Form.Control type="email" placeholder="Digite seu email" onChange={this.handleEmailChange} required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label><b>Senha</b></Form.Label>
                <Form.Control type="password" minLength="6" placeholder="Digite sua senha" onChange={this.handlePasswordChange} required />
              </Form.Group >
              <Form.Group controlId="SignUpButton" className="justify-content-center align-items-center row mx-1" >
                <Button variant="primary" type="submit" block>
                  Cadastrar
                </Button>
              </Form.Group>
            </Form>

          </Card>
        </Row>

        <Row>
          <Footer />
        </Row>
      </div>

    );
  }
}

export default Cadastro;
