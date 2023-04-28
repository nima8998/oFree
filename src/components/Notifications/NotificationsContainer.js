import { StyleSheet, View } from 'react-native'
import React from 'react'
import NotificationsItem from './NotificationsItem'
import CustomText from '../Elements/CustomText'
import Colors from '../../Constants/Colors'

const NotificationsContainer = () => {
  const [notifications, setNotifications] = React.useState([
    { id: 1, message: 'Recordatorio!', type: 'reminder', status: 1 },
    { id: 2, message: 'Nuevo record, felicitaciones.', type: 'record', status: 1 },
    { id: 3, message: 'Nueva actualizacion disponible.', type: 'system', status: 1 },
  ]);

  const handleDeleteNotifications = () =>{
    setNotifications([]);
  }

  return (
    <View style={styles.container}>
      {
        notifications.length > 0 ?
          notifications.map((item, key)=> <NotificationsItem data={item} key={key}/>) :
          <CustomText textValue="No hay notificaciones."/>
      }
      {
        notifications.length > 0 &&
          <CustomText 
            textValue="Eliminar notificaciones" 
            fontType="medium" 
            otherStyles={styles.clearNotis}
            onPress={handleDeleteNotifications}
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