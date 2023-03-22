import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { CustomInput, CustomButton, CustomDropdown } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../Constants/Colors';
import ColorNames from '../../Constants/ColorNames';
import { useCommonContext } from '../../Context/CommonContextProvider';
import { useSelector } from 'react-redux';

const NewProject = () => {
    const clientsList = useSelector(({clientsList})=>clientsList.clientsList);
    const [projectName, setProjectName] = React.useState('');
    const [projectClient, setProjectClient] = React.useState('');
    const [projectType, setProjectType] = React.useState('fijo');
    const {projects, setProjects} = useCommonContext();
    const [colorName, setColorName] = React.useState('');

    const addProject = () => {
        if (projectName === '') return;
        const newProject = {
            id: projects.length + 1,
            name: projectName,
            client: projectClient,
            projectType: projectType
        }
        setProjects(prev => [...prev, newProject]);
        setProjectName('');
        setProjectClient('');
    }


    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <CustomInput
                        placeholder="Nombre del proyecto"
                        action={(name) => setProjectName(name)}
                        otherStyles={styles.inputs}
                    />
                    <CustomDropdown data={clientsList} action={setProjectClient} placeholder="Seleccionar cliente" value={projectClient}/>
                    
                    <View style={styles.colorPicker}>
                        {
                            ColorNames.map(({id, color})=>(
                                <Pressable key={id} style={[styles.colorItem, {backgroundColor: color, borderWidth: colorName === color ? 1 : 0, opacity: colorName === color ? 1 : 0.5}]} onPress={()=>setColorName(color)}/>
                            ))
                        }
                    </View>

                </View>
                <CustomText textValue={"Tipo de proyecto"} otherStyles={{ fontSize: 12, marginVertical: 10 }} />
                <View style={styles.eventType}>
                    <Pressable onPress={()=>setProjectType('fijo')}>
                        <CustomText otherStyles={[styles.labels, projectType === "fijo" && styles.activeLabel]} textValue={"Fijo"} fontType="medium" />
                    </Pressable>
                    <Pressable onPress={()=>setProjectType('eventual')}>
                        <CustomText otherStyles={[styles.labels, projectType === "eventual" && styles.activeLabel]} textValue={"Eventual"} fontType="medium" />
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <CustomButton
                        onPress={addProject}
                        text="GUARDAR"
                    />
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

export default NewProject

const styles = StyleSheet.create({
    container: {
        padding: 25,
        alignItems: 'center',
        width: "100%"
    },
    body: {
        marginVertical: 15,
        width: "100%",
        alignItems: 'center'
    },
    eventType: {
        flexDirection: 'row',
        width: "50%",
        justifyContent: 'space-around',
    },
    inputs: {
        width: "65%",
        textAlign: 'center',
        marginVertical: 10,
    },
    labels:{
        borderBottomWidth: 2, 
        textAlign: "center",
        paddingHorizontal: 15,
        paddingBottom: 5
    },
    activeLabel:{
        color: Colors.primaryBlue,
        borderBottomColor: Colors.primaryBlue
    },
    footer: {
        marginVertical: 50
    },
    colorPicker:{
        flexDirection: 'row',
        marginVertical: 15,
        borderBottomWidth: 1,
        paddingVertical: 5,
        borderBottomColor:  '#ccc',
    },
    colorItem:{
        padding: 10, 
        borderRadius: 5,
        marginHorizontal: 3,
        borderColor: Colors.secondaryBlue
    }
})