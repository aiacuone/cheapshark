import React, { useEffect, useContext } from 'react'
import NormalScreen from '../components/normal/NormalScreen'
import PhoneScreen from '../components/phone/PhoneScreen'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { StateContext } from '../utils/StateContext'

export default function main() {
  const { state, setState } = useContext(StateContext)
  const { apiState, storesApi, storesSelected, isPhoneScreen } = state
  const {
    setStores,
    setStoresSelected,
    setUnFilteredList,
    setFilteredList,
    setApiState,
    setStoresApi,
  } = setState
  // const { reviews, price, release, rating } = inputs

  ////////////////////////////////// global variables ///////////////////////////////////

  const headers = {
    'Release Date': 'Release',
    Price: 'Price',
    Title: 'Title',
    'Steam Rating': 'Reviews',
    Reviews: 'reviews_amount',
    Store: 'Store',
  }

  const vars = { headers }

  ////////////////////////////////// useEffects /////////////////////////////////////////

  //default API call
  useEffect(() => {
    setApiState({ loading: true })

    fetch('https://www.cheapshark.com/api/1.0/deals?')
      .then((res) => res.json())
      .then((data) => {
        setApiState({ loading: false, data: data })
      })
      .catch((error) => {
        console.log(error)
        setApiState({ loading: false, data: null, error: true })
      })

    //list of stores
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

  useEffect(() => {
    setFilteredList(apiState.data)
  }, [apiState.data])

  // useEffect(() => {
  // 	if (titleSearch) {
  // 		setTitleApi({ loading: true })

  // 		fetch('https://www.cheapshark.com/api/1.0/games?title='+titleSearch)
  // 			.then((res) => res.json())
  // 			.then((data) => {
  // 				setTitleApi({ loading: false, data: data })
  // 				// createFilteredList({ gamesList: data })
  // 			})
  // 			.catch((error) => {
  // 				console.log(error)
  // 				setTitleApi({ loading: false, data: null, error: true })
  // 			})
  // 	}

  // }, [titleSearch])

  ///////////////////////////// storesSelectedObject ////////////////////////////

  if (storesApi.data && !storesSelected) {
    //error without if statement
    const obj = { default: true }
    const storesArr = storesApi.data.map((item) => item.storeName)
    setStores(storesArr)
    storesArr.map((item) => {
      return (obj[item] = true)
    })
    setStoresSelected(obj)
  }

  //////////////////////// updateFetch //////////////////////////////

  // function updateFetch({ sortBy, inputs }) {
  //   const { price, rating } = inputs

  //   //creates list of stores
  //   const stores = () => {
  //     let arr = []
  //     Object.keys(storesSelected).map((item, index) => {
  //       storesSelected[item] && arr.push(index)
  //     })
  //     return arr.join()
  //   }

  //   const fetchSortBy = sortBy ? sortBy : ''

  //   // const fetchPage = fetchObj?.page ? fetchObj.page - 1 : page - 1

  //   const standardAddress =
  //     'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
  //     price[0] +
  //     '&upperPrice=' +
  //     price[1] +
  //     '&steamRating=' +
  //     rating[0] +
  //     '&pageNumber=' +
  //     1
  //   // fetchPage +
  //   '&storeID=' + stores()

  //   //Incorporates sortBy, if you add sortBy=, but with no value, it changes the default list, so its better to keep the sortBy out of the code if there is no sorting
  //   const fetchAddress =
  //     fetchSortBy && fetchSortBy !== 'reviews_amount'
  //       ? standardAddress + '&sortBy=' + fetchSortBy
  //       : standardAddress

  //   setApiState({ loading: true })

  //   fetch(fetchAddress)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setApiState({ loading: false, data: data })
  //       createFilteredLists({
  //         gamesList: data,
  //         sortByReviews: fetchObj.sortBy == 'reviews_amount' ? true : false,
  //         inputs,
  //       })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setApiState({ loading: false, data: null, error: true })
  //     })
  // }
  /////////////////////////// createFilteredList /////////////////////////

  function createFilteredLists({ gamesList: list, sortByReviews, inputs }) {
    //local sort by reviews amount

    const { reviews, release, rating } = inputs
    const gamesList = sortByReviews
      ? list.sort((a, b) => {
          return b.steamRatingCount - a.steamRatingCount
        })
      : list

    const filtered = gamesList.filter((item) => {
      const filter1 =
        reviews[0] == 0 ? item : item.steamRatingCount >= reviews[0] * 1000
      const filter2 =
        reviews[1] == 100 ? item : item.steamRatingCount <= reviews[1] * 1000
      const filter3 =
        rating[0] == 100
          ? item
          : item.steamRatingPercent == '0' ||
            item.steamRatingPercent <= rating[1]
      const filter4 =
        release[0] == 1990
          ? item
          : item.releaseDate * 1000 > new Date(release[0], 0, 1).getTime()
      const filter5 =
        release[1] == 2021
          ? item
          : item.releaseDate * 1000 < new Date(release[1], 11, 31).getTime()

      return filter1 && filter2 && filter3 && filter4 && filter5
    })

    const unfiltered = gamesList.filter((item) => {
      if (filtered.indexOf(item) == -1) {
        return item
      }
    })

    setUnFilteredList(unfiltered)
    setFilteredList(filtered)
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100%', width: '100%' }}>
      {isPhoneScreen && <PhoneScreen />}
      {!isPhoneScreen && <NormalScreen />}

      {apiState.loading || storesApi.loading ? (
        <div className="progress">
          <CircularProgress size="6rem" />
        </div>
      ) : null}
    </Grid>
  )
}

export function updateFetch() {
  let { state, setState } = useContext(StateContext)
  const { inputs, filteredList, unFilteredList } = state
  const { price, rating } = inputs

  //creates list of stores
  const stores = () => {
    let arr = []
    Object.keys(storesSelected).map((item, index) => {
      storesSelected[item] && arr.push(index)
    })
    return arr.join()
  }

  const fetchSortBy = sortBy ? sortBy : ''

  // const fetchPage = fetchObj?.page ? fetchObj.page - 1 : page - 1

  const standardAddress =
    'https://www.cheapshark.com/api/1.0/deals?lowerPrice=' +
    price[0] +
    '&upperPrice=' +
    price[1] +
    '&steamRating=' +
    rating[0] +
    '&pageNumber=' +
    1
  // fetchPage +
  '&storeID=' + stores()

  //Incorporates sortBy, if you add sortBy=, but with no value, it changes the default list, so its better to keep the sortBy out of the code if there is no sorting
  const fetchAddress =
    fetchSortBy && fetchSortBy !== 'reviews_amount'
      ? standardAddress + '&sortBy=' + fetchSortBy
      : standardAddress

  setApiState({ loading: true })

  fetch(fetchAddress)
    .then((res) => res.json())
    .then((data) => {
      setApiState({ loading: false, data: data })
      createFilteredLists({
        gamesList: data,
        sortByReviews: fetchObj.sortBy == 'reviews_amount' ? true : false,
        inputs,
      })
    })
    .catch((error) => {
      console.log(error)
      setApiState({ loading: false, data: null, error: true })
    })
}
