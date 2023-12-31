/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createTheme, Button } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Card } from 'react-bootstrap';

import "./styles.css"
import { insertMaskInCep, insertMaskInCnpj, insertMaskInPhone } from '../../functions/Masks';


interface IClient {
  nameClient: string;
  email: string;
  password: string;
  companyname: string;
  cnpj: string
  cep: string;
  address: string;
  number: string;
  phone: string;
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
    cnpj: '',
    cep: '',
    address: '',
    number: '',
    phone: ''

  })

  async function findClient() {
    const response = await api.get<IClient>(`/findcompanies/${id}`)
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
            <strong>CNPJ: {insertMaskInCnpj(model.cnpj || '')}</strong>
            <br />
            <strong>CEP: {insertMaskInCep(model.cep || '')}</strong>
            <br />
            <strong>Endereço: {model.address}</strong>
            <br />
            <strong>Número: {model.number}</strong>
            <br />
            <strong>Telefone: {insertMaskInPhone(model.phone || '')}</strong>
            <br />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Detail;
