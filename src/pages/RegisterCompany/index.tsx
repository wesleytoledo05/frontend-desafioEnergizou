/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { ChangeEvent, useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import api from '../../services/api';
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



const RegistrationForm: React.FC = () => {

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

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()

        console.log(model)

        const response = await api.post("/createcompany", model)
        window.location.href = "/"
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
                                required
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
                                type="text"
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
                                type="number"
                                name='cnpj'
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
                                type="number"
                                name='cep'
                                variant='outlined'
                                color='secondary'
                                label="CEP"
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
                                type="number"
                                name='phone'
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