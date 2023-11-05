/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import api from '../../services/api';
import "./styles.css"

import { insertMaskInCep, insertMaskInCnpj, insertMaskInPhone, removeMask } from '../../functions/Masks';


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

const RegistrationForm: React.FC = () => {

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

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setModel({
            ...model,
            [e.target.name]: e.target.value
        })
    }

    function normalizeModel(model: IClient): IClient {
        return {
            ...model,
            cnpj: removeMask(model.cnpj),
            cep: removeMask(model.cep),
            phone: removeMask(model.phone)
        }
    }

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        const normalizedPayload = normalizeModel(model);


        await api.post("/createcompany", normalizedPayload)
        window.location.href = "/"
    }

    const checkCep = (e: { target: { value: string; }; }) => {
        const cep = e.target.value.replace(/\D/g, '')
        fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(res => res.json()).then(data => {
                setModel({
                    ...model,
                    address: data.logradouro
                })
            }).catch(error => console.error(error))
    }

    return (
        <React.Fragment>
            <div className='form-1'>
                <ThemeProvider theme={theme}>
                    <form onSubmit={onSubmit} className='form-2'>
                        <h4 style={{ textAlign: "center", marginBottom: "30px" }}>Cadastrar nova empresa</h4>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='nameClient'
                                variant='outlined'
                                color='secondary'
                                label="Nome do cliente"
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="email"
                                name='email'
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                fullWidth
                                required
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="password"
                                name='password'
                                variant='outlined'
                                color='secondary'
                                label="Senha"
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='companyname'
                                variant='outlined'
                                color='secondary'
                                label="Nome da empresa (Razão Social)"
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='cnpj'
                                value={insertMaskInCnpj(model.cnpj)}
                                variant='outlined'
                                color='secondary'
                                label="CNPJ"
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='cep'
                                value={insertMaskInCep(model.cep)}
                                variant='outlined'
                                color='secondary'
                                label="CEP"
                                onBlur={checkCep}
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <Stack className='inputs' spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                type="text"
                                name='address'
                                variant='outlined'
                                color='secondary'
                                label="Endereço"
                                value={model.address}
                                fullWidth
                                disabled
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                            <TextField
                                type="number"
                                name='number'
                                variant='outlined'
                                color='secondary'
                                label="N°"
                                fullWidth
                                required
                                sx={{ width: "120px" }}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </Stack>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='phone'
                                value={insertMaskInPhone(model.phone)}
                                variant='outlined'
                                color='secondary'
                                label="Telefone"
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <div className='butons'>
                            <Button sx={{ marginRight: "15px", color: "#FFCC00" }} variant="contained" color="primary" type="submit">Cadastrar</Button>
                            <Link to="/"><Button variant="outlined" color="primary">Fechar</Button></Link>
                        </div>
                    </form>
                </ThemeProvider>
            </div >
        </React.Fragment >
    )
}

export default RegistrationForm;