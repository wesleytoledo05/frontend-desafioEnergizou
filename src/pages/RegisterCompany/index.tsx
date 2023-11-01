import * as React from 'react';

import "./styles.css"
import { Link } from 'react-router-dom';
import { Button, Stack, TextField, ThemeProvider, createTheme } from '@mui/material';
import { RoutesEnum } from '../../enums/PagesRoutesEnum';

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

function RegistrationForm() {
    return (
        <React.Fragment>
            <div className='form-1'>
                <ThemeProvider theme={theme}>
                    <form className='form-2'>
                        <h4 style={{ textAlign: "center", marginBottom: "30px" }}>Cadastrar nova empresa</h4>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Nome do cliente"
                                fullWidth
                                required
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="email"
                                variant='outlined'
                                color='secondary'
                                label="Email"
                                fullWidth
                                required
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Senha"
                                required
                                fullWidth
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Nome da empresa (Razão Social)"
                                required
                                fullWidth
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="CNPJ"
                                required
                                fullWidth
                            />
                        </div>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="CEP"
                                required
                                fullWidth
                            />
                        </div>
                        <Stack className='inputs' spacing={2} direction="row" sx={{ marginBottom: 2 }}>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Endereço"
                                fullWidth
                                disabled
                            />
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="N°"
                                fullWidth
                                required
                                sx={{ width: "120px" }}
                            />
                        </Stack>
                        <div className='inputs'>
                            <TextField
                                type="text"
                                variant='outlined'
                                color='secondary'
                                label="Telefone"
                                required
                                fullWidth
                            />
                        </div>
                        <div className='butons'>
                            <Button sx={{ marginRight: "15px", color: "#FFCC00" }} variant="contained" color="primary" type="submit">Cadastrar</Button>
                            <Link to={RoutesEnum.HOME}><Button variant="outlined" color="primary">Fechar</Button></Link>
                        </div>
                    </form>
                </ThemeProvider>
            </div >
        </React.Fragment >

    )
}

export default RegistrationForm;