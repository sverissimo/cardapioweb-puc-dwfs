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


export default function CustomTable({ collection = [], title, style, idIndex = 0, deleteFunction, openEditDialog }) {

    const
        entity = collection[0]
        , tableHeaders = Object.keys(entity)
        , arrayOfRows = []
        , length = tableHeaders.length

    collection.forEach(entity => {

        arrayOfRows.push(
            Object.entries(entity).map(([k, v]) => ({
                field: k,
                title: k,
                value: v
            }))
        )
    });

    tableHeaders.push('edit', 'remove')
    arrayOfRows.forEach(e => e.push(...editDeleteFields))

    console.log("🚀 ~ file: CustomTable.tsx ~ line 37 ~ CustomTable ~ arrayOfRows", arrayOfRows)

    return (
        <table className='showDetailsTable'>
            <thead>
                <tr>
                    <th className='tHeader'
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
                                el.map((obj, i) => obj.field !== 'id' &&
                                    <td key={i} style={obj.style || { ...style }} className={obj.action && 'link'}

                                    >
                                        {/* {
                                            obj?.action === 'delete' && el[idIndex]?.value ? (
                                                <i className="bi bi-trash" />
                                            )
                                                : obj.value
                                        } */}
                                        {typeof obj.value !== 'object' ? obj.value
                                            : obj.action ? <i className="bi bi-trash" />
                                                : null}
                                    </td>
                                )}
                        </tr>
                    )}
            </tbody>
        </table >
    )
}