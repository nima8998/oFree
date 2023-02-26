import { StyleSheet, Text, Modal, View } from 'react-native'
import CustomButton from '../Elements/CustomButton'
import React from 'react'

const EditProjectModal = ({
    isEditModalVisible,
    setIsEditModalVisible,
    currentProject,
    deleteProject
}) => {
  return (
    <View style={styles.centeredView}>
        <Modal animationType="fade" transparent={true} visible={isEditModalVisible} onRequestClose={setIsEditModalVisible}>
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Proyecto: {currentProject.name}</Text>
                    <View style={styles.modalBody}>
                        <View>
                            <Text>{currentProject.description}</Text>
                        </View>
                    </View>
                    <View style={styles.modalFooter}>
                        <CustomButton
                            onPress={()=>deleteProject(currentProject.id)}
                            text="ELIMINAR"
                            propStyle={{color: "red"}}
                        />
                        <CustomButton
                            onPress={setIsEditModalVisible}
                            text="LISTO"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    </View>
  )
}

export default EditProjectModal

const styles = StyleSheet.create({
    modalContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 25,
        width: "80%",
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalTitle: {
        fontWeight: 'bold',
    },
    modalBody:{
        marginVertical: 15,
    },
    modalFooter:{
        flexDirection: 'row',
    },
    colorPicker:{
        width: 20,
        height: 20,
        borderRadius: 2,
        marginHorizontal: 2
    },
    projectTypeText: {
        marginHorizontal: 5, 
        borderColor: "#304FFE", 
        paddingHorizontal: 15,
    }
})