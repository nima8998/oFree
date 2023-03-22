import { StyleSheet, Text, Pressable } from 'react-native'
import React from 'react'

const ListItem = ({
    projectInfo
}) => {
  
  return (
    <Pressable style={styles.item} >
      <Text style={styles.itemText}>
        {projectInfo.name}
      </Text>
    </Pressable>
  )
}

export default ListItem

const styles = StyleSheet.create({
    item:{
        width: 200,
        backgroundColor: '#dadada',
        borderRadius: 5,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems:  "center",
        padding: 10,

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