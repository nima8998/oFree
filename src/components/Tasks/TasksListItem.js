import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../Elements/CustomText'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Constants/Colors';
import { useNavigation } from '@react-navigation/native';
import { Checkbox } from 'native-base';

const TasksListItem = ({
    data,
    handleTaskStatus
}) => {
  const [infoVisible, setInfoVisible] = React.useState(false);
  
  const navigation = useNavigation();
  return (
    <>
      <Pressable style={styles.item}>
        <Pressable style={styles.itemTitle} onPress={()=>navigation.navigate("EditTaskContainer", {id: data.id, name: data.taskName})}>
          <CustomText textValue={data?.taskName} otherStyles={styles.itemText} fontType="medium"/>
        </Pressable>
        
        <Pressable onPress={()=>setInfoVisible(!infoVisible)}>
          <AntDesign 
            name="down"
            size={20}
            color={Colors.primaryBlue}
            style={infoVisible === true && { transform: [{ rotate: "180deg"}]}}
          />
        </Pressable>
      </Pressable>
      <View style={[styles.info, {display: infoVisible === true ? "flex" : "none"}]}>
        
        <View style={styles.infoItem}>
          <CustomText otherStyles={styles.infoItemText} textValue="Fecha:"/>
          <CustomText otherStyles={styles.infoItemText} textValue={data?.taskDate}/>
        </View>

        <View style={styles.infoItem}>
          <CustomText otherStyles={styles.infoItemText} textValue="Completada:"  />
          <Checkbox 
            value={data?.taskDone}
            isChecked={data?.taskDone}
            color={Colors.primaryBlue} 
            accessibilityLabel="Tasks status" 
            size="sm" 
            onChange={(state)=>handleTaskStatus(data?.id, state)}
          />
        </View> 
        <View>
          <CustomText otherStyles={styles.infoItemText} textValue="Descripción:"/>
          <CustomText otherStyles={styles.infoItemDescription} textValue={data?.taskDescription}/>
        </View>
      </View>
    </>
  )
}

export default TasksListItem

const styles = StyleSheet.create({
    item:{
      backgroundColor: '#dadada',
      borderRadius: 5,
      paddingVertical: 5,
      paddingHorizontal: 15,
      marginVertical: 12,
      flexDirection:  'row',
      justifyContent: 'space-between',
      alignItems: 'center',


      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 5,
      
      elevation: 4,
    },
    itemTitle:{
      flex: 1, 
      alignItems: 'flex-start',
    },
    itemText:{
      fontSize: 18,
      textAlign: 'center',
    },
    info:{
      backgroundColor: "#dadada",
      borderBottomStartRadius: 5,
      borderBottomEndRadius: 5,
      marginTop: -15,
      padding: 15,
      zIndex: -2,

      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 6,
      },
      shadowOpacity: 0.37,
      shadowRadius: 5,
      
      elevation: 3,
    },
    infoItem:{
      flexDirection: 'row',
      justifyContent:  'space-between',
    },
    infoItemText:{
      fontSize: 11,
      paddingVertical: 3
    },
    infoItemDescription:{
      fontSize: 11,
      color: "#838383"
    }
})