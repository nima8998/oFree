import { StyleSheet, View, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import Colors from '../../Constants/Colors'
import CustomText from '../Elements/CustomText'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';

// componente personalziado del drawer para mostrar la info del usuario.
const ProfileDrawer = () => {
  const navigation = useNavigation();
  const {currentUser} = useSelector(({auth})=>auth)

  return (
    <TouchableWithoutFeedback onPress={()=>navigation.navigate("Profile")}>
      <View style={styles.container}>
        <View>
          <Image
            style={styles.image}
            source={{uri: currentUser?.photoUrl != '' ? currentUser?.photoUrl : null}}
          />
        </View>
        <View style={styles.containerInfo}>
          <CustomText fontType={"semibold"} otherStyles={styles.containerInfoEmail} textValue={currentUser?.displayName}/>
          <CustomText otherStyles={styles.containerInfoEmail} textValue={currentUser?.email}/>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default ProfileDrawer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 120,
    backgroundColor: Colors.primaryViolet,
    bottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
  },
  containerInfo: {
    marginLeft: 10,
  },
  containerInfoEmail:{
    color: "#fff",
  },
  image:{
    width: 60,
    height: 60,
    borderRadius: 10,
    borderColor: "#fff",
    borderWidth: 1
  }
})