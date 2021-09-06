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

  // const Sliders = () => {
  //   const sliderSize = 12

  //   return (
  //     <Grid
  //       className={styles.input_container}
  //       container
  //       spacing={3}
  //       direction="column"
  //       alignItems="center">
  //       <Grid item xs={sliderSize}>
  //         <Slider
  //           state={state}
  //           setState={setState}
  //           name="reviews"
  //           label="K"
  //           min={0}
  //           max={100}
  //         />
  //       </Grid>
  //       <Grid item xs={sliderSize}>
  //         <Slider
  //           state={state}
  //           setState={setState}
  //           name="price"
  //           label="£"
  //           min={0}
  //           max={50}
  //         />
  //       </Grid>

  //       <Grid item xs={sliderSize}>
  //         <Slider
  //           state={state}
  //           setState={setState}
  //           name="release"
  //           label=""
  //           min={1990}
  //           max={2021}
  //         />
  //       </Grid>
  //       <Grid item xs={sliderSize}>
  //         <Slider
  //           state={state}
  //           setState={setState}
  //           name="rating"
  //           label="%"
  //           min={0}
  //           max={100}
  //         />
  //       </Grid>
  //     </Grid>
  //   )
  // }

  const Stores = () => {
    return <p>stores</p>
  }

  return (
    <div style={style.firstContainer} className={styles.first_container}>
      <Grid
        container
        style={style.main_content}
        className={styles.main_content}
        justifyContent="center"
        alignItems="center"></Grid>
      {/* <div container className={styles.background}>
        <Image
          src={isPhoneLandscape ? headerBackground : drawerBackground}
          layout="fill"
        />
      </div> */}
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
          <Grid item className={styles.drawer} style={style.drawer}>
            {/* <div container className={styles.drawer_background}>
              <Image src={drawerBackground} layout="fill" />
            </div> */}
            <Grid
              container
              className={styles.drawer_container}
              justifyContent="center"
              alignItems="center">
              {/* <Grid item xs={12}>
                {drawerContent === 'stores' ? <Stores /> : <Sliders />}
              </Grid> */}
              <Sliders state={state} setState={setState} />
            </Grid>
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
