import React from 'react'
import Slider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

export default function Sliders({ state, setState }) {
  const { inputs } = state
  const { setInputs } = setState

  const style = {
    slider: {
      //   width: '300px',
    },
    input_container: {
      width: '50%',
      minWidth: '200px',
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
    return value
  }

  const sliders = sliderData.map((slider) => {
    const { name, label, min, max } = slider

    function handleChange(e, value) {
      const newInputs = { ...inputs }
      newInputs[name] = value
      setInputs(newInputs)
    }

    const showAfterNumber = label === '%' || label === 'K' ? true : false

    const showBeforeNumber = label === '£' ? true : false

    return (
      <Grid item xs={8} style={style.input_container}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={2}>
                <Paper>
                  <Grid container justifyContent="center">
                    {showBeforeNumber && label}
                    {inputs[name][0]}
                    {showAfterNumber && label}
                  </Grid>
                </Paper>
              </Grid>
              <Grid item xs={8}>
                <Typography align="center">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Paper>
                  <Grid container justifyContent="center">
                    {showBeforeNumber && label}
                    {inputs[name][1]}
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
                  value={inputs[name]}
                  //   name={name}
                  //   label={label}
                  min={min}
                  max={max}
                  onChange={handleChange}
                  //   valueLabelDisplay="auto"
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
    <Grid container direction="column" spacing={1} alignItems="center">
      {sliders}
    </Grid>
  )
}
