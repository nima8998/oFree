import { StyleSheet, Text, View, RefreshControl, ScrollView } from 'react-native'
import React from 'react'
import StatisticsBox from './StatisticsBox'
import StatisticsChart from './StatisticsChart'
import onRefresh from '../../Utils/refresh'

import { useSelector, useDispatch } from 'react-redux'

import { getWorkTimeLocal } from '../../../db'

import { getProjects } from '../../Store/Actions/projects.action'
import { getTasks } from '../../Store/Actions/tasks.action'
import { getTimeWorkedWeek } from '../../Utils/getTimeWorkedWeek'

const StatisticsContainer = () => {
  const dispatch = useDispatch();
  const {userId} = useSelector(({auth})=>auth)
  const projects = useSelector(({projects})=>projects.list)
  const tasksList = useSelector(({tasks})=>tasks.list)
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [workTimeReport, setWorkTimeReport] = React.useState();
  const [hoursPerDay, setHoursPerDay] = React.useState();
  const [tasksDone, setTasksDone] = React.useState();
  
  React.useEffect(()=>{
    if(userId)
    {
      getWorkTimeLocal(userId)
        .then((data)=>{ 
          setHoursPerDay(getTimeWorkedWeek(data));
        })
        .catch(error=>console.log(error))

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
    <View>
      <View style={styles.headerContainer}>
        <StatisticsBox
          count={projects.length}
          title="PROYECTOS ACTUALES"
        />
        <StatisticsBox
          count={tasksDone}
          title="TAREAS REALIZADAS"
        />
      </View>
      <View style={styles.chartsContainer}>
        <StatisticsChart 
          title={"HORAS TRABAJADAS"}
          hoursPerDay={hoursPerDay}
        />
      </View>
    </View>
    </ScrollView>
  )
}

export default StatisticsContainer

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "100%",
  },
  headerContainer:{
    flexDirection: 'row',
    justifyContent: 'center',
  },
  chartsContainer:{
    width: "100%",
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25
  }
})