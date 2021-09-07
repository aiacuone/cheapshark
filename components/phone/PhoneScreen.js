import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Phone.module.css'
import TuneIcon from '@material-ui/icons/Tune'
import StoreIcon from '@material-ui/icons/Store'
import drawerBackground from '../../public/images/drawerBackground.svg'
import headerBackground from '../../public/images/headerBackground.svg'
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
// import Slider from './Slider'
import Sliders from './Sliders'
import Button from '@material-ui/core/Button'

export default function PhoneScreen({ state, setState }) {
  const { isPhoneLandscape, isPhonePortrait } = state

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
  }

  function handleClick(value) {
    setDrawerContent(value)
    setExpanded(true)
  }

  const Stores = () => {
    return <p>stores</p>
  }

  const OrientatedSliders = () => {
    const orientatedSliders = isPhoneLandscape ? (
      <Grid
        container
        direction="row"
        className={styles.drawer_container}
        justifyContent="center"
        alignItems="center">
        <Grid item style={{ paddingRight: '50px' }}>
          <Grid container justifyContent="center">
            <Button variant="contained">OK</Button>
          </Grid>
        </Grid>

        <Grid item>
          <Sliders state={state} setState={setState} />
        </Grid>
      </Grid>
    ) : (
      <Grid
        container
        direction="column"
        className={styles.drawer_container}
        justifyContent="center"
        alignItems="center">
        <Grid item>
          <Sliders state={state} setState={setState} />
        </Grid>
        <Grid item>
          <Button variant="contained">OK</Button>
        </Grid>
      </Grid>
    )
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
        <Image
          src={isPhoneLandscape ? headerBackground : drawerBackground}
          layout="fill"
        />
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
            <div container className={styles.drawer_background}>
              <Image src={drawerBackground} layout="fill" />
            </div>
            {drawerContent === 'stores' ? <Stores /> : <OrientatedSliders />}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
