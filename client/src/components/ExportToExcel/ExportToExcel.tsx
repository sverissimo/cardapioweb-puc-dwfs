import Image from "next/image";
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'

export default function ExportToExcel({ data, subject }) {

    const downloadXls = () => {

        const
            fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
            , fileExtension = '.xlsx'
            , fileName = subject

        const ws = XLSX.utils.json_to_sheet(data)
            , wb = { Sheets: { 'data': ws }, SheetNames: ['data'] }
            , excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
            , dataToExport = new Blob([excelBuffer], { type: fileType })

        FileSaver.saveAs(dataToExport, fileName + fileExtension);
    }

    return (
        <div className='downloadXls' onClick={downloadXls}>
            <Image
                className='downloadXls__icon'
                width='25rem'
                height='20rem'
                src="/excel.png"
                alt="Fazer o download do arquivo xlsx"
                title='Exportar para excel (.xlsx)'
            />
            <span className="downloadXls__text">
                Baixar como planilha do excel
            </span>
        </div>
    )
}