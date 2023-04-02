import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import CustomText from '../Elements/CustomText'
import { AntDesign } from '@expo/vector-icons';
import Colors from '../../Constants/Colors';
import { useNavigation } from '@react-navigation/native';

const ClientListItem = ({
    data,
}) => {
  const [infoVisible, setInfoVisible] = React.useState(false);
  const navigation = useNavigation();
  return (
    <>
      <Pressable style={styles.item}>
        <Pressable style={styles.itemTitle} onPress={()=>navigation.navigate("EditClientContainer", {id: data.id, name: data.name})}>
          <CustomText textValue={data?.name} otherStyles={styles.itemText} fontType="medium"/>
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
          <CustomText otherStyles={styles.infoItemText} textValue="Teléfono:"/>
          <CustomText otherStyles={styles.infoItemText} textValue={data?.phone}/>
        </View>
        <View style={styles.infoItem}>
          <CustomText otherStyles={styles.infoItemText} textValue="Mail:"/>
          <CustomText otherStyles={styles.infoItemText} textValue={data?.mail}/>
        </View>
        <View>
          <CustomText otherStyles={styles.infoItemText} textValue="Observaciones:"/>
          <CustomText otherStyles={styles.infoItemDescription} textValue={data?.description}/>
        </View>
      </View>
    </>
  )
}

export default ClientListItem

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
      color: Colors.primaryBlue,
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
    },
    infoItemDescription:{
      fontSize: 11,
      color: "#838383"
    }
})