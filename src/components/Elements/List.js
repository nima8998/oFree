import { StyleSheet, ScrollView, View} from 'react-native'
import React from 'react'
import ListItem from './ListItem'

const List = ({
  data
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {
          data?.map((item, index)=><ListItem data={item} key={index}/>)
        }
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({
  container:{
    width: "100%",
    paddingHorizontal: 35
  },
})