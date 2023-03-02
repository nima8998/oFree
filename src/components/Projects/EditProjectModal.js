import { StyleSheet, Text, Modal, View } from 'react-native'
import CustomButton from '../Elements/CustomButton'
import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider'
import Colors from '../Constants/Colors'

const EditProjectModal = () => {
    
    const {
        currentProject, 
        editProjectModal,
        setEditProjectModal,
        deleteProject
    } = useCommonContext();

  return (
    <Modal animationType="fade" transparent={true} visible={editProjectModal} onRequestClose={setEditProjectModal}>
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
                    />
                    <CustomButton
                        onPress={setEditProjectModal}
                        text="LISTO"
                    />
                </View>
            </View>
        </View>
    </Modal>
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
        borderColor: Colors.primaryBlue, 
        paddingHorizontal: 15,
    }
})