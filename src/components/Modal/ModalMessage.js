import { StyleSheet, Text, View, Modal } from 'react-native'
import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider'
import CustomText from '../Elements/CustomText';
import Colors from '../Constants/Colors';

const ModalMessage = ({
    data
}) => {
    const {isModalVisible} = useCommonContext();
  return (
    <Modal animationType='fade' visible={isModalVisible} transparent>
        <View style={styles.container}>
            <View style={styles.modal}>
                <CustomText textValue={data?.message} otherStyles={styles.modalText} fontType="medium"/>
            </View>
        </View>
    </Modal>
  )
}

export default ModalMessage

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center", 
    },
    modal:{
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5, 
    },
    modalText:{
        color: Colors.primaryBlue,
    }
})