import React from 'react'
import { StyleSheet, View, Image } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import CustomText from '../Elements/CustomText'
import { Feather } from '@expo/vector-icons';
import Colors from '../../Constants/Colors'
import { Alert } from 'react-native'


const ProfileImageSelector = ({onImage, defaultImage}) => {
  const [pickedUri, setPickedUri] = React.useState(defaultImage || null);

  const verifyPermissions = async () =>{
    const {status} = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Para utilizar la cámara necesitas dar permiso desde la pantalla de configuración de tu dispositivo.',
        [{text: 'Ok'}]
      )
      return false;
    }
    return true;
  }

  const handlerTakeImage = async () =>{
    const isCameraOk = await verifyPermissions();
    if (!isCameraOk) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8
    })

    setPickedUri(image.assets[0].uri)
    onImage(image.assets[0]?.uri)
  }

  return (
    <View style={styles.container}>
      <View style={styles.preview}>
        {
          !pickedUri ? 
            (<CustomText textValue={'No hay foto de perfil.'} />) :
            (
              <Image
                style={styles.image}
                source={{uri: pickedUri}}
                resizeMode='cover'
              /> 
            )
        }
        <Feather name="camera" size={25} style={[pickedUri && styles.cameraIcon, styles.cameraIconPlace]} color={Colors.primaryBlue} onPress={handlerTakeImage}/>
      </View>
    </View>
  )
}

export default ProfileImageSelector

const styles = StyleSheet.create({
  container:{
    marginBottom: 10,
  },
  preview:{
    width: "100%",
    height: "100%",
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15
  },
  image:{
    width: "100%",
    height: "100%",
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15
  },
  cameraIcon:{
    position: 'absolute',
    right: 10,
    bottom: 10
  },
  cameraIconPlace:{
    backgroundColor: Colors.secondaryViolet,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15
  }
})