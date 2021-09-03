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

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">{inputs[name][0]}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">{name}</Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">{inputs[name][1]}</Typography>
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
