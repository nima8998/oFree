import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer'
import ProfileDrawer from './ProfileDrawer'
import CustomText from '../Elements/CustomText'
import { useNavigation } from '@react-navigation/native'
import { logOut } from '../../Store/Actions/auth.action'
import { useDispatch } from 'react-redux'

const CustomDrawerHeader = (props) => {
  const dispatch = useDispatch();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ProfileDrawer {...props}/>
        <DrawerItemList {...props} />
        <CustomText textValue={"Salir"} style={{marginLeft: 17, marginTop: 12}}  onPress={()=> dispatch(logOut())}/> 
      </DrawerContentScrollView>
    </View>
  )
}

export default CustomDrawerHeader

const styles = StyleSheet.create({})