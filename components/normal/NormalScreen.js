import React, {
  useCallback,
  useEffect,
  useRef,
  useContext,
  useState,
} from 'react'
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
  const { expanded, storesApi, storesSelected, localFilteredList } = state
  const { setExpanded, setLargeTableHeight, setStoresSelected } = setState
  const tableItemContainer = useRef()
  const [localStoresSelected, setLocalStoresSelected] = useState({
    ...storesSelected,
  })

  const groupedStyles = {
    spacingAroundStoresIcons: 4,
    backgroundOfButtons: 'white',
  }

  const style = {
    storesHeader: {
      color: 'white',
    },
    stores_button_container: {
      minWidth: '350px',
    },
    stores_grid: {
      height: '100%',
      width: '100%',
      display: 'grid',
      gridAreaColumns: 'repeat(20,1fr)',
      gridAreaRows: 'repeat(20,1fr)',
    },
    drawer_container: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
    drawer_container2: {
      height: '100%',
      maxWidth: '800px', //Maximum Width of both Button and Logos Container
    },
    select_button: {
      backgroundOfButtons: 'white',
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      background: groupedStyles.backgroundOfButtons,
    },
    ok_button: {
      flex: 1,
      display: 'grid',
      placeItems: 'center',
      cursor: 'pointer',
      margin: '0 3px',
      background: groupedStyles.backgroundOfButtons,
    },
    drawer_stores_buttons_item: {
      width: '100%',
      height: '100px', // Height of Buttons
      marginTop: '120px', // Seperation Netween Stores and Buttons
    },
    stores_container: {
      padding: '20px', //Padding in Stores Container
    },
    stores_button_container: {
      width: '100%',
      height: '100%',
      padding: '20px',
    },
  }

  const onResize = useCallback(() => {
    setLargeTableHeight(height)
  })

  useEffect(() => {
    setLargeTableHeight(tableItemContainer?.current?.clientHeight)
  }, [])

  const { height, ref } = useResizeDetector({ onResize })

  function handleStoreSelect(store) {
    const newStoresSelected = { ...localStoresSelected }
    newStoresSelected[store.storeName] = !newStoresSelected[store.storeName]
    setLocalStoresSelected(newStoresSelected)
  }

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

  function handleOK() {
    setExpanded(false)
    setStoresSelected(localStoresSelected)
  }

  const stores = storesApi?.data?.map((store) => {
    const pictureURL = `https://www.cheapshark.com${store.images.logo}`
    return (
      <Grid
        item
        onClick={() => handleStoreSelect(store)}
        style={{
          filter: localStoresSelected[store.storeName]
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
          {localFilteredList?.length > 0 && <Table />}
        </Grid>
        <Grid item>
          <Drawer
            anchor="right"
            open={expanded}
            onClose={() => {
              setExpanded(false)
              handleOK()
            }}>
            <Grid
              container
              style={style.drawer_container}
              justifyContent="center"
              alignItems="center">
              <Grid item className={styles.drawer}>
                <Grid
                  container
                  style={style.drawer_container2}
                  alignItems="center"
                  justifyContent="center">
                  <Grid item>
                    <Grid
                      container
                      // spacing={3}
                    >
                      <Grid item>
                        <Grid
                          container
                          justifyContent="center"
                          style={style.stores_container}
                          spacing={groupedStyles.spacingAroundStoresIcons}>
                          {stores}
                        </Grid>
                      </Grid>
                      <Grid item style={style.drawer_stores_buttons_item}>
                        <Grid
                          container
                          // spacing={3}
                          style={style.stores_button_container}>
                          <Grid
                            item
                            className={styles.store_button}
                            style={style.select_button}
                            onClick={handleDeselectAll}>
                            Deselect All
                          </Grid>
                          <Grid
                            item
                            className={styles.store_button}
                            style={style.ok_button}
                            onClick={handleOK}>
                            OK
                          </Grid>
                          <Grid
                            item
                            className={styles.store_button}
                            style={style.select_button}
                            onClick={handleSelectAll}>
                            Select All
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* <Grid
                    container
                    spacing={3}
                    // className={styles.drawer}
                    style={style.stores_container}
                    justifyContent="center"
                    alignItems="center">
                    <Grid container spacing={3} justifyContent="center">
                      {stores}
                    </Grid>
                  </Grid>
                  <Grid
                    container
                    style={style.stores_button_container}
                    alignSelf="stretch">
                    <Grid
                      item
                      className={styles.store_button}
                      style={style.select_button}
                      onClick={handleDeselectAll}>
                      Deselect All
                    </Grid>
                    <Grid
                      item
                      className={styles.store_button}
                      style={style.ok_button}
                      onClick={handleOK}>
                      OK
                    </Grid>
                    <Grid
                      item
                      className={styles.store_button}
                      style={style.select_button}
                      onClick={handleSelectAll}>
                      Select All
                    </Grid>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Drawer>
        </Grid>
      </Grid>
    </div>
  )
}
