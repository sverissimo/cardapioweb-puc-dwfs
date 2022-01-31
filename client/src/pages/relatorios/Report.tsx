import { Bar, Column, Pie } from '@ant-design/plots'
import ChartFactory from '../../utils/ChartFactory'
import styles from './relatorios.module.scss'
const { reportCard } = styles

const Report = ({ title, index, restaurantesPorCidade = [], restaurantesPorCozinha = [],
    produtosPorRestaurante = [], mediaDePrecoPorRestaurante = [], produtosPorCategoria = [] }) => {


    const returnChart = (index) => {
        let config
        switch (index) {
            case 0:
                config = new ChartFactory().toBar(produtosPorRestaurante)
                return <Bar {...config} />

            case 1:
                config = new ChartFactory().toColumn(mediaDePrecoPorRestaurante)
                return <Column {...config} />

            case 2:
                config = new ChartFactory().toPie(produtosPorCategoria)
                return <Pie {...config} />

            case 3:
                config = new ChartFactory().toPie(restaurantesPorCozinha)
                return <Pie {...config} />

            case 4:
                config = new ChartFactory().toPie(restaurantesPorCidade)
                return <Pie {...config} />
            default:
                break
        }
    }


    return (
        <div className={reportCard}>
            <h6>{title}</h6>

            {returnChart(index) && returnChart(index)}

        </div>
    )

}

export default Report