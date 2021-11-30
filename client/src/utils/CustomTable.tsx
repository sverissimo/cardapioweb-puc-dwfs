import { renderData } from "./dtoFilter";

const editDeleteFields = [
    {
        field: 'edit',
        value: <i className="bi bi-edit" />,
        action: 'edit',
        style: {
            width: '20px'
        }
    },
    {
        field: 'remove',
        value: <i className="bi bi-trash" />,
        action: 'delete',
        style: {
            width: '20px'
        }
    }
]


export default function CustomTable({ collection: originalCollection, title, style, idIndex = 0, editElement, deleteElement, openEditDialog }) {

    const collection = originalCollection[0] && renderData(originalCollection)
        , entity = collection[0]
        , tableHeaders = Object.keys(entity)
        , arrayOfRows = []
        , length = tableHeaders.length

    //console.log("🚀 ~ file: CustomTable.tsx ~ line 26 ~ CustomTable ~ collection", collection)
    collection.forEach(entity => {
        arrayOfRows.push(
            Object.entries(entity).map(([k, v]) => ({
                field: k,
                title: k,
                value: v
            }))
        )
    });

    tableHeaders.splice(0, 1)
    tableHeaders.push('edit', 'remove')
    arrayOfRows.forEach(e => e.push(...editDeleteFields))

    //console.log("🚀 ~ file: CustomTable.tsx ~ line 37 ~ CustomTable ~ arrayOfRows", arrayOfRows)

    return (
        <table className='table'>
            <thead>
                <tr>
                    <th className='tHeader'
                        scope='col'
                        style={style}
                        colSpan={length}>{title}</th>
                </tr>
                <tr>
                    {tableHeaders.map((l, i) => <th key={i} style={style}>{l}</th>)}
                </tr>
            </thead>
            <tbody>
                {
                    arrayOfRows.map((el, j) =>
                        <tr key={j}>
                            {
                                el.map((obj, index) => obj.field !== 'id' &&
                                    <td key={index} style={obj.style && { ...obj.style } || { width: '20px' }} className={obj.action && 'link'}

                                    >
                                        {/* {
                                            obj?.action === 'delete' && el[idIndex]?.value ? (
                                                <i className="bi bi-trash" />
                                            )
                                                : obj.value
                                        } */}
                                        {typeof obj.value !== 'object' ? obj.value
                                            : obj.action === 'edit' ?
                                                <i
                                                    className="bi bi-pencil-square"
                                                    style={{ color: 'blue' }}
                                                    onClick={() => editElement(j)}
                                                />
                                                : obj.action === 'delete' ?
                                                    <i
                                                        className="bi bi-trash"
                                                        style={{ color: 'red' }}
                                                        onClick={() => deleteElement(el)} />
                                                    : ''}
                                    </td>
                                )}
                        </tr>
                    )}
            </tbody>
        </table >
    )
}