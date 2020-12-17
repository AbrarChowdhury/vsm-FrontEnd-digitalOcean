import React from 'react'
import { Scatter } from 'react-chartjs-2'
import './chart.styles.scss'
import config from './chart.config'
function Chart() {
    
    return (
        <div className='Line'>
            <Scatter 
                data= {config.data}
                options={config.options}
            />
        </div>
    )
}

export default Chart
