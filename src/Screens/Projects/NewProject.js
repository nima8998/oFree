import { StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import { CustomInput, CustomButton } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../components/Constants/Colors';
import { useCommonContext } from '../../Context/CommonContextProvider';


const NewProject = () => {
    const [projectName, setProjectName] = React.useState('');
    const [projectClient, setProjectClient] = React.useState('');
    const [projectType, setProjectType] = React.useState('fijo');
    const {projects, setProjects} = useCommonContext();

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
        <View style={styles.container}>
            <View style={styles.body}>
                <CustomInput
                    placeholder="Nombre del proyecto"
                    action={(name) => setProjectName(name)}
                    otherStyles={styles.inputs}
                />
                <CustomInput
                    placeholder="Cliente"
                    action={(desc) => setProjectClient(desc)}
                    otherStyles={styles.inputs}
                />
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
    )
}

export default NewProject

const styles = StyleSheet.create({
    container: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
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
    }
})