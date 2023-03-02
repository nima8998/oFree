import { StyleSheet, Text, View, Modal, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React from 'react'
import {CustomInput, CustomButton} from '../'

import { useCommonContext } from '../../Context/CommonContextProvider';

const AddNewProjectModal = () => {
    const {	
        newProjectModal, 
        setNewProjectModal, 
        setProjectName,
        setProjectDescription,
        addProject,
      } = useCommonContext()
  return (
    <TouchableWithoutFeedback onPress={() => { 
        Keyboard.dismiss()
      }}>
        <Modal animationType="fade" transparent={true} visible={newProjectModal} onRequestClose={setNewProjectModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modal}>
                    <View>
                        <Text style={styles.modalTitle}>Agregar nuevo proyecto.</Text>
                    </View>
                    <View style={styles.modalBody}>
                        <CustomInput 
                            placeholder="Nombre del proyecto"
                            action={(name)=>setProjectName(name)}
                        />
                        <TextInput
                            placeholder='Descripcion'
                            onChangeText={(desc)=>setProjectDescription(desc)}
                            multiline={true}
                            numberOfLines={4}
                        />

                    </View>
                    <View style={styles.modalFooter}>
                        <CustomButton
                            onPress={setNewProjectModal}
                            text="CANCELAR"
                        />
                        <CustomButton
                            onPress={addProject}
                            text="GUARDAR"
                        />
                    </View>
                </View>
            </View>
        </Modal>
    </TouchableWithoutFeedback>
  )
}

export default AddNewProjectModal

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
    }
})