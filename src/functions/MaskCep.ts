export const insertMaskInCep = (cep: string) => {
    return cep.toString().replace(/(\d{5})(\d)/, '$1-$2')
}