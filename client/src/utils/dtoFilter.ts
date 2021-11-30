
export function renderData(collection) {

    let renderedCollection = JSON.parse(JSON.stringify(collection))

    if (Array.isArray(collection))
        for (let obj of renderedCollection) {
            obj = parseObj(obj)
        }
    else if (typeof renderedCollection === 'object')
        renderedCollection = parseObj(renderedCollection)

    return renderedCollection
}


export function parseSubmitData(obj, data) {

    const { lookupProps, lookupTables } = data



    Object.keys(obj).forEach(k => {
        if (!obj[k] && obj[k] !== '')
            return

        //string to boolean
        obj[k] = obj[k] === 'sim' ? true
            : obj[k] === 'não' ? false
                : obj[k]

        if (obj[k] === '')
            delete obj[k]

        if (lookupProps.includes(k)) {

            const
                table = lookupTables.find(t => t.match(k))
                , collection = data[table]
                , objProp = k + '_id'
                , id = collection
                    .find(el => el.nome === obj[k])
                    .id
            obj[objProp] = id
        }
    })

    delete obj.restaurante
    delete obj.cozinha
    delete obj.categoria
    console.log("🚀 ~ file: dtoFilter.ts ~ line 55 ~ parseSubmitData ~ obj", obj)
    return obj
}



export const getJoinColumnsName = collection => {

    for (let obj of collection) {
        Object.keys(obj).forEach(k => {
            if (!obj[k] && obj[k] !== false)
                obj[k] = ''

            if (typeof obj[k] === 'object') {
                obj[k] = obj[k].hasOwnProperty('nome') && obj[k].nome
            }

            if (typeof obj[k] === 'boolean')
                obj[k] = obj[k] === true ? 'sim' : 'não'
        })
        delete obj.created_at
        delete obj.updated_at
    }
    return collection
}


const parseObj = obj => {
    Object.keys(obj).forEach(k => {
        if (!obj[k])
            return

        if (k.match("_at") || k.match("_id"))
            delete obj[k]

        if (typeof obj[k] === 'object') {
            obj[k] = obj[k].hasOwnProperty('nome') && obj[k].nome
        }
        delete obj.restaurante_id
    })
    return obj
}


