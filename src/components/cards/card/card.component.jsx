import React,{ useState, useEffect }  from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Chart from '../../chart/chart.component'
import './card.styles.scss'

function Card(props) {
    const [data, setData] = useState(props.data)

    let history = useHistory()
    
    const redirect = () => {
        history.push(`/${data.bed}`)
    }

    useEffect(() => {
       console.log(data);
       
    }, [])
    
    
    const Header = ()=>(
        <Grid container spacing={2}>
            <Grid item xs={ 2 }>
                <p className="white bold">Bed: {data.bed}</p>
            </Grid>
            <Grid item xs={ 5 }>
                <p className="white bold">Name: {data.name}</p> 
            </Grid>
            <Grid item xs={ 2 }>
                <p className="white bold">Age: {data.age}</p>
            </Grid>
            <Grid item xs={ 3 }>
                <p className="white bold">Sex: {data.sex}</p>    
            </Grid>
        </Grid>
    )
    return (
        
        <div className="Card" onClick={redirect}>
           <Header/> 
            <Grid container spacing={2}>
                <Grid item xs={ 8 }>
                    <Chart/>
                </Grid>
                <Grid item xs={ 4 }>
                    <h2 className="green" >Hr-120</h2>
                    <h2 className="white" >Temp-90</h2>
                    <h2 className="blue" >Spo2-500</h2>
                </Grid>
            </Grid>
        </div>
    )
}

export default Card
