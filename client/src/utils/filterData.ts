export function filterData(user, data: any[]): any[] {

    const { perfil, restaurante_id } = user

    if (perfil === 'parceiro') {

        let key = 'restaurante_id'

        if (data.length && !data[0]?.restaurante_id)
            key = 'id'

        const filteredData = data.filter(el => el[key] === restaurante_id)

        return filteredData
    }
    else
        return data

}