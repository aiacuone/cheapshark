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
    data: [],
    error: false,
    filteredList: [],
  })
  const { filteredList } = apiState
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
  // const [page, setPage] = useState(1)
  const [initialApiCallComplete, setInitialApiCallComplete] = useState(false)
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
  const maxPageCount = 5
  const minimumGamesCount = 10

  useEffect(() => {
    function handleResize() {
      setWindowHeight(window.innerHeight)
    }

    window.addEventListener('resize', handleResize)

    getGames()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    //LOCAL FILTERING
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
  }, [release, reviews, rating[1]])

  useEffect(() => {
    setApiState({ ...apiState, loading: true })
    //API FILTERING
    ;(async function () {
      try {
        const res = await fetch(address(1))
        const data = await res.json()
        setApiState({
          ...apiState,
          loading: false,
          // data: [...apiState.data, ...data],
          data: data,
          filteredList: getFilteredList({
            passedInputs: inputs,
            // data: [...data, ...filteredList],
            data: data,
          }),
        })
      } catch (err) {
        console.log(err)
      }
    })()
  }, [price, rating[0], storesSelected])

  useEffect(() => {
    //STORES API
    setStoresApi({ ...storesApi, loading: true })

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

  useEffect(() => {
    // setPage(1)
    page = 1
    setSearchForGames(true)
    // getGames()
  }, [inputs, storesSelected])

  const storesString = () => {
    const arr = []
    Object.keys(storesSelected)?.forEach((store, index) => {
      if (!storesSelected[store]) return
      arr.push(index)
    })
    return arr.join()
  }
  // var page = 1
  const address = (page) => {
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
      storesString()
    )
  }

  const getMoreGames = useCallback(
    debounce(async ({ passedInputs }) => {
      page = 1
      // var filtered = [...filteredList]//INPUTS THE PREVIOUS FILTERED LIST, NEED FRESH LIST
      var filtered = []
      var fetched = []
      setApiState({ ...apiState, loading: true })
      async function fetchMoreGames() {
        if (page > maxPageCount) {
          // setApiState({ ...apiState, loading: false })
          return
        }
        page = page + 1

        try {
          const res = await fetch(address(page))
          const data = await res.json()
          data.forEach((item) => {
            const {
              salePrice: price,
              title,
              steamRatingCount: reviews,
              steamRatingPercent: rating,
            } = item
          })
          filtered = [
            ...getFilteredList({
              // data: [...data, ...apiState.data, ...filtered],// INCLUDES THE PREVIOUS API STATE DATA, WE NEED FRESH DATA
              data: [...data, ...filtered],
              passedInputs,
            }),
          ]
          filtered.forEach((item) => {
            const {
              salePrice: price,
              title,
              steamRatingCount: reviews,
              steamRatingPercent: rating,
            } = item
          })
          fetched = [...fetched, ...data]
          // setApiState({apiState,})
        } catch (err) {
          console.log(err)
        }
        if (page > maxPageCount) {
          setApiState({
            ...apiState,
            filteredList: filtered,
            loading: false,
            data: [...apiState.data, ...fetched],
          })
          setSearchForGames(false)
          return
        }
        if (filtered.length < minimumGamesCount) {
          // setApiState({ ...apiState, filteredList: filtered })
          fetchMoreGames()
        } else {

          return setApiState({
            ...apiState,
            loading: false,
            data: [...apiState.data, ...fetched],
            filteredList: filtered,
          })
        }
      }
      await fetchMoreGames()
    }, 500),
    [inputs]
  )

  const getGames = useCallback(
    debounce(
      // GAMES API
      function () {
        setApiState({ ...apiState, loading: true })
        fetch(address(1))
          .then((res) => res.json())
          .then((data) => {
            setApiState({
              ...apiState,
              loading: false,
              data: data,
              filteredList: getFilteredList({ data, passedInputs: inputs }),
            })
          })
          .catch((error) => {
            console.log(error)
            setApiState({ ...apiState, loading: false, error: true })
          })

        setInitialApiCallComplete(true)
      },
      [500]
    ),
    []
  )

  const notEnoughGames =
    filteredList?.length < minimumGamesCount && page < maxPageCount
      ? true
      : false

  apiState.data &&
    initialApiCallComplete &&
    notEnoughGames &&
    !searchedAllPages &&
    !apiState.loading &&
    searchForGames &&
    getMoreGames({ data: apiState?.data, passedInputs: inputs, filteredList })
  // test()

  function getFilteredList({ data, passedInputs }) {
    const { rating, reviews, release } = passedInputs

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

  const theme = createTheme({
    components: {
      // MuiToolbar: {
      //   root: {
      //     background: 'red',
      //     width: '100%',
      //   },
      // },
      // MuiTable: {
      //   styleOverrides: {
      //     root: {
      //       color: 'green',
      //       padding: '300px',
      //       background: 'orange',
      //       stickyHeader: {
      //         background: 'purple',
      //       },
      //     },
      //     stickyHeader: {
      //       background: 'purple',
      //     },
      //   },
      // },
      // MuiTableHead: {
      //   styleOverrides: {
      //     root: {
      //       background: 'yellow',
      //     },
      //   },
      // },
    },
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
        },
        '.&:hover': {
          boxShadow: '0',
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
