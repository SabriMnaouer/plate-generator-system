import { useState } from 'react'

import './App.css'
import { PlateList } from './components/PlateList'
import { PlateInput } from './components/PlateInput'

function App() {

  return (
    <div>
      <PlateList/>
      <PlateInput/>
    </div>
  )
}

export default App
