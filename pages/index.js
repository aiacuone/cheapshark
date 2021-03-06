import React, { useContext } from 'react'
import NormalScreen from '../components/normal/NormalScreen'
import PhoneScreen from '../components/phone/PhoneScreen'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress'
import { StateContext } from '../utils/StateContext'
import Head from 'next/head'

export default function Home() {
  const { state } = useContext(StateContext)
  const { apiState, storesApi, isPhoneScreen } = state

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: '100%', width: '100%' }}>
      <Head>
        <title>Cheapshark</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
