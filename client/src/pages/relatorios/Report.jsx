import { ChartFactory } from './ChartFactory'
import styles from './relatorios.module.scss'
const { reportCard } = styles

const Report = ({ title, index, restaurantesPorCidade = [],
    restaurantesPorCozinha = [], produtosPorRestaurante = [],
    mediaDePrecoPorRestaurante = [], produtosPorCategoria = [] }) => {

    let chartReport
    switch (index) {
        case 0:
            chartReport = new ChartFactory().toBar(produtosPorRestaurante)
            break;
        case 1:
            chartReport = new ChartFactory().toColumn(mediaDePrecoPorRestaurante)
            break;
        case 2:
            chartReport = new ChartFactory().toPie(produtosPorCategoria)
            break;
        case 3:
            chartReport = new ChartFactory().toPie(restaurantesPorCozinha)
            break;
        case 4:
            chartReport = new ChartFactory().toPie(restaurantesPorCidade)
            break;
        default:
            break
    }

    return (
        <div className={reportCard}>
            <h6>{title}</h6>

            {chartReport && chartReport}

        </div>
    )

}

export default Report