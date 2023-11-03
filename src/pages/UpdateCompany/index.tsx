/* eslint-disable @typescript-eslint/no-unused-vars */
import { TextField, Stack, ThemeProvider, createTheme, Button } from '@mui/material';
import React, { ChangeEvent, useEffect } from 'react';
import api from '../../services/api';
import "./styles.css"
import { Link, useParams } from 'react-router-dom';
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
    id?: string | undefined;
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



const UpdateCompany: React.FC = () => {
    const { id } = useParams()


    const [model, setModel] = React.useState<IClient>({
        id: "",
        nameClient: '',
        email: '',
        password: '',
        companyname: '',
        cnpj: '',
        cep: '',
        address: '',
        number: '',
        phone: '',

    })

    useEffect(() => {
        if (id !== undefined) {
            findClient(id!)
        }
    }, [id])

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

        if (id !== undefined) {
            await api.put(`updatecompany/${id}`, normalizedPayload)
        } else {
            await api.post("/createcompany ", normalizedPayload)
        }
        window.location.href = "/"
    }

    async function findClient(id: string) {
        const response = await api.get(`/findcompanies/${id}`)
        setModel({
            nameClient: response.data.nameClient,
            email: response.data.email,
            password: response.data.password,
            companyname: response.data.companyname,
            cnpj: response.data.cnpj,
            cep: response.data.cep,
            address: response.data.address,
            number: response.data.number,
            phone: response.data.phone
        })
    }

    return (
        <React.Fragment>
            <div className='form-1'>
                <ThemeProvider theme={theme}>
                    <form onSubmit={onSubmit} className='form-2'>
                        <h4 style={{ textAlign: "center", marginBottom: "30px" }}>Alterar informações</h4>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                name='nameClient'
                                value={model.nameClient}
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
                                value={model.email}
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
                                value={model.password}
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
                                value={model.companyname}
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
                                required
                                fullWidth
                                onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)}
                            />
                        </div>
                        <Stack className='inputs' spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                type="text"
                                name='address'
                                value={model.address}
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
                                value={model.number}
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
                            <Button sx={{ marginRight: "15px", color: "#FFCC00" }} variant="contained" color="primary" type="submit">Alterar</Button>
                            <Link to="/"><Button variant="outlined" color="primary">Fechar</Button></Link>
                        </div>
                    </form>
                </ThemeProvider>
            </div >
        </React.Fragment >

    )
}


export default UpdateCompany;