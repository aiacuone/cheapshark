import '../styles/globals.css'
import { useState, useEffect } from 'react'

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
  const [storesSelected, setStoresSelected] = useState(null)
  const [stores, setStores] = useState()
  const [filteredList, setFilteredList] = useState()
  const [unFilteredList, setUnFilteredList] = useState([])
  const [sortBy, setSortBy] = useState()
  const [tableHeight, setTableHeight] = useState()

  // useEffect(() => {
  //   setApiState({ loading: true })

  //   fetch('https://www.cheapshark.com/api/1.0/deals?')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setApiState({ loading: false, data: data })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setApiState({ loading: false, data: null, error: true })
  //     })

  //   //list of stores
  //   setStoresApi({ loading: true })

  //   fetch('https://www.cheapshark.com/api/1.0/stores')
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setStoresApi({ loading: false, data: data })
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       setStoresApi({ loading: false, data: null, error: true })
  //     })
  // }, [])

  // useEffect(() => {
  //   setFilteredList(apiState.data)
  // }, [apiState.data])

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
