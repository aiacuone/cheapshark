import React, { useCallback, useEffect, useRef, useContext } from 'react'
import styles from '../../styles/Normal.module.css'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import logo from '../../public/images/logo.svg'
import Button from '@material-ui/core/Button'
import Slider from './Slider'
import headerBackground from '../../public/images/headerBackground.svg'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import drawerBackground from '../../public/images/drawerBackground.svg'
import Table from './Table'
import { useResizeDetector } from 'react-resize-detector'
import Radio from '@material-ui/core/Radio'
import { TrendingUp } from '@material-ui/icons'
import { StateContext } from '../../utils/StateContext'

import Typography from '@material-ui/core/Typography'

export default function NormalScreen() {
  const { state, setState } = useContext(StateContext)
  const { expanded, storesApi, storesSelected } = state
  const { setExpanded, setTableHeight, setStoresSelected } = setState
  const tableItemContainer = useRef()

  const style = {
    storesHeader: {
      color: 'white',
    },
    selectAllButton: {
      color: 'white',
      zIndex: 1,
      cursor: 'pointer',
    },
  }

  const onResize = useCallback(() => {
    setTableHeight(height)
  })

  useEffect(() => {
    setTableHeight(tableItemContainer?.current?.clientHeight)
  }, [])

  const { height, ref } = useResizeDetector({ onResize })

  function handleStoreSelect(store) {
    const newStoresSelected = { ...storesSelected }
    newStoresSelected[store.storeName] = !newStoresSelected[store.storeName]
    setStoresSelected(newStoresSelected)
  }

  function handleSelectAll() {
    const newStoresSelected = { ...storesSelected }
    Object.keys(newStoresSelected).forEach((store) => {
      newStoresSelected[store] = true
    })
    setStoresSelected(newStoresSelected)
  }

  function handleDeselectAll() {
    const newStoresSelected = { ...storesSelected }
    Object.keys(newStoresSelected).forEach((store) => {
      newStoresSelected[store] = false
    })
    setStoresSelected(newStoresSelected)
  }

  const logos = storesApi?.data?.map((store) => {
    const pictureURL = `https://www.cheapshark.com${store.images.logo}`
    return (
      <Grid
        item
        onClick={() => handleStoreSelect(store)}
        style={{
          filter: storesSelected[store.storeName]
            ? 'opacity(100%)'
            : 'opacity(15%)',
          cursor: 'pointer',
        }}>
        <Grid container direcion="column">
          <Image layout="fixed" src={pictureURL} width={60} height={60} />
        </Grid>
      </Grid>
    )
  })

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
                <Slider name="reviews" label="K" min={0} max={100} />
              </Grid>
              <Grid item xs={6}>
                <Slider name="price" label="£" min={0} max={50} />
              </Grid>
            </Grid>
          </Grid>
          <Grid container>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Slider name="release" label="" min={1990} max={2021} />
              </Grid>
              <Grid item xs={6}>
                <Slider name="rating" label="%" min={0} max={100} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        ref={ref}
        className={styles.main_content_container}
        justifyContent="center">
        <Grid
          item
          ref={tableItemContainer}
          className={styles.table_item_container}
          xs={12}>
          {/* <Table  /> */}
        </Grid>
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
                <div className={styles.background}>
                  <Image src={drawerBackground} layout="fill" />
                </div>
                <Grid
                  container
                  className={styles.drawer_container}
                  justifyContent="center"
                  alignItems="center">
                  <Grid item>
                    <Grid
                      className={styles.logos_container}
                      container
                      justifyContent="center"
                      alignItems="center"
                      spacing={10}>
                      <Grid item></Grid>
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        spacing={3}>
                        {' '}
                        {logos}
                      </Grid>
                      <Grid item style={{ width: '100%' }}>
                        <Grid
                          container
                          justifyContent="space-around"
                          alignItems="center">
                          <Typography
                            onClick={handleDeselectAll}
                            style={style.selectAllButton}>
                            Deselect All
                          </Typography>
                          <Button variant="contained">OK</Button>
                          <Typography
                            onClick={handleSelectAll}
                            style={style.selectAllButton}>
                            Select All
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
      </Grid>
    </div>
  )
}
