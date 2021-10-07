import '../styles/globals.css'
import { useState, useEffect, useCallback } from 'react'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { StateContext } from '../utils/StateContext'
import { debounce, find } from 'lodash'
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
    data: [],
    error: false,
    filteredList: [],
  })
  const { filteredList, data: unFilteredList } = apiState
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
    DLGamer: true,
  })

  const [initialSetupComplete, setInitialSetupComplete] = useState(false)
  const [stores, setStores] = useState()
  const [sortBy, setSortBy] = useState()
  const [searchForGames, setSearchForGames] = useState(true)
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
  var page = 1
  const maxPageCount = 3
  const minimumGamesCount = 10

  useEffect(() => {
    initialSetup()

    function handleResize() {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    handleLocalFilter()
  }, [release, reviews, rating[1]])

  //LOCAL FILTER
  function handleLocalFilter() {
    if (!apiState.data) {
      return
    }
    setApiState({
      ...apiState,
      filteredList: getFilteredList({
        data: [...apiState?.data, ...filteredList],
        passedInputs: inputs,
      }),
    })
  }

  useEffect(() => {
    handleApiFilter()
  }, [price, rating[0], storesSelected])

  //API FILTER
  async function handleApiFilter() {
    setApiState({ ...apiState, loading: true })
    const address = getAddress({ page: 1, storesSelected2: storesSelected })
    try {
      const res = await fetch(address)
      const data = await res.json()
      setApiState({
        ...apiState,
        loading: false,
        data: data,
        filteredList: getFilteredList({
          passedInputs: inputs,
          data: data,
        }),
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    page = 1
    setSearchForGames(true)
  }, [inputs, storesSelected])

  const getAddress = ({ page, storesSelected2 }) => {
    function getStoresString() {
      const arr = []
      Object.keys(storesSelected2).forEach((store) => {
        if (!storesSelected[store]) return false

        const newStore = find(
          storesApi.data,
          (apiStore) => apiStore.storeName === store
        )
        if (!newStore) return
        arr.push(newStore.storeID)
      })
      return arr.join()
    }
    const storesString = getStoresString()

    return (
      'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
      price[0] +
      '&upperPrice=' +
      price[1] +
      '&steamRating=' +
      rating[0] +
      '&pageNumber=' +
      page +
      '&storeID=' +
      storesString
    )
  }

  const getMoreGames = useCallback(
    debounce(async ({ passedInputs }) => {
      page = 1
      var searchFinished = false
      var filtered = []
      var fetched = []
      setApiState({ ...apiState, loading: true })
      //FETCH MORE GAMES
      async function fetchMoreGames() {
        if (page > maxPageCount) {
          return
        }
        page = page + 1

        const address = getAddress({ page, storesSelected2: storesSelected })
        //FETCHING GAMES
        try {
          const res = await fetch(address)
          const data = await res.json()
          filtered = [
            ...getFilteredList({
              data: [...data, ...filtered],
              passedInputs,
            }),
          ]
          fetched = [...fetched, ...data]
        } catch (err) {
          console.log(err)
        }
        //STOPS FUNCTION IF PAGE COUNT IS HIGH
        if (page > maxPageCount) {
          setApiState({
            ...apiState,
            filteredList: filtered,
            loading: false,
            data: [...fetched],
          })
          searchFinished = true
          setSearchForGames(false)
          return
        }
        //RELOADS FUNCTION TO FETCH MORE GAMES
        if (filtered.length < minimumGamesCount && !searchFinished) {
          fetchMoreGames()
        } else {
          //SETS LIST OF GAMES IF THERE IS ENOUGH
          return setApiState({
            ...apiState,
            loading: false,
            data: [...fetched],
            filteredList: filtered,
          })
        }
      }
      await fetchMoreGames()
    }, 500),
    [inputs, storesSelected]
  )

  async function initialSetup() {
    let storesData
    setStoresApi({ ...storesApi, loading: true })
    // GET STORES DATA
    try {
      const res = await fetch('https://www.cheapshark.com/api/1.0/stores')
      const data = await res.json()
      setStoresApi({ ...storesApi, loading: false, data: data })
      storesData = data
    } catch (err) {
      console.log(err)
      setStoresApi({ loading: false, data: null, error: true })
    }

    // GET STORES STRING
    function getStoresString2() {
      const arr = []
      storesData.forEach((store) => {
        arr.push(store.storeID)
      })
      return arr.join()
    }
    const storesString = getStoresString2()

    // GET ADDRESS
    function getAddress2() {
      return (
        'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
        price[0] +
        '&upperPrice=' +
        price[1] +
        '&steamRating=' +
        rating[0] +
        '&pageNumber=' +
        1 +
        '&storeID=' +
        storesString
      )
    }
    const address = getAddress2()

    // GET GAMES
    setApiState({ ...apiState, loading: true })
    try {
      const res = await fetch(address)
      const data = await res.json()
      setApiState({
        ...apiState,
        loading: false,
        data: data,
        filteredList: getFilteredList({ data, passedInputs: inputs }),
      })
    } catch (err) {
      console.log(err)
      setApiState({ ...apiState, loading: false, error: true })
    }

    setInitialSetupComplete(true)
  }

  const notEnoughGames =
    filteredList?.length < minimumGamesCount && page < maxPageCount
      ? true
      : false

  apiState.data &&
    initialSetupComplete &&
    notEnoughGames &&
    !searchedAllPages &&
    !apiState.loading &&
    searchForGames &&
    getMoreGames({ data: apiState?.data, passedInputs: inputs, filteredList })

  function getFilteredList({ data, passedInputs }) {
    const { rating, reviews, release } = passedInputs
    const inputFiltered = data.filter((item) => {
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

    const duplicateFiltered = inputFiltered.filter((item, index, arr) => {
      return (
        arr.findIndex((item2) => {
          return item2.storeID === item.storeID && item2.title === item.title
        }) === index
      )
    })

    const completelyFiltered = duplicateFiltered

    return completelyFiltered
  }

  const theme = createTheme({
    components: {},
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
      borderRadius: 2,
    },
    overrides: {
      MuiSlider: {
        thumb: {
          width: '13px',
          height: '13px',
          '&:hover': {
            boxShadow: '0',
          },
        },
      },
      MuiToolbar: {
        //footer
        root: {
          backgroundColor: '#f2f2f2',
          borderTop: '1px solid #c9c9c9',
          padding: !isPhoneScreen && '10px',
        },
      },
      Normal_table_container__1mssP: {
        root: { padding: '0px 50px' },
      },
      MuiTableCell: {
        //Header
        stickyHeader: {
          backgroundColor: '#f2f2f2',
          padding: !isPhoneScreen && '20px',
          borderBottom: '1px solid #c9c9c9',
        },
      },
      MuiPaper: {
        root: {
          padding: '0',
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
    searchForGames,
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

  const vars = {
    page,
  }

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={{ state, setState, vars }}>
        <Component {...pageProps}></Component>
      </StateContext.Provider>
    </ThemeProvider>
  )
}

export default MyApp
