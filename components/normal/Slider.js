import React, { useContext, useState, useCallback } from 'react'
import MUISlider from '@material-ui/core/Slider'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import { StateContext } from '../../utils/StateContext'
import { debounce } from 'lodash'

export default function RangeSlider({
  name,
  label,
  min,
  max,
  localInputs,
  setLocalInputs,
}) {
  const { setState, vars } = useContext(StateContext)
  const { setInputs, setSearchedAllPages } = setState
  var { page } = vars

  function handleChange(e, value) {
    page = 1
    setSearchedAllPages(false)
    const newInputs = { ...localInputs }
    newInputs[name] = value
    setLocalInputs(newInputs)
  }

  function valuetext(value) {
    return `${value}${label}`
  }

  function handleChangeCommit(newLocalInputs) {
    setInputs({ ...newLocalInputs })
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
                {localInputs[name][0]}
                {showAfterNumber && localInputs[name][0] !== 0 && label}
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
                {localInputs[name][1]}

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
              value={localInputs[name]}
              min={min}
              max={max}
              onChange={handleChange}
              onChangeCommitted={() => handleChangeCommit(localInputs)}
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
