const options = {
    legend: {
        display: false,
    },
    scales: {
        x: {
            type: 'linear',
            position: 'bottom'
        }
    },
    elements: {
        line: {
            tension: 0
        }
    }
}

const data = {
    datasets: [{
            data: [],
            pointRadius: 0,
            showLine: true,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#9EF48F'
    }]
}
const config={
    data:data,
    options: options
}
export default config