import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

const MenuItem = () => {
  const navigation = useNavigation();
  return (
    <Entypo name="menu" size={24} color="white" onPress={()=>navigation.toggleDrawer()}/>
  )
}

export default MenuItem