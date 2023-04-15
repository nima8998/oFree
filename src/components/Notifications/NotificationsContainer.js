import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationsItem from './NotificationsItem'
import CustomText from '../Elements/CustomText'
import Colors from '../../Constants/Colors'

const notis = [
  { id: 1, message: 'Recordatorio!', type: 'reminder', status: 1 },
  { id: 2, message: 'Nuevo record, crack', type: 'record', status: 1 },
  { id: 3, message: 'Nueva actualizacion disponible, salchicha.', type: 'system', status: 1 },
]

const NotificationsContainer = () => {
  return (
    <View style={styles.container}>
      {
        notis.length > 0 ?
          notis.map((item, key)=> <NotificationsItem data={item} key={key}/>) :
          <CustomText textValue="No hay notificaciones."/>
      }
      {
        notis.length > 0 &&
          <CustomText 
            textValue="Eliminar notificaciones" 
            fontType="medium" 
            otherStyles={styles.clearNotis}
            onPress={()=>console.log('TODO: Limpiar notificaciones')}
          />
      }
    </View>
  )
}

export default NotificationsContainer

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: 'center'
  },
  clearNotis:{
    color: Colors.primaryBlue,
    marginTop: 20
  }
})