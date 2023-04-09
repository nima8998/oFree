import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import ProfileDrawer from './ProfileDrawer'

const CustomDrawerHeader = (props) => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ProfileDrawer {...props}/>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawerHeader

const styles = StyleSheet.create({})