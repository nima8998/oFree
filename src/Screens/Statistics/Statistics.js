import { StyleSheet, RefreshControl, ScrollView} from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText'
import {StatisticsContainer} from '../../components'
import { useSelector, useDispatch } from 'react-redux'
import { getWorkTimeLocal } from '../../../db'
import onRefresh from '../../Utils/refresh'
import { getProjects } from '../../Store/Actions/projects.action'
import { getTasks } from '../../Store/Actions/tasks.action'

const Statistics = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const {userId} = useSelector(({auth})=>auth)
  const projects = useSelector(({projects})=>projects.list)
  const tasksList = useSelector(({tasks})=>tasks.list)
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [workTimeReport, setWorkTimeReport] = React.useState();
  const [tasksDone, setTasksDone] = React.useState();
  
  React.useEffect(()=>{
    if(userId)
    {
      // getWorkTimeLocal(userId)
      //   .then((data)=>{ 
      //     console.log(data)
      //   })
      //   .catch(error=>console.log(error))

      dispatch(getProjects(userId))
      dispatch(getTasks(userId))
    }
  },[userId, refreshing])
  
  React.useEffect(()=>{
    const tasksDone = tasksList.filter(task=>task.taskDone).length;
    setTasksDone(tasksDone)
  },[tasksList, refreshing])


  return (
    <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
    } >
      <StatisticsContainer
        projects={projects.length}
        tasksDone={tasksDone}
      />
    </ScrollView>
  )
}

export default Statistics

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20,
        flex: 1,
    }
})