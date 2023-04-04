import React from 'react'
import {  StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { ButtonActions, ProjectsNavbar, TasksList } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getTasks } from '../../Store/Actions/tasks.action';

const Tasks = () => {
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

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
      }  
    >
      <>
        <ProjectsNavbar/>
        <TasksList data={tasksList} />
        <ButtonActions/>
      </>
    </ScrollView>
  )
}

export default Tasks

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})