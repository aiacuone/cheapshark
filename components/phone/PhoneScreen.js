import React, { useState, useContext } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Phone.module.css'
import TuneIcon from '@material-ui/icons/Tune'
import StoreIcon from '@material-ui/icons/Store'
import drawerBackground from '../../public/images/drawerBackground.svg'
import headerBackground from '../../public/images/headerBackground.svg'
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import Sliders from './Sliders'
import Button from '@material-ui/core/Button'
import Radio from '@material-ui/core/Radio'
import updateFetch from '../../pages/main'
import { StateContext } from '../../utils/StateContext'

export default function PhoneScreen() {
  const { state, setState } = useContext(StateContext)
  const { isPhoneLandscape, storesApi, sortBy, inputs } = state
  const [drawerContent, setDrawerContent] = useState()
  const [expanded, setExpanded] = useState(false)

  const style = {
    firstContainer: {
      gridTemplateColumns: isPhoneLandscape
        ? 'repeat(10,1fr) 70px'
        : 'repeat(10,1fr)',
      gridTemplateRows: isPhoneLandscape
        ? 'repeat(10,1fr)'
        : 'repeat(10,1fr) 60px',
    },
    main_content: {
      gridArea: isPhoneLandscape ? '1/1/11/11' : '1/1/11/11',
    },
    nav_bar: { gridArea: isPhoneLandscape ? '1/11/11/12' : '11/1/12/11' },
    drawer: {
      width: isPhoneLandscape ? '70vw' : '100vw',
      height: isPhoneLandscape ? '100vh' : '70vh',
    },
    stores_container: {
      height: '100%',
    },
    store_container: {
      padding: '0 10px',
    },
    store_container2: {
      background: 'rgba(0,0,0,0.15)',
      borderRadius: '16px',
      padding: '10px 8px 8px 8px',
    },
    radio: {
      color: '#dbdbdb',
      height: '20px',
      width: '35px',
    },
  }

  function handleClick(value) {
    setDrawerContent(value)
    setExpanded(true)
  }

  function handleOK() {
    updateFetch({ sortBy, inputs })
  }

  const OKButton = () => {
    return (
      <Button variant="contained" onClick={handleOK}>
        OK
      </Button>
    )
  }

  const Stores = () => {
    const stores = storesApi.data.map((store, index) => {
      return (
        <Grid item style={style.store_container}>
          <Grid
            style={style.store_container2}
            direction={isPhoneLandscape ? 'row' : 'column'}
            container
            alignItems="center">
            <Grid item>
              <Image
                src={`https://www.cheapshark.com${store.images.logo}`}
                layout="fixed"
                height={30}
                width={30}
              />
            </Grid>
          </Grid>
        </Grid>
      )
    })

    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={style.stores_container}>
        {stores}
        <Grid item xs={4}>
          <Grid container justifyContent="center">
            <OKButton />
          </Grid>
        </Grid>
      </Grid>
    )
  }

  const OrientatedSliders = () => {
    const Landscape = () => {
      return (
        <Grid
          container
          direction="row"
          className={styles.drawer_container}
          justifyContent="center"
          alignItems="center">
          <Grid item style={{ paddingRight: '50px' }}>
            <Grid container justifyContent="center">
              <OKButton />
            </Grid>
          </Grid>
          <Grid item>
            <Sliders />
          </Grid>
        </Grid>
      )
    }

    const Portrait = () => {
      return (
        <Grid
          container
          direction="column"
          className={styles.drawer_container}
          justifyContent="center"
          alignItems="center">
          <Grid item>
            <Sliders />
          </Grid>
          <Grid item>
            <OKButton />
          </Grid>
        </Grid>
      )
    }

    const orientatedSliders = isPhoneLandscape ? <Landscape /> : <Portrait />
    return orientatedSliders
  }

  return (
    <div style={style.firstContainer} className={styles.first_container}>
      <Grid
        container
        style={style.main_content}
        className={styles.main_content}
        justifyContent="center"
        alignItems="center"></Grid>
      <div container className={styles.background}>
        {/* <Image
          src={isPhoneLandscape ? headerBackground : drawerBackground}
          layout="fill"
        /> */}
      </div>
      <Grid
        container
        style={style.nav_bar}
        className={styles.nav_bar}
        justifyContent="center"
        alignItems="center"
        direction={isPhoneLandscape ? 'column' : 'row'}>
        <Grid item>
          <IconButton>
            <StoreIcon fontSize="large" onClick={() => handleClick('stores')} />
          </IconButton>
        </Grid>
        <Grid item>
          <IconButton>
            <TuneIcon fontSize="large" onClick={() => handleClick('sliders')} />
          </IconButton>
        </Grid>
      </Grid>
      <Drawer
        anchor={isPhoneLandscape ? 'left' : 'top'}
        open={expanded}
        onClose={() => setExpanded(false)}>
        <Grid
          container
          className={styles.drawer_container}
          justifyContent="center"
          alignItems="center">
          <Grid item className={styles.drawer} style={style.drawer} xs={12}>
            {/* <div container className={styles.drawer_background}>
              <Image src={drawerBackground} layout="fill" />
            </div> */}
            {drawerContent === 'stores' ? <Stores /> : <OrientatedSliders />}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
