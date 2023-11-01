/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, ButtonGroup, ThemeProvider, createTheme, } from '@mui/material';

import SearchSharpIcon from '@mui/icons-material/SearchSharp';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';

import "./styles.css"
import { RoutesEnum } from '../../enums/PagesRoutesEnum';
import { Link } from 'react-router-dom';
import api from "../../services/api"
import { useNavigate } from 'react-router-dom';


interface IClient {
    id: string;
    nameClient: string;
    email: string;
    password: string;
    companyname: string;
    cnpj: number;
    cep: number;
    address: string;
    number: number;
    phone: number;
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

    const [clients, setClients] = useState<IClient[]>([])
    const navigate = useNavigate()

    useEffect(() => {
        loadClient()
    }, [])

    async function loadClient() {
        const response = await api.get("/listcompanies")
        console.log(response)
        setClients(response.data)
    }

    function newClient() {
        navigate("/registercompany")
    }

    return (
        <div className='container '>
            <ThemeProvider theme={theme}>
                {/* <h1>Sistema de Gerenciamento de Empresas!</h1> */}
                <div className='butons'>
                    <Link to={RoutesEnum.REGISTERCOMPANY}>
                        <Button
                            sx={{ color: "#FFCC00" }}
                            color="primary"
                            id='registerCompany'
                            variant="contained">
                            Cadastrar empresa
                        </Button>
                    </Link>

                    <Button sx={{ height: "45px", color: "#003063" }}
                        variant="outlined"
                        startIcon={<SearchSharpIcon />}>
                    </Button>
                </div>
            </ThemeProvider>

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
                        {clients.map(client => (
                            <TableRow key={client.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{client.nameClient}</TableCell>
                                <TableCell align="left">{client.companyname}</TableCell>
                                <TableCell align="left">{client.cnpj}</TableCell>
                                <TableCell align="center">
                                    <ButtonGroup size="large" aria-label="large outlined button group">
                                        <Link to={RoutesEnum.CHANGEINFORMATION}><Button sx={{ color: "#000000", borderColor: "#003063", backgroundColor: "#0030633d" }} startIcon={<EditOutlinedIcon />}></Button></Link>
                                        <Link to={RoutesEnum.INFORMATIONS}><Button sx={{ color: "#000000", borderColor: "#FFCC00", backgroundColor: "#ffcc003a" }} startIcon={<InfoOutlinedIcon />}></Button></Link>
                                        <Button sx={{ color: "#000000", borderColor: "red", backgroundColor: "#ff000039" }} startIcon={<DeleteOutlinedIcon />}></Button>
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