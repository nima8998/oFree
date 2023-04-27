import { StyleSheet, RefreshControl, View} from 'react-native'
import React from 'react'
import {StatisticsContainer} from '../../components'

const Statistics = () => {

  return (
    <View style={styles.container}>
      <StatisticsContainer />
    </View>
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