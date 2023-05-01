import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import CustomText from '../Elements/CustomText';
import { StyleSheet } from 'react-native';
import Colors from '../../Constants/Colors';
import {useCommonContext} from '../../Context/CommonContextProvider';

const MenuItem = () => {
  const navigation = useNavigation();
  const {hasNotifications} = useCommonContext();
  return (
    <>
      {hasNotifications && <CustomText textValue={"."} otherStyles={styles.dot}/>}
      <Ionicons name="notifications-sharp" size={24} color="white" onPress={()=>navigation.navigate("Notifications")}/>
    </>
  )
}


const styles = StyleSheet.create({
  dot:{
    color: Colors.secondaryViolet,
    fontSize: 75,
    position: 'absolute',
    bottom: 0,
    left: 12,
  }
})

export default MenuItem