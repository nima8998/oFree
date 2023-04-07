import { StyleSheet, ScrollView, RefreshControl, Alert} from 'react-native'
import React from 'react'
import TasksListItem from './TasksListItem'
import CustomText from '../Elements/CustomText'
import { updateTaskById } from '../../Store/Actions/tasks.action'
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../Store/Actions/tasks.action';

const TasksList = () => {
  const dispatch = useDispatch();
  const tasksList = useSelector(({tasks})=>tasks.list)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getTasks())
  },[refreshing])

  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  })


  const handleTaskStatus = (taskId, value) =>{
    const newTaskData = {
      taskDone: value
    }
    dispatch(updateTaskById(newTaskData, taskId))
      .then(data=>{
        Alert.alert('', data?.message, [
          {
            text: 'OK',
            style: "destructive",
          }
        ])
        if(data?.status) onRefresh();
      })
      .catch(err=>console.log(err))
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }  
    >
        {
          tasksList ?
          tasksList.map((item, index)=><TasksListItem data={item} key={index} handleTaskStatus={handleTaskStatus}/>) :
          <CustomText textValue={"No hay tareas creadas"}/>
        }
    </ScrollView>
  )
}

export default TasksList

const styles = StyleSheet.create({
  container:{
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})