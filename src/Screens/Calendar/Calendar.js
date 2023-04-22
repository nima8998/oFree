import { StyleSheet, ScrollView, RefreshControl} from 'react-native'
import React from 'react'
import { CustomCalendar } from '../../components'
import { useSelector } from 'react-redux'
import Colors from '../../Constants/Colors'
import onRefresh from '../../Utils/refresh'
import { getMarkedDots } from '../../Utils/getMarkedDots'
import { useDispatch } from 'react-redux'
import { getTasks } from '../../Store/Actions/tasks.action'

const Calendar = () => {
  const dispatch = useDispatch();
  const tasksList = useSelector(({tasks})=>tasks.list);
  const {userId} = useSelector(({auth})=>auth);
  const [refreshing, setRefreshing] = React.useState(false);
  const [markedDots, setMarkedDots] = React.useState();

  React.useEffect(()=>{
    dispatch(getTasks(userId))
  },[]) 
  

  React.useEffect(()=>{
    if(tasksList){
      const marks = getMarkedDots(tasksList);
      setMarkedDots(marks)
    }
  },[refreshing]) 

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
      <CustomCalendar
        markedDates={markedDots}
      />
    </ScrollView>
  )
}

export default Calendar

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})