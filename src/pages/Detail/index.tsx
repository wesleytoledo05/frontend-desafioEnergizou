/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField, ThemeProvider, createTheme, Stack, Button, ListItem, ListItemIcon, ListItemText, List } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React, { ChangeEvent, useState, useEffect } from 'react';
import api from '../../services/api';
import { Card } from 'react-bootstrap';

import "./styles.css"




const theme = createTheme({
  palette: {
    primary: {
      main: '#003063'
    },
    secondary: {
      main: '#003063',
    },
  },
});
interface IClient {
  nameClient?: string;
  email?: string;
  password?: string;
  companyname?: string;
  cnpj?: number
  cep?: number;
  address?: string;
  number?: number;
  phone?: number;
}

const Detail: React.FC = () => {
  const { id } = useParams()

  useEffect(() => {
    findClient()
  }, [id])

  const [model, setModel] = useState<IClient>({
    nameClient: '',
    email: '',
    password: '',
    companyname: '',
    cnpj: 0,
    cep: 0,
    address: '',
    number: 0,
    phone: 0

  })

  function updatedModel(e: ChangeEvent<HTMLInputElement>) {
    setModel({
      ...model,
      [e.target.name]: e.target.value
    })
  }

  async function findClient() {
    const response = await api.get<IClient>(`/findcompanies/${id}`)
    console.log(response)
    setModel(response.data)

  }
  return (
    <div className="container">
      <br />
      <div className='clientDetail'>
        <h1>Detalhes do cliente: {model.nameClient}</h1>
        <Link to={"/"}><Button variant="contained" color="primary">Fechar</Button></Link>
      </div>
      <br />
      <Card style={{ textAlign: "center", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Card.Body>
          <Card.Title>Nome do cliente: {model.nameClient}</Card.Title>
          <Card.Text>
            <strong>Email: {model.email}</strong>
            <br />
            <strong>Senha: {model.password}</strong>
            <br />
            <strong>Nome da empresa: {model.companyname}</strong>
            <br />
            <strong>CNPJ: {model.cnpj}</strong>
            <br />
            <strong>CEP: {model.cep}</strong>
            <br />
            <strong>Endereço: {model.address}</strong>
            <br />
            <strong>Número: {model.number}</strong>
            <br />
            <strong>Telefone: {model.phone}</strong>
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Detail;
