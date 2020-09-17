import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import UserInfo from './components/pages/userInfo'
import Gallery from './components/pages/imageGallery'
import Products from './components/pages/products'
import Navbar from './components/layout/navbar'

import { GlobalProvider } from './context/TestState'

import './App.css'

const App = () => {
  return (
    <GlobalProvider>
      <Router>
      
        <div className='navbar'>
          <Navbar />
        </div>

        <div>
          <Switch>
            <Route exact path='/' component={UserInfo} />
            <Route exact path='/user-info' component={UserInfo} />
            <Route exact path='/gallery' component={Gallery} />
            <Route exact path='/products' component={Products} />
          </Switch>
        </div>

      </Router>
    </GlobalProvider>
  )
}

export default App
