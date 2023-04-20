import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StatisticsBox from './StatisticsBox'
import StatisticsChart from './StatisticsChart'

const StatisticsContainer = ({
  projects,
  tasksDone
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <StatisticsBox
          count={projects}
          title="PROYECTOS ACTUALES"
        />
        <StatisticsBox
          count={tasksDone}
          title="TAREAS REALIZADAS"
        />
      </View>
      <View style={styles.chartsContainer}>
        <StatisticsChart title={"HORAS TRABAJADAS"}/>
      </View>
    </View>
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