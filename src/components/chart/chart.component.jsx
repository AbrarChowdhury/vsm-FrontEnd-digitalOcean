import React,{ useState, useEffect } from 'react'
import api from '../../context/api.context'
import { Scatter } from 'react-chartjs-2'
import './chart.styles.scss'
import config from './chart.config'
const wss = new WebSocket(`ws://${api}`);
function Chart({bed}) {
const [ecg, setEcg] = useState([])

    useEffect(() => {
        wss.addEventListener('message', (message) => {
            if(JSON.parse(message.data).bedNumber==bed){
                console.log("hoise: ", JSON.parse(message.data))
                setEcg(JSON.parse(message.data).ecg)
                console.log("chart ecg", ecg)
            } 
        });
    },[]);

    function getData(){
        let data=[]
        for(let i=0; i<10; i++){
            setTimeout(()=>{
                data.push({ x:i, y: ecg[i] })
                // if(data.length>=ecg.length){ data.pop() }
            }, 100);
        }
        return data
    }
    let data = config.data
    data.datasets[0].data=getData()
    
    return (
        <div className='Line'>
            <Scatter 
                height={50}
                data= {data}
                options={config.options}
            />
            
        </div>
    )
}

export default Chart
