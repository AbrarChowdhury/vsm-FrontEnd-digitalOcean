import React, { useState } from 'react'
import Card from './card/card.component'
import Grid from '@material-ui/core/Grid';
import data from '../../data'
import './cards.styles.scss'
function Cards() {
    const [text, setText] = useState('')
    const onChange = (q) => {
        setText(q.toLowerCase())
        console.log(text)
      }
        return (
        <div className="Cards">
            <h1>VSM Dashboard</h1>
            <section className='search'>
            <form>
              <input
                type='text'
                className='form-control'
                placeholder='Search patient'
                value={text}
                onChange={(e) => onChange(e.target.value)}
                autoFocus
              />
            </form>
            </section>
            <br/>
            <Grid container>
                {data.filter( data => data.name.includes(text)).map(data =>
                <Grid item xs={4}>
                    <Card bed={ data.bed } name={ data.name } age={data.age} sex={data.sex}/>
                </Grid> 
                )}
            </Grid>


        </div>
    )
}

export default Cards
