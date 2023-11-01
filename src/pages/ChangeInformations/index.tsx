import React from 'react';



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
const ChangeInformations: React.FC = () => {
    return <h1>ALTERAR INFORMAÇÕES DE UMA EMPRESA!</h1>
}

export default ChangeInformations;