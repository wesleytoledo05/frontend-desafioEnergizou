export const insertMaskInPhone = (phone: string) => {
    const noMask = phone.toString().replace(/\D/g, "")
    const { length } = noMask;
    if (length <= 11) {
        return noMask
            .toString().replace(/(\d{2})(\d)/, '($1)$2')
            .toString().replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2')
    }
    return phone;

}