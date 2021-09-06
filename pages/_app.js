import '../styles/globals.css'
import { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'

function MyApp({ Component, pageProps }) {
  const [inputs, setInputs] = useState({
    reviews: [0, 100],
    price: [0, 50],
    release: [1990, 2021],
    rating: [0, 100],
  })
  const [apiState, setApiState] = useState({
    loading: false,
    data: null,
    error: false,
  })
  const [storesApi, setStoresApi] = useState({
    loading: false,
    data: null,
    error: false,
  })

  const [expanded, setExpanded] = useState(false)
  const [storesMenu, setStoresMenu] = useState(false)
  const [storesSelected, setStoresSelected] = useState({})
  const [stores, setStores] = useState()
  const [filteredList, setFilteredList] = useState()
  const [unFilteredList, setUnFilteredList] = useState([])
  const [sortBy, setSortBy] = useState()
  const [tableHeight, setTableHeight] = useState()
  const isPhonePotraitWidth = useMediaQuery('(max-width:450px)')
  const isPhonePotraitHeight = useMediaQuery('(max-height:860px)')
  const isPhoneLandscapeWidth = useMediaQuery('(max-width:860px)')
  const isPhoneLandscapeHeight = useMediaQuery('(max-height:450px)')
  const isPhoneLandscape =
    isPhoneLandscapeWidth && isPhoneLandscapeHeight ? true : false
  const isPhonePortrait =
    isPhonePotraitWidth && isPhonePotraitHeight ? true : false

  const isPhoneScreen = isPhoneLandscape || isPhonePortrait ? true : false

  const state = {
    inputs,
    expanded,
    apiState,
    storesApi,
    storesSelected,
    storesMenu,
    stores,
    filteredList,
    unFilteredList,
    sortBy,
    tableHeight,
    isPhoneLandscape,
    isPhonePotraitWidth,
    isPhoneScreen,
  }
  const setState = {
    setInputs,
    setExpanded,
    setStoresMenu,
    setStoresSelected,
    setStores,
    setUnFilteredList,
    setSortBy,
    setApiState,
    setStoresApi,
    setFilteredList,
    setTableHeight,
  }

  return (
    <Component {...pageProps} state={state} setState={setState}></Component>
  )
}

export default MyApp
