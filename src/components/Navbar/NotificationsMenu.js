import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const MenuItem = () => {
  const navigation = useNavigation();
  return (
    <Ionicons name="notifications-sharp" size={24} color="white" />
  )
}

export default MenuItem