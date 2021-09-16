import '../styles/globals.css'
import { useState, useEffect, useCallback } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { StateContext } from '../utils/StateContext'
import { debounce } from 'lodash'
import { createTheme, ThemeProvider } from '@material-ui/core/styles'

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
  const [initialApiCallComplete, setInitialApiCallComplete] = useState(false)
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
  const [filteredList, setFilteredList] = useState([])
  // const [page, setPage] = useState(1)
  const [stores, setStores] = useState()
  const [sortBy, setSortBy] = useState()
  const [searchedAllPages, setSearchedAllPages] = useState(false)
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
  useEffect(() => {
    // console.log('state change')
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

  useEffect(() => {
    if (!apiState.data) {
      return
    }
    function handleFilter() {
      setFilteredList(getFilteredList(apiState?.data))
    }
    const debouncedFilter = debounce(handleFilter, [500])

    debouncedFilter()
  }, [release, reviews, rating])

  const storesString = () => {
    const arr = []
    Object.keys(storesSelected)?.forEach((store, index) => {
      if (!storesSelected[store]) return
      arr.push(index)
    })
    return arr.join()
  }

  var page = 1

  const address =
    'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
    price[0] +
    '&upperPrice=' +
    price[1] +
    '&steamRating=' +
    rating[0] +
    '&pageNumber=' +
    page +
    '&storeID=' +
    storesString()

  function getFilteredList(data) {
    return data.filter((item) => {
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
  }

  async function getMoreGames(data) {
    var fetchedGames = []
    // console.log('get more games')
    setApiState({ ...apiState, loading: true })
    // console.log(apiState)
    async function fetchMoreGames() {
      page = page + 1
      await fetch(address)
        .then((res) => res.json())
        .then((newData) => {
          if (!fetchedGames) {
            return (fetchedGames = [...newData])
          }
          fetchedGames = [...fetchedGames, ...newData]
        })
        .catch((error) => {
          console.log(error)
          setApiState({ ...apiState, loading: false, error: true })
        })
    }
    await fetchMoreGames()
    const filtered = getFilteredList(fetchedGames)
    if (filteredList.length + filtered.length <= 10) {
      fetchMoreGames()
    }
    setApiState({
      ...apiState,
      loading: false,
      data: [...data, ...fetchedGames],
    })
    setFilteredList([...filteredList, ...filtered])
  }

  const debouncedGetMoreGames = useCallback(
    debounce(({ data }) => getMoreGames(data), 500),
    []
  )

  function createStoresSelections(data) {
    const obj = {}
    data.forEach((store) => {
      obj[store.storeName] = true
    })
    return setStoresSelected(obj)
  }

  const debouncedGetGames = debounce(
    // GAMES API
    function () {
      // console.log('get games')
      setApiState({ ...apiState, loading: true })
      fetch(address)
        .then((res) => res.json())
        .then((data) => {
          setFilteredList(getFilteredList(data))
          setApiState({ loading: false, data: data })
        })
        .catch((error) => {
          console.log(error)
          setApiState({ ...apiState, loading: false, error: true })
        })
      setInitialApiCallComplete(true)
    },
    [500]
  )

  useEffect(() => {
    debouncedGetGames()
  }, [price, rating, storesSelected])

  useEffect(() => {
    //STORES API
    setStoresApi({ loading: true })
    // console.log('stores api')
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((res) => res.json())
      .then((data) => {
        createStoresSelections(data)
        setStoresApi({ loading: false, data: data })
      })
      .catch((error) => {
        console.log(error)
        setStoresApi({ loading: false, data: null, error: true })
      })
  }, [])

  const notEnoughGames = filteredList?.length < 10 && page < 10 ? true : false

  apiState.data &&
    initialApiCallComplete &&
    notEnoughGames &&
    !searchedAllPages &&
    !apiState.loading &&
    debouncedGetMoreGames({ data: apiState?.data })

  const theme = createTheme({
    typography: {
      fontFamily: 'Urbanist',
      fontSize: 16,
    },
    palette: {
      primary: {
        main: '#dddddd',
        dark: '#c9c9c9',
      },
    },
    shape: {
      borderRadius: 3,
    },
    overrides: {
      MuiSlider: {
        thumb: {
          width: '15px',
          height: '15px',
          // border: '1px black solid',
        },
      },
    },
    props: {
      MuiButton: { disableRipple: true },
    },
  })

  const state = {
    inputs,
    expanded,
    apiState,
    storesApi,
    storesSelected,
    storesMenu,
    stores,
    sortBy,
    largeTableHeight,
    isPhoneLandscape,
    isPhonePotraitWidth,
    isPhoneScreen,
    windowHeight,
    searchedAllPages,
    filteredList,
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
    setSearchedAllPages,
  }

  // console.log(filteredList, 'filteredList')
  // console.log(inputs, 'inputs')

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ state, setState }}>
        <Component {...pageProps}></Component>
      </StateContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
