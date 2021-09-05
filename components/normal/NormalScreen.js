import React, { useState } from 'react'
import styles from '../../styles/Normal.module.css'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import Paper from '@material-ui/core/Paper'
import Button from '@material-ui/core/Button'
import Slider from './Slider'
import headerBackground from '../../public/images/headerBackground.svg'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'

import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
})

export default function NormalScreen({ state, setState }) {
  const { inputs, expanded } = state
  const { setExpanded } = setState

  const style = {
    grid: {
      large: {
        gridTemplateColumns: 'repeat(10,1fr)',
        gridTemplateRows: ' 170px repeat(10,1fr)',
      },
    },
  }

  const classes = useStyles()

  return (
    <div className={styles.grid_container}>
      <Grid
        wrap="nowrap"
        className={styles.header_container}
        container
        alignItems="center"
        justifyContent="center">
        <Grid item className={styles.stores_button_container}>
          <Button variant="contained" onClick={() => setExpanded(true)}>
            STORES
          </Button>
        </Grid>
        <Grid item className={styles.background_container}>
          <Image width={1920} layout="fixed" src={headerBackground} />
        </Grid>
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
      </Grid>
      <Grid
        container
        className={styles.main_content_container}
        justifyContent="center">
        <Grid item>
          <Drawer
            anchor="right"
            open={expanded}
            onClose={() => setExpanded(false)}>
            <Grid
              container
              className={styles.drawer_container}
              justifyContent="center"
              alignItems="center">
              <Grid item className={styles.drawer}>
                <Grid
                  container
                  className={styles.drawer_container}
                  justifyContent="center"
                  alignItems="center">
                  <Grid item> Drawer Content</Grid>
                </Grid>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
      </Grid>
    </div>
  )
}
