import { TableModelFactory } from "./TableModelFactory";


export default function CustomTable({ collection: originalCollection, title, style, idIndex = 0, editElement, deleteElement, openEditDialog }) {

    const
        tableModel = new TableModelFactory(title)
        , collection = tableModel.toTable(originalCollection)
        , { tableHeaders, length, arrayOfRows } = collection
    //console.log("🚀 ~ file: CustomTable.tsx ~ line 10 ~ CustomTable ~ tableHeaders", tableHeaders)

    return (
        <table className='table'>
            {/*   <thead style={{ textAlign: 'center' }}> */}
            <thead>
                <tr>
                    <th className='tHeader'
                        scope='col'
                        colSpan={length}>{title}</th>
                </tr>
                <tr>
                    {
                        tableHeaders.map((header, i) => header !== 'Id' &&
                            <th key={i}
                                style={style}
                                className={(header === 'Editar' || header === 'Remover' || header === 'Estado') ? 'link' : ''}>
                                {header}
                            </th>
                        )
                    }
                </tr>
            </thead>
            <tbody>
                {
                    arrayOfRows.map((el, j) =>
                        <tr key={j}>
                            {
                                tableHeaders.map((header, index) => {
                                    const obj = el[index]
                                    return (
                                        obj.field !== 'id' &&
                                        <td key={index} className={(obj.action || obj.field === 'estado') ? 'link' : ''}>
                                            {
                                                typeof obj.value !== 'object' ? obj.value
                                                    : obj.action === 'edit' ?
                                                        <i
                                                            className="bi bi-pencil-square link"
                                                            style={{ color: 'blue' }}
                                                            onClick={() => editElement(j)}
                                                        />
                                                        : obj.action === 'delete' ?
                                                            <i
                                                                className="bi bi-trash link"
                                                                style={{ color: 'red' }}
                                                                onClick={() => deleteElement(el)} />
                                                            : ''
                                            }
                                        </td>
                                    )
                                })
                            }
                        </tr>
                    )}
            </tbody>
        </table >
    )
}