import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'
import CustomText from './CustomText'

const ListItem = ({
    data
}) => {
  return (
    <Pressable style={styles.item}>
      <CustomText textValue={data.name} otherStyles={styles.itemText}/>
    </Pressable>
  )
}

export default ListItem

const styles = StyleSheet.create({
    item:{
        backgroundColor: '#dadada',
        borderRadius: 5,
        padding: 5,
        marginVertical: 12,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 5,
        
        elevation: 4,
    },
    itemText:{
        color: '#000',
        fontSize: 18,
        textAlign: 'center',
    }
})