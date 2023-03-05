import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Navbar, Tabs } from '../components'

const Layout = ({children}) => {
  return (
    <>
        <Navbar/>
            {children}
        <Tabs/>
    </>
  )
}

export default Layout