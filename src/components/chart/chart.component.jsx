import React from 'react'
import { Scatter } from 'react-chartjs-2'
import './chart.styles.scss'
import config from './chart.config'

function Chart() {
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function getData(){
        let data=[]
        for(let i=0; i<10; i++){
            data.push({ x:i, y:getRandomInt(0,300)})
        }
        return data
    }
    let data = config.data
    data.datasets[0].data=getData()
    
    return (
        <div className='Line'>
            <Scatter 
                data= {data}
                options={config.options}
            />
        </div>
    )
}

export default Chart
