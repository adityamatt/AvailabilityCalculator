import * as React from 'react'
import './App.css'
import { NavBar } from '../components/Nav/NavBar'
import { Route, HashRouter, Redirect } from 'react-router-dom'
import { Stack, ThemeProvider } from '@fluentui/react'
import Header from '../components/Nav/Header'
import Home from '../components/Home/Home'
import View from '../components/View/View'
import Footer from '../components/Footer/Footer'
import { initializeIcons } from '@fluentui/font-icons-mdl2'

export const App = (props: any) => {
  initializeIcons()
  return (
    <HashRouter>
      <ThemeProvider>
        <Stack className="App">
          <Stack.Item className="header">
            <Header />
          </Stack.Item>
          <Stack className="body" grow>
            <Stack.Item className="content">
              <Route key="homeKey" exact path="/">
                <Home />
              </Route>
              <Route key="viewKey" exact path="/View">
                <View />
              </Route>
            </Stack.Item>
            <Stack.Item className="sidebar">
              <NavBar />
            </Stack.Item>
          </Stack>
          <Stack.Item className="footer">
            <Footer />
          </Stack.Item>
        </Stack>
      </ThemeProvider>
    </HashRouter>
  )
}

export default App
