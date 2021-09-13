import React, {
  useState,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react'
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
import Table from '../normal/Table'
import { useResizeDetector } from 'react-resize-detector'

export default function PhoneScreen() {
  const { state, setState } = useContext(StateContext)
  const {
    isPhoneLandscape,
    storesApi,
    sortBy,
    inputs,
    storesSelected,
    localFilteredList,
    windowHeight,
  } = state
  const { setStoresSelected, setInputs, setLargeTableHeight } = setState
  const [drawerContent, setDrawerContent] = useState()
  const [expanded, setExpanded] = useState(false)
  const [localInputs, setLocalInputs] = useState({ ...inputs })
  const tableItemContainer = useRef()

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
      gridArea: isPhoneLandscape ? '1/1/11/11' : '1/1/11/11',
      padding: '20px',
      overflow: 'hidden',
      zIndex: 1,
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
      // padding: '10px',
    },
    ok_button_sliders: {
      background: 'white',
      display: 'grid',
      placeItems: 'center',
      width: '150px',
      cursor: 'pointer',
    },
    drawer_start: { zIndex: 2 },
  }
  // console.log(windowHeight)
  const onResize = useCallback(() => {
    setLargeTableHeight(height)
  })

  useEffect(() => {
    setLargeTableHeight(tableItemContainer?.current?.clientHeight)
  })

  const { height, ref } = useResizeDetector({ onResize })

  function handleClick(value) {
    setDrawerContent(value)
    setExpanded(true)
  }

  function handleOK() {
    setInputs(localInputs)
    setExpanded(false)
  }

  function handleStoreClick(store) {
    const newStoresSelected = { ...storesSelected }
    newStoresSelected[store.storeName] = !newStoresSelected[store.storeName]
    setStoresSelected(newStoresSelected)
  }

  const Stores = () => {
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

    const stores = storesApi.data.map((store, index) => {
      return (
        <Grid
          item
          style={{
            margin: '5px 10px',
            cursor: 'pointer',
            filter: storesSelected[store.storeName]
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
            Deselect All
          </Grid>
          <Grid item style={style.ok_button} onClick={handleOK}>
            OK
          </Grid>
          <Grid item style={style.select_button} onClick={handleSelectAll}>
            Select All
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
              <Sliders
                localInputs={localInputs}
                setLocalInputs={setLocalInputs}
              />
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
            // className={styles.drawer_container}
            justifyContent="center"
            alignItems="center">
            <Grid item>
              <Sliders
                localInputs={localInputs}
                setLocalInputs={setLocalInputs}
              />
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
      <Grid
        ref={ref}
        container
        style={style.main_content}
        className={styles.main_content}
        justifyContent="center"
        alignItems="center">
        <Grid
          ref={tableItemContainer}
          item
          style={style.table_item_container}
          xs={12}>
          {localFilteredList?.length > 0 && <Table />}
        </Grid>
      </Grid>
      <div className={styles.background}>
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
        style={style.drawer_start}
        anchor={isPhoneLandscape ? 'left' : 'top'}
        open={expanded}
        onClose={() => setExpanded(false)}>
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
            {/* <div className={styles.drawer_background}>
              <Image src={drawerBackground} layout="fill" />
            </div> */}
            {drawerContent === 'stores' ? <Stores /> : <OrientatedSliders />}
          </Grid>
        </Grid>
      </Drawer>
    </div>
  )
}
