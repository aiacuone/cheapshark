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
  const { price, rating, reviews, release } = inputs
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
  const [storesSelected, setStoresSelected] = useState({
    Steam: true,
    GamersGate: true,
    GreenManGaming: true,
    Amazon: true,
    GameStop: true,
    Direct2Drive: true,
    GOG: true,
    Origin: true,
    'Get Games': true,
    'Shiny Loot': true,
    'Humble Store': true,
    Desura: true,
    Uplay: true,
    IndieGameStand: true,
    Fanatical: true,
    Gamesrocket: true,
    'Games Republic': true,
    SilaGames: true,
    Playfield: true,
    ImperialGames: true,
    WinGameStore: true,
    FunStockDigital: true,
    GameBillet: true,
    Voidu: true,
    'Epic Games Store': true,
    'Razer Game Store': true,
    Gamesplanet: true,
    Gamesload: true,
    '2Game': true,
    IndieGala: true,
    'Blizzard Shop': true,
    AllYouPlay: true,
  })
  const [stores, setStores] = useState()
  const [sortBy, setSortBy] = useState()
  const [largeTableHeight, setLargeTableHeight] = useState()
  const [windowHeight, setWindowHeight] = useState()

  const isPhonePotraitWidth = useMediaQuery('(max-width:450px)')
  const isPhonePotraitHeight = useMediaQuery('(max-height:860px)')
  const isPhoneLandscapeWidth = useMediaQuery('(max-width:860px)')
  const isPhoneLandscapeHeight = useMediaQuery('(max-height:450px)')
  const isPhoneLandscape =
    isPhoneLandscapeWidth && isPhoneLandscapeHeight ? true : false
  const isPhonePortrait =
    isPhonePotraitWidth && isPhonePotraitHeight ? true : false

  const isPhoneScreen = isPhoneLandscape || isPhonePortrait ? true : false

  const localFilteredList = apiState?.data?.filter((item) => {
    const { steamRatingCount, steamRatingPercent, releaseDate } = item
    const filter1 =
      reviews[0] == 0 ? item : steamRatingCount >= reviews[0] * 1000
    const filter2 =
      reviews[1] == 100 ? item : steamRatingCount <= reviews[1] * 1000
    const filter3 =
      rating[0] == 100
        ? item
        : steamRatingPercent == '0' || steamRatingPercent <= rating[1]
    const filter4 =
      release[0] == 1990
        ? item
        : releaseDate * 1000 > new Date(release[0], 0, 1).getTime()
    const filter5 =
      release[1] == 2021
        ? item
        : releaseDate * 1000 < new Date(release[1], 11, 31).getTime()

    return filter1 && filter2 && filter3 && filter4 && filter5
  })

  const localUnfilteredList = apiState?.data?.filter((item) => {
    if (localFilteredList.indexOf(item) == -1) {
      return item
    }
  })

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const state = {
    inputs,
    expanded,
    apiState,
    storesApi,
    storesSelected,
    storesMenu,
    stores,
    localFilteredList,
    localUnfilteredList,
    sortBy,
    largeTableHeight,
    isPhoneLandscape,
    isPhonePotraitWidth,
    isPhoneScreen,
    windowHeight,
  }
  const setState = {
    setInputs,
    setExpanded,
    setStoresMenu,
    setStoresSelected,
    setStores,
    setSortBy,
    setApiState,
    setStoresApi,
    setLargeTableHeight,
  }

  useEffect(() => {
    setApiState({ loading: true })

    const stores = () => {
      const arr = []
      Object.keys(storesSelected).forEach((store, index) => {
        if (!storesSelected[store]) return
        arr.push(index)
      })
      return arr.join()
    }

    const address =
      'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
      price[0] +
      '&upperPrice=' +
      price[1] +
      '&steamRating=' +
      rating[0] +
      '&pageNumber=' +
      1 +
      '&storeID=' +
      stores()

    fetch(address)
      .then((res) => res.json())
      .then((data) => {
        setApiState({ loading: false, data: data })
      })
      .catch((error) => {
        console.log(error)
        setApiState({ loading: false, data: null, error: true })
      })
  }, [price, rating, storesSelected])

  useEffect(() => {
    setStoresApi({ loading: true })

    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((res) => res.json())
      .then((data) => {
        setStoresApi({ loading: false, data: data })
      })
      .catch((error) => {
        console.log(error)
        setStoresApi({ loading: false, data: null, error: true })
      })
  }, [])

  return (
    <StateContext.Provider value={{ state, setState }}>
      <Component {...pageProps}></Component>
    </StateContext.Provider>
  )
}

export default MyApp
