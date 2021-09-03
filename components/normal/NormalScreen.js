import React, { useState } from 'react'
import styles from '../../styles/Normal.module.css'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Slider from './Slider'
import { Typography } from '@material-ui/core'

export default function NormalScreen({ state, setState }) {
  const { inputs } = state

  const style = {
    grid: {
      large: {
        gridTemplateColumns: 'repeat(10,1fr)',
        gridTemplateRows: ' 170px repeat(10,1fr)',
      },
    },
  }

  return (
    <div className={styles.grid_container} style={style.grid.large}>
      <Grid
        wrap="nowrap"
        className={styles.header_container}
        container
        alignItems="center"
        justifyContent="center"
        spacing={2}>
        <Grid item className={styles.logo_container}>
          <Grid container justifyContent="center">
            <Image
              className={styles.logo}
              layout="fixed"
              width={250}
              height={150}
              src={logo}
            />
          </Grid>
        </Grid>
        <Grid item className={styles.input_container}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Slider
                  state={state}
                  setState={setState}
                  name="Reviews"
                  label="K"
                  min={0}
                  max={100}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  state={state}
                  setState={setState}
                  name="Price"
                  label="£"
                  min={0}
                  max={50}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Slider
                  state={state}
                  setState={setState}
                  name="Release"
                  label=""
                  min={1990}
                  max={2021}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  state={state}
                  setState={setState}
                  name="Rating"
                  label="%"
                  min={0}
                  max={100}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          container
          justifyContent="center"
          className={styles.stores_button_container}>
          <Button variant="contained">STORES</Button>
        </Grid>
      </Grid>
      <Grid
        container
        className={styles.main_content_container}
        justifyContent="center"></Grid>
    </div>
  )
}
