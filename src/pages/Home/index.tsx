/* eslint-disable eqeqeq */
/* eslint-disable no-sequences */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, TextField, ThemeProvider, createTheme, } from '@mui/material';

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "./styles.css"
import api from "../../services/api"
import { useNavigate } from 'react-router-dom';
import CustomDialog from '../../components/CustomDialog';
import { insertMaskInCnpj } from '../../functions/Masks';


interface IClient {
    id: string;
    nameClient: string;
    email: string;
    password: string;
    companyname: string;
    cnpj: string;
    cep: string;
    address: string;
    number: string;
    phone: string;
}

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

const Home: React.FC = () => {
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const [clients, setClients] = useState<IClient[]>([])
    const [filter, setFilter] = useState('');

    const navigate = useNavigate()
    useEffect(() => {
        loadClient()
    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const filteredClients = clients.filter((client) =>
        client.cnpj.toString().toLowerCase().includes(filter.toLowerCase())
    );

    async function loadClient() {
        const response = await api.get("/listcompanies")
        setClients(response.data)
    }

    function newClient() {
        navigate("/registercompany", { replace: true })
    }

    function editClient(id: string) {
        navigate(`/updatecompany/${id}`, { replace: true })
    }

    function viewClient(id: string) {
        navigate(`/detail/${id}`, { replace: true })
    }

    async function deleteClient() {
        await api.delete(`/deletecompany/${id}`)
        handleClose()
        loadClient()
    }


    return (

        <div className='container '>
            <CustomDialog
                title="Deletar cadastro"
                message="VOCÊ TEM CERTEZA QUE DESEJA DELETAR O CADASTRO DESSA EMPRESA?"
                open={open}
                handleClose={handleClose}
                handleSubmit={deleteClient}
            />

            <ThemeProvider theme={theme}>
                <div style={{ margin: "20px 0", alignItems: "center", display: "flex" }}>
                    <TextField
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        id="standard-basic"
                        label="Filtrar por CNPJ"
                        sx={{ width: "90%", padding: "8px" }}
                    />
                    <Button
                        sx={{ color: "#FFCC00" }}
                        color="primary"
                        id='registerCompany'
                        variant="contained"
                        onClick={newClient}>
                        Cadastrar empresa
                    </Button>
                </div>

            </ThemeProvider >

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650, backgroundColor: "#D9D9D9" }} aria-label="simple table">
                    <TableHead >
                        <TableRow >
                            <TableCell sx={{ fontWeight: "bolder", fontSize: "17px" }} >Nome do cliente</TableCell>
                            <TableCell sx={{ fontWeight: "bolder", fontSize: "17px" }} align="left">Razão Social</TableCell>
                            <TableCell sx={{ fontWeight: "bolder", fontSize: "17px" }} align="left">CNPJ</TableCell>
                            <TableCell sx={{ fontWeight: "bolder", fontSize: "17px" }} align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredClients.map(client => (
                            <TableRow key={client.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{client.nameClient}</TableCell>
                                <TableCell align="left">{client.companyname}</TableCell>
                                <TableCell align="left">{insertMaskInCnpj(client.cnpj)}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size="large" aria-label="large outlined button group">
                                        <Button onClick={() => editClient(client.id)} sx={{ color: "#000000", borderColor: "#003063", backgroundColor: "#0030633d" }} startIcon={<EditOutlinedIcon />}></Button>
                                        <Button onClick={() => viewClient(client.id)} sx={{ color: "#000000", borderColor: "#FFCC00", backgroundColor: "#ffcc003a" }} startIcon={<InfoOutlinedIcon />}></Button>
                                        <Button onClick={() => { handleClickOpen(); setId(client.id) }} sx={{ color: "#000000", borderColor: "red", backgroundColor: "#ff000039" }} startIcon={<DeleteOutlinedIcon />}></Button>
                                    </ButtonGroup>

                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >

    )

}

export default Home;