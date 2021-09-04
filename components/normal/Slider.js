import React from 'react'
import MUISlider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'

export default function Slider({ name, label, min, max, setState, state }) {
  const { setInputs } = setState
  const { inputs } = state

  function handleChange(e, value) {
    const newInputs = { ...inputs }
    newInputs[name] = value
    setInputs(newInputs)
  }

  function valuetext(value) {
    return `${value}${label}`
  }

  const showAfterNumber = label === '%' || label === 'K' ? true : false

  const showBeforeNumber = label === '£' ? true : false

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">
                {' '}
                {showBeforeNumber && label}
                {inputs[name][0]}
                {showAfterNumber && inputs[name][0] !== 0 && label}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">{name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">
                {showBeforeNumber && label}
                {inputs[name][1]}
                {showAfterNumber && label}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <MUISlider
              value={inputs[name]}
              min={min}
              max={max}
              onChange={handleChange}
              aria-label={label}
              //   valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              getAriaValueText={valuetext}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}