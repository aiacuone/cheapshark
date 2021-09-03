import '../styles/globals.css'
import { useState } from 'react'

function MyApp({ Component, pageProps }) {
  const [inputs, setInputs] = useState({
    Reviews: [0, 100],
    Price: [0, 50],
    'Release Date': [1990, 2021],
    'Steam Rating': [0, 100],
  })

  const state = { inputs }
  const setState = { setInputs }
  return <Component {...pageProps} state={state} setState={setState} />
}

export default MyApp
