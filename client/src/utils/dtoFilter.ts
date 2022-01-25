
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
        obj[k] === 'sim' ? true
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
    return obj
}



export const getJoinColumnsName = collection => {

    for (let obj of collection) {
        Object.keys(obj).forEach(k => {
            if (!obj[k] && obj[k] !== false)
                obj[k] = ''

            if (typeof obj[k] === 'object')
                if (obj[k].hasOwnProperty('nome'))
                    obj[k] = obj[k]?.nome || ''

            if (typeof obj[k] === 'boolean')
                obj[k] === true ? obj[k] = 'sim' : obj[k] = 'não'
        })
        delete obj.created_at
        delete obj.updated_at
    }
    return collection
}


const parseObj = obj => {
    //console.log("🚀 ~ file: dtoFilter.ts ~ line 77 ~ obj", obj)

    Object.keys(obj).forEach(k => {
        if (!obj[k])
            obj[k] = ''

        if (k.match("_at") || k.match("_id"))
            delete obj[k]

        if (typeof obj[k] === 'object' && obj[k].hasOwnProperty('nome')) {
            obj[k] = obj[k].nome
        }

        if (k === 'endereco') {
            //console.log("🚀 ~ file: dtoFilter.ts ~ line 92 ~ Object.keys ~ obj[k]", obj[k])
            const { logradouro, numero } = obj[k]
            if (logradouro)
                obj[k] = logradouro + ', ' + numero
        }

        delete obj.restaurante_id
    })
    return obj
}


