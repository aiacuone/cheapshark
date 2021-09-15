import React, { useState, useContext } from 'react'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { StateContext } from '../../utils/StateContext'

export default function Sliders() {
  const { state, setState } = useContext(StateContext)
  const [sliderValues, setSliderValues] = useState(state.inputs)

  const { inputs } = state
  const { setInputs } = setState
  let { searchedAllPages } = state

  const style = {
    slider: {},
    input_container: {
      minWidth: '200px',
    },
    paper: {
      minWidth: '50px',
    },
    typography: {
      color: 'white',
    },
  }

  const sliderData = [
    {
      name: 'reviews',
      label: 'K',
      min: 0,
      max: 100,
    },
    {
      name: 'price',
      label: '£',
      min: 0,
      max: 50,
    },
    {
      name: 'release',
      label: '',
      min: 1990,
      max: 2021,
    },
    {
      name: 'rating',
      label: '%',
      min: 0,
      max: 100,
    },
  ]

  function valuetext(value) {
    return `${value}`
  }

  const sliders = sliderData.map((slider, index) => {
    const { name, label, min, max } = slider

    const value = sliderValues[name]

    const showAfterNumber = label === '%' || label === 'K' ? true : false

    const showBeforeNumber = label === '£' ? true : false

    return (
      <Grid item xs={8} style={style.input_container} key={name + index}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <Paper style={style.paper}>
                  <Grid container justifyContent="center">
                    <Typography>
                      {showBeforeNumber && label}
                      {value[0]}
                      {showAfterNumber && label}
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Typography align="center" style={style.typography}>
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Paper style={style.paper}>
                  <Grid container justifyContent="center">
                    <Typography>
                      {showBeforeNumber && label}
                      {value[1]}
                      {showAfterNumber && label}
                    </Typography>
                  </Grid>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={1} />
              <Grid item xs={10}>
                <Slider
                  value={value}
                  min={min}
                  max={max}
                  onChange={(e, value) => {
                    // searchedAllPages = false
                    setSliderValues({...sliderValues, [name]: value})
                  }}
                  onChangeCommitted={(e, value) => setInputs({...inputs, [name]: value})}
                  aria-labelledby="range-slider"
                  getAriaValueText={valuetext}
                />
              </Grid>
              <Grid item xs={1} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  })

  return (
    <Grid container direction="column" alignItems="center">
      {sliders}
    </Grid>
  )
}
