import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider'
import Colors from '../Constants/Colors'


const ButtonActions = () => {
  const {
    setNewProjectModal,
    setIsListVisible,
    isListVisible,
  } = useCommonContext()

  return (
    <View style={styles.container} >
        {
          isListVisible &&
          <View style={styles.actionsList}>
            <Pressable style={styles.secondaryButton} onPress={()=>setNewProjectModal()}>
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
      backgroundColor: Colors.primaryViolet,
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
      backgroundColor: Colors.secondaryViolet,
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