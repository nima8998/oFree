import { StyleSheet, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import { CustomCalendar } from '../../components'
import { useSelector } from 'react-redux'
import Colors from '../../Constants/Colors'
import onRefresh from '../../Utils/refresh'

const Calendar = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  // const tasksList = useSelector(({tasks})=>tasks.list)
  // const dots = [];

  // TODO: seguir la docu para armar los markedDates segun la data de la lista de tareas. 
  // https://www.npmjs.com/package/react-native-calendars?activeTab=readme

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
      <CustomCalendar/>
    </ScrollView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})