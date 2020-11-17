import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './pages/Home'

export function App() {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Redirect exact from="/" to="/home" />
    </Switch>
  )
}
