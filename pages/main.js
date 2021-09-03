import React from 'react'
import NormalScreen from '../components/normal/NormalScreen'

export default function main({ state, setState }) {
  return (
    <div>
      <NormalScreen state={state} setState={setState} />
    </div>
  )
}
