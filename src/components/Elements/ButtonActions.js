import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider'
import Colors from '../../Constants/Colors'
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ButtonActions = () => {
  const {
    setIsListVisible,
    isListVisible,
  } = useCommonContext()
  const navigation = useNavigation();

 
  const navigateAndCloseList = (screen) =>{
    navigation.navigate(screen);
    setIsListVisible(false);
  }

  return (
    <View style={styles.container} >
        {
          isListVisible &&
          <View style={styles.actionsList}>
            {
              <Pressable style={styles.secondaryButton} onPress={()=>navigateAndCloseList("NewClient")}>
                <FontAwesome5 name="user-alt" size={20} color="white" style={styles.iconList}/>
              </Pressable>
            }
            <Pressable style={styles.secondaryButton} onPress={()=>navigateAndCloseList("NewProject")}>
              <MaterialCommunityIcons name="briefcase" size={20} color="white" style={styles.iconList}/>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={()=>navigateAndCloseList("NewTask")}>
              <Ionicons name="md-checkbox" size={20} color="white" style={styles.iconList}/>
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
      width: "95%",
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
      marginVertical: 10,
    },
    actionsList:{
      position: 'absolute',
      bottom: 55,
      flexDirection: 'column',
    },
    iconList: {
      transform: [{rotate: '-45deg'}],
    }
})