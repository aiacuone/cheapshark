import React, { useState, useContext, useRef, useCallback } from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../styles/Phone.module.css'
import TuneIcon from '@material-ui/icons/Tune'
import StoreIcon from '@material-ui/icons/Store'
import Image from 'next/image'
import IconButton from '@material-ui/core/IconButton'
import Drawer from '@material-ui/core/Drawer'
import { StateContext } from '../../utils/StateContext'
import Table from '../normal/Table'
import logo from '../../public/images/logo.svg'
import seaweed1 from '../../public/images/seaweed1.svg'
import seaweed2 from '../../public/images/seaweed2.svg'
import diver from '../../public/images/diver.svg'
import Typography from '@material-ui/core/Typography'
import ReactResizeDetector from 'react-resize-detector'
import { debounce } from 'lodash'
import Slider from './Slider'

export default function PhoneScreen() {
  const { state, setState, vars } = useContext(StateContext)
  const {
    isPhoneLandscape,
    storesApi,
    storesSelected,
    filteredList,
    inputs,
    searchForGames,
  } = state
  const {
    setStoresSelected,
    setInputs,
    setLargeTableHeight,
    setExpanded: setLargeExpanded,
  } = setState
  const { wording } = vars
  const { noResults: noResultsParagraph } = wording
  const [drawerContent, setDrawerContent] = useState()
  const [expanded, setExpanded] = useState(false)
  const tableItemContainer = useRef()
  const [localStoresSelected, setLocalStoresSelected] = useState({
    ...storesSelected,
  })
  const [localInputs, setLocalInputs] = useState({ ...inputs })

  const groupedStyles = {
    buttonColor: '#545454',
    borderColor: '#cccccc',
  }

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
      gridArea: '1/1/11/11',
      padding: '20px',
      overflow: 'hidden',
      zIndex: 1,
      height: '100%',
      width: '100%',
      position: 'relative',
    },
    nav_bar: {
      gridArea: isPhoneLandscape ? '1/11/11/12' : '11/1/12/11',
    },

    storesHeader: {
      color: 'white',
      textDecoration: 'underline',
    },
    selectAllButton: {
      color: 'white',
      cursor: 'pointer',
    },
    table_item_container: {
      width: 'auto',
      height: '100%',
      zIndex: 1,
    },
    drawer: {
      width: isPhoneLandscape ? '70vw' : '100vw',
      height: isPhoneLandscape ? '100vh' : '70vh',
      display: 'grid',
      gridTemplateColumns: isPhoneLandscape
        ? '80px repeat(9,1fr)'
        : 'repeat(10,1fr)',

      gridTemplateRows: isPhoneLandscape
        ? 'repeat(10,1fr)'
        : 'repeat(9,1fr) 50px',
    },
    stores_container: {
      gridArea: '1/1/10/11',
      padding: '20px', //padding in stores container
      overflow: 'hidden',
    },
    buttons_container: {
      background: 'white',
      gridArea: '10/1/11/11',
    },
    drawer_container: {
      width: '100%',
      height: '100%',
    },
    select_button: {
      cursor: 'pointer',
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      color: groupedStyles.buttonColor,
    },
    ok_button: {
      flex: 1,
      cursor: 'pointer',
      borderRight: `1px solid ${groupedStyles.borderColor}`,
      borderLeft: `1px solid ${groupedStyles.borderColor}`,
      display: 'grid',
      placeItems: 'center',
      height: '100%',
      color: groupedStyles.buttonColor,
    },
    slider_container: {
      gridArea: isPhoneLandscape ? '1/2/11/11' : '1/1/10/11',
    },
    ok_button_sliders_container: {
      gridArea: isPhoneLandscape ? '4/1/7/2' : '10/1/11/11',
    },
    ok_button_sliders: {
      background: 'white',
      display: 'grid',
      placeItems: 'center',
      width: '150px',
      cursor: 'pointer',
    },
    drawer_start: { zIndex: 2 },
    background_container: {
      width: '100%',
      height: '100%',
      position: 'absolute',
    },
    background_container2: {
      flex: 1,
    },
    background_container3: {
      flex: 1,
    },
    background_container4: {
      flex: 1,
    },
    seaweed_item1: {
      flex: 1,
    },
    seaweed_item2: {
      flex: 1,
    },
  }

  const handleResize = useCallback(
    debounce((height) => {
      setLargeTableHeight(height)
    }, 100),
    []
  )

  function handleClick(value) {
    setDrawerContent(value)
    setExpanded(true)
  }

  function handleOK() {
    setStoresSelected(localStoresSelected)
    setExpanded(false)
    setInputs({ ...localInputs })
  }

  function handleStoreClick(store) {
    const newStoresSelected = { ...localStoresSelected }
    newStoresSelected[store.storeName] = !newStoresSelected[store.storeName]
    setLocalStoresSelected(newStoresSelected)
  }

  const Stores = () => {
    function handleSelectAll() {
      const newStoresSelected = { ...localStoresSelected }

      Object.keys(newStoresSelected).forEach((store) => {
        newStoresSelected[store] = true
      })

      setLocalStoresSelected(newStoresSelected)
    }

    function handleDeselectAll() {
      const newStoresSelected = { ...localStoresSelected }

      Object.keys(newStoresSelected).forEach((store) => {
        newStoresSelected[store] = false
      })
      setLocalStoresSelected(newStoresSelected)
    }

    const stores = storesApi.data.map((store, index) => {
      return (
        <Grid
          key={store + 'phone'}
          item
          style={{
            margin: '5px 10px',
            cursor: 'pointer',
            filter: localStoresSelected[store.storeName]
              ? 'opacity(100%)'
              : 'opacity(15%)',
          }}
          onClick={() => handleStoreClick(store)}>
          <Grid
            direction={isPhoneLandscape ? 'row' : 'column'}
            container
            alignItems="center">
            <Grid item>
              <Image
                src={`https://www.cheapshark.com${store.images.logo}`}
                layout="fixed"
                height={40}
                width={40}
              />
            </Grid>
          </Grid>
        </Grid>
      )
    })

    return (
      <>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={style.stores_container}>
          {stores}
        </Grid>
        <Grid
          container
          style={style.buttons_container}
          justifyContent="space-around"
          alignItems="center">
          <Grid item style={style.select_button} onClick={handleDeselectAll}>
            <Typography>Deselect All</Typography>
          </Grid>
          <Grid item style={style.ok_button} onClick={handleOK}>
            <Typography>OK</Typography>
          </Grid>
          <Grid item style={style.select_button} onClick={handleSelectAll}>
            <Typography>Select All</Typography>
          </Grid>
        </Grid>
      </>
    )
  }

  const OrientatedSliders = () => {
    const Landscape = () => {
      return (
        <>
          <Grid
            container
            direction="row"
            style={style.slider_container}
            justifyContent="center"
            alignItems="center">
            <Grid item>
              <Grid item xs={6}>
                <Slider
                  name="reviews"
                  label="K"
                  min={0}
                  max={100}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="price"
                  label="??"
                  min={0}
                  max={50}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="release"
                  label=""
                  min={1990}
                  max={2021}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="rating"
                  label="%"
                  min={0}
                  max={100}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid
            container
            style={style.ok_button_sliders_container}
            justifyContent="center">
            <Grid item style={style.ok_button_sliders} onClick={handleOK}>
              OK
            </Grid>
          </Grid>
        </>
      )
    }

    const Portrait = () => {
      return (
        <>
          <Grid
            container
            direction="column"
            style={style.slider_container}
            justifyContent="center"
            alignItems="center">
            <Grid item>
              <Grid item xs={6}>
                <Slider
                  name="reviews"
                  label="K"
                  min={0}
                  max={100}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="price"
                  label="??"
                  min={0}
                  max={50}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="release"
                  label=""
                  min={1990}
                  max={2021}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
              <Grid item xs={6}>
                <Slider
                  name="rating"
                  label="%"
                  min={0}
                  max={100}
                  localInputs={localInputs}
                  setLocalInputs={setLocalInputs}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            style={style.ok_button_sliders_container}
            justifyContent="center">
            <Grid item style={style.ok_button_sliders} onClick={handleOK}>
              OK
            </Grid>
          </Grid>
        </>
      )
    }

    const orientatedSliders = isPhoneLandscape ? <Landscape /> : <Portrait />
    return orientatedSliders
  }

  return (
    <div style={style.firstContainer} className={styles.first_container}>
      <ReactResizeDetector
        handleHeight
        onResize={(width, height) => handleResize(height)}>
        {({ targetRef }) => (
          <Grid
            ref={targetRef}
            container
            style={style.main_content}
            justifyContent="center"
            alignItems="center">
            {filteredList.length === 0 && !searchForGames && (
              <p
                style={{
                  color: 'white',
                  position: 'absolute',
                }}>
                {noResultsParagraph}
              </p>
            )}

            <Grid
              ref={tableItemContainer}
              item
              style={style.table_item_container}
              xs={12}>
              {filteredList?.length > 0 && <Table />}
            </Grid>
            <Grid
              container
              style={style.background_container}
              direction="column">
              <Grid
                container
                style={style.background_container2}
                justifyContent="flex-end"
                alignItems="center">
                <Grid item>
                  <Image src={diver} layout="fixed" width={200} height={50} />
                </Grid>
              </Grid>
              <Grid
                container
                style={style.background_container3}
                justifyContent="center"
                alignItems="center">
                {/* <Image src={logo} height={100} width={200} layout="fixed" /> */}
              </Grid>
              <Grid container wrap="nowrap" style={style.background_container4}>
                <Grid
                  item
                  container
                  alignItems="flex-end"
                  style={style.seaweed_item1}>
                  <Image
                    src={seaweed1}
                    layout="fixed"
                    width={100}
                    height={90}
                  />
                </Grid>
                <Grid
                  item
                  container
                  justifyContent="flex-end"
                  alignItems="flex-end"
                  style={style.seaweed_item2}>
                  <Image
                    src={seaweed2}
                    layout="fixed"
                    width={100}
                    height={90}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </ReactResizeDetector>
      <div className={styles.background}></div>
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
        style={style.drawer_start}
        anchor={isPhoneLandscape ? 'left' : 'top'}
        open={expanded}
        onClose={() => {
          handleOK()
          setExpanded(false)
        }}>
        <Grid
          container
          style={style.drawer_container}
          className={styles.drawer_container}
          justifyContent="center"
          alignItems="center">
          <Grid
            container
            className={styles.drawer}
            style={style.drawer}
            xs={12}>
            {drawerContent === 'stores' ? <Stores /> : <OrientatedSliders />}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
