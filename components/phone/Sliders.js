import React, { useState, useContext } from 'react'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { StateContext } from '../../utils/StateContext'

export default function Sliders() {
  const { state, setState } = useContext(StateContext)
  const [localInputs, setLocalInputs] = useState({
    reviews: [0, 100],
    price: [0, 50],
    release: [1990, 2021],
    rating: [0, 100],
  })
  const { setInputs } = setState
  const { reviews, price, release, rating } = localInputs

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
      value: reviews,
      // setValue: setInputs.reviews,
    },
    {
      name: 'price',
      label: '£',
      min: 0,
      max: 50,
      value: price,
      // setValue: setInputs['price'],
    },
    {
      name: 'release',
      label: '',
      min: 1990,
      max: 2021,
      value: release,
      // setValue: setInputs['release'],
    },
    {
      name: 'rating',
      label: '%',
      min: 0,
      max: 100,
      value: rating,
      // setValue: setInputs['rating'],
    },
  ]

  function valuetext(value) {
    return `${value}`
  }

  const sliders = sliderData.map((slider) => {
    const { name, label, min, max, value } = slider

    function handleChange(e, newValue) {
      const newInputs = { ...localInputs }
      newInputs[name] = newValue
      setLocalInputs(newInputs)
      // setInputs(newInputs)
    }

    const showAfterNumber = label === '%' || label === 'K' ? true : false

    const showBeforeNumber = label === '£' ? true : false

    return (
      <Grid item xs={8} style={style.input_container}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <Paper style={style.paper}>
                  <Grid container justifyContent="center">
                    {showBeforeNumber && label}
                    {value[0]}
                    {showAfterNumber && label}
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
                    {showBeforeNumber && label}
                    {value[1]}
                    {showAfterNumber && label}
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
                  onChange={handleChange}
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
