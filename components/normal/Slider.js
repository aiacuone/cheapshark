import React, { useContext, useState, useCallback } from 'react'
import MUISlider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { StateContext } from '../../utils/StateContext'

export default function RangeSlider({ name, label, min, max }) {
  const { setState, vars, state } = useContext(StateContext)
  const { setInputs, setSearchedAllPages } = setState
  const { inputs } = state
  var { page } = vars

  const [value, setValue] = useState(inputs[name])

  function handleChange(e, value) {
    page = 1
    setSearchedAllPages(false)
    setValue(value)
  }

  function valuetext(value) {
    return `${value}${label}`
  }

  const showAfterNumber = label === '%' || label === 'K' ? true : false

  const showBeforeNumber = label === '£' ? true : false

  return (
    <Grid
      container
      style={{
        width: '170px',
      }}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">
                {showBeforeNumber && label}
                {value[0]}
                {showAfterNumber && value[0] !== 0 && label}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography align="center">
              {name.charAt(0).toUpperCase() + name.slice(1)}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <Typography align="center">
                {showBeforeNumber && label}
                {value[1]}

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
              value={value}
              min={min}
              max={max}
              onChange={handleChange}
              onChangeCommitted={() => setInputs({ ...inputs, [name]: value })}
              // aria-label={label}
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
