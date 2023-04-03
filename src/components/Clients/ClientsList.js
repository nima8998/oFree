import { StyleSheet, ScrollView, View} from 'react-native'
import React from 'react'
import ClientListItem from './ClientListItem'
import CustomText from '../Elements/CustomText'

const List = ({
  data,
}) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
        {
          data.length > 0 ?
          data.map((item, index)=><ClientListItem data={item} key={index}/>) :
          <CustomText textValue={"No hay clientes creados"}/>
        }
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({
  container:{
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})