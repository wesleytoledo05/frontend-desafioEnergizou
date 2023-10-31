/* eslint-disable jsx-a11y/anchor-has-content */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, } from '@mui/material';
import SearchSharpIcon from '@mui/icons-material/SearchSharp';

import "./styles.css"
import { RoutesEnum } from '../../enums/PagesRoutesEnum';

function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
    protein: number,
) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Home: React.FC = () => {
    return (
        <div className='container '>
            <h1>Sistema de Gerenciamento de Empresas!</h1>

            <div className='butons'>
                <a href={RoutesEnum.REGISTERCOMPANY}>
                    <Button
                        sx={{
                            color: "#FFCC00",
                            backgroundColor: "#003063",
                            borderRadius: "10px"
                        }} id='registerCompany' variant="contained">
                        Cadastrar empresa
                    </Button>
                </a>

                <Button
                    sx={{
                        width: "45px",
                        height: "45px",
                        backgroundColor: "#FFCC00",
                        color: "#003063",
                        borderRadius: "10px"
                    }} variant="contained" startIcon={<SearchSharpIcon />}></Button>
            </div>

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
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">{row.calories}</TableCell>
                                <TableCell align="left">{row.fat}</TableCell>
                                <TableCell align="center">{row.carbs}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div >
    )
}

export default Home;