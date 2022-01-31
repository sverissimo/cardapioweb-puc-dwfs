import { Bar, Column, Pie } from '@ant-design/plots'

export class ChartFactory {

    toBar(rawData: any[]) {

        const data = []

        for (let obj of rawData) {
            Object.entries(obj).forEach(([k, v]) => {
                data.push({ type: k, value: v })
            })
        }

        const config = {
            data,
            xField: 'value',
            yField: 'type',
            seriesField: 'type',

        }

        if (data.length)
            return <Bar {...config} />
    }

    toColumn(rawData: any[]) {
        const data = []

        for (let obj of rawData) {
            Object.entries(obj).forEach(([k, v]) => {
                data.push({ type: k, ['Média de preço (R$)']: v })
            })
        }

        const config = {
            data,
            xField: 'type',
            yField: 'Média de preço (R$)',
            /* label: {
                position: 'middle',
                // 'top', 'bottom', 'middle',               
                style: {
                    fill: '#FFFFFF',
                    opacity: 0.6,
                },
            }, */
            xAxis: {
                label: {
                    autoHide: true,
                    autoRotate: false,
                },
            },

        };
        return <Column {...config} />;
    }

    toPie(rawData) {

        const data = []

        for (let obj of rawData) {
            Object.entries(obj).forEach(([k, v]) => {
                data.push({ type: k, value: v })
            })
        }

        const config = {
            appendPadding: 10,
            data,
            angleField: 'value',
            colorField: 'type',
            radius: 0.9,
            label: {
                type: 'inner',
                offset: '-30%',
                content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
                style: {
                    fontSize: 14,
                    textAlign: 'center',
                },
            },
            interactions: [
                {
                    type: 'element-active',
                },
            ],
        };

        if (data.length) {
            return <Pie {...config} />
        }
        else
            return null
    }
}