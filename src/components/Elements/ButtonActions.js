import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'

const ButtonActions = ({
  handleModal,
  isListVisible,
  setIsListVisible
}) => {

  return (
    <View style={styles.container} >
        {
          isListVisible &&
          <View style={styles.actionsList}>
            <Pressable style={styles.secondaryButton} onPress={handleModal}>
              <Text style={{transform: [{rotate: '-45deg'}]}}>Add</Text>
            </Pressable>
          </View>
        }
        <Pressable style={styles.button} onPress={()=>setIsListVisible(!isListVisible)}>
            <Text style={styles.buttonText}>+</Text>
        </Pressable>
    </View>
  )
}

export default ButtonActions

const styles = StyleSheet.create({
    container:{
      position: 'absolute',
      bottom: 15,
      flexDirection: 'row',
      width: "90%",
      justifyContent: 'flex-end',
    },
    button: {
      backgroundColor: "#C850ED",
      transform: [{rotate: "45deg"}],
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    buttonText: {
      fontSize: 28,
      transform: [{rotate: "-45deg"}],
      color: '#fff',
    },
    secondaryButton: {
      backgroundColor: '#DEA0F0',
      transform: [{rotate: "45deg"}],
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 3,
    },
    actionsList:{
      position: 'absolute',
      bottom: 60,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    }
})