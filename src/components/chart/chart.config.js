const options = {
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
        label: 'Scatter Dataset',
            data: [
            {
                x: 0,
                y: 0
            }, {
                x: 5,
                y: 100
            }, {
                x: 10,
                y: -300
            }, {
                x: 15,
                y: -100
            },
            {
                x: 20,
                y: -100
            }, {
                x: 25,
                y: -100
            }, {
                x: 30,
                y: 200
            }, {
                x: 35,
                y: -100
            },{
                x: 40,
                y: -100
            }, {
                x: 45,
                y: -100
            }, {
                x: 50,
                y: -300
            }, {
                x: 55,
                y: 100
            },
            {
                x: 60,
                y: -100
            }, {
                x: 65,
                y: -100
            }, {
                x: 70,
                y: -300
            }, {
                x: 75,
                y: -100
            },{
                x: 80,
                y: 0
            }, {
                x: 85,
                y: 100
            }, {
                x: 90,
                y: -300
            }, {
                x: 95,
                y: 50
            },
            {
                x: 100,
                y: 0
            }, {
                x: 105,
                y: 100
            }, {
                x: 110,
                y: -300
            }, {
                x: 115,
                y: 50
            },{
                x: 120,
                y: 0
            }, {
                x: 125,
                y: 100
            }, {
                x: 130,
                y: -300
            }, {
                x: 135,
                y: 50
            }
            ],
            pointRadius: 5,
            showLine: true,
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: '#39FF14'
    }]
}
const config={
    data:data,
    options: options
}
export default config