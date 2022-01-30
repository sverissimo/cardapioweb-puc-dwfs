export function filterData(user, data: any[]): any[] {

    const { perfil, restaurante } = user

    if (perfil === 'Parceiro') {

        let key = 'restaurante'

        if (data.length && !data[0]?.restaurante)
            key = 'nome'

        const filteredData = data.filter(el => el[key] === restaurante)

        return filteredData
    }
    else
        return data

}