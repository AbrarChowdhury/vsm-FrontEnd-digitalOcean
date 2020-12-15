import React from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import './card.styles.scss'
function Card({bed,name,age,sex}) {
    let history = useHistory()
    const redirect = () => {
        history.push(`/${bed}`)
    }
    const Header = ()=>(
        <Grid container spacing={2}>
            <Grid item xs={ 2 }>
                Bed: {bed}
            </Grid>
            <Grid item xs={ 5 }>
                Name: {name}
            </Grid>
            <Grid item xs={ 2 }>
                Age: {age}
            </Grid>
            <Grid item xs={ 3 }>
                Sex: {sex}
            </Grid>
        </Grid>
    )
    return (
        <div className="Card" onClick={redirect}>
           <Header/> 
            <Grid container spacing={2}>
                <Grid item xs={ 8 }>
                </Grid>
                <Grid item xs={ 4 }>
                <h2>Temp-90</h2>
                <h2>Hr-120</h2>
                <h2>SpG-500</h2>
                </Grid>
            </Grid>
        </div>
    )
}

export default Card
