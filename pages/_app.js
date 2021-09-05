import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [inputs, setInputs] = useState({
    Reviews: [0, 100],
    Price: [0, 50],
    Release: [1990, 2021],
    Rating: [0, 100],
  })
  const [expanded, setExpanded] = useState(false)

  const state = { inputs, expanded }
  const setState = { setInputs, setExpanded }
  return <Component {...pageProps} state={state} setState={setState} />
}

export default MyApp
