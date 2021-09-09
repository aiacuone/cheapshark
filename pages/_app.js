import '../styles/globals.css'
import { useState, useEffect } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { StateContext } from '../utils/StateContext'

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
  const [reviews, setReviews] = useState([0, 100])
  const [price, setPrice] = useState([0, 50])
  const [release, setRelease] = useState([1990, 2021])
  const [rating, setRating] = useState([0, 100])
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
    reviews,
    price,
    release,
    rating,
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
    setReviews,
    setPrice,
    setRelease,
    setRating,
  }

  return (
    <StateContext.Provider value={{ state, setState }}>
      <Component {...pageProps}></Component>
    </StateContext.Provider>
  )
}

export default MyApp
