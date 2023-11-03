export const insertMaskInCnpj = (cnpj: string) => {
    return cnpj.toString()
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1')
}


export const insertMaskInPhone = (phone: string) => {
    const noMask = phone.toString().replace(/\D/g, "")
    const lenght = noMask.length;
    const maxLenght = lenght <= 10 ? 10 : 11

    return noMask
        .substring(0, maxLenght)
        .replace(/^(\d{2})(\d)/, '($1)$2')
        .replace(lenght <= 10 ? /(\d{4})(\d)/ : /(\d{5})(\d)/, '$1-$2')
}

export const insertMaskInCep = (cep: string) => {
    return cep.toString()
        .substring(0, 9)
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d)/, '$1-$2')
}

export const removeMask = (value: string) => {
    return value.toString().replace(/\D/g, "")
}