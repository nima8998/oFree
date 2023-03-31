import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButton, CustomInput, ModalMessage, CustomDropdown } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../Constants/Colors';
import { useSelector } from 'react-redux';
import {ColorsNames} from '../../Constants/ColorNames'
import { useDispatch } from 'react-redux';
import { createProject, getProjectById } from '../../Store/Actions/projects.action';
import { getClients } from '../../Store/Actions/clients.action';
import { useCommonContext } from '../../Context/CommonContextProvider';

const NewProject = ({
    route
}) => {
    const dispatch = useDispatch();
    const {setIsModalVisible, isModalVisible} = useCommonContext();
    const clientsList = useSelector(({clients})=>clients.list);
    const selectedProject = useSelector(({projects})=>projects.selectedProject);
    const [currentProject, setcurrentProject] = React.useState();

    const [reusltData, setReusltData] = React.useState();
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [projectName, setProjectName] = React.useState('');
    const [projectClient, setProjectClient] = React.useState('');
    const [projectType, setProjectType] = React.useState('fijo');
    const [colorName, setColorName] = React.useState();
    
    
    React.useEffect(()=>{
      dispatch(getClients())
    },[])
    
    React.useEffect(()=>{
        if (route.params?.id){
            dispatch(getProjectById(route.params?.id))
            setcurrentProject(selectedProject)
            setColorName(currentProject?.colorName)
            setProjectType(currentProject?.projectType)
        }
    },[currentProject])


    const addProject = () => {
        if (projectName === '') return;
        const newProject = {
            name: projectName,
            client: projectClient,
            colorName,
            projectType: projectType,
        }

        if(projectName != '')
            dispatch(createProject(newProject))
                .then((res)=>{
                    setReusltData(res.message)
                    setIsModalVisible(true);
                })
                .catch((error)=>{
                    setReusltData(error.message)
                    setIsModalVisible(true);
                })
                .finally(()=>{
                    setTimeout(()=>{
                        setIsModalVisible(false);
                    }, 2000)
                    setIsLoading(false);
                })
    }


    return (
        <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.body}>
                    <CustomInput
                        placeholder="Nombre del proyecto"
                        action={(name) => setProjectName(name)}
                        otherStyles={styles.inputs}
                        defaultValue={currentProject?.name}
                    />
                    <CustomDropdown 
                        data={clientsList} 
                        action={setProjectClient} 
                        placeholder="Seleccionar cliente" 
                        defaultValue={currentProject?.client}
                    />

                    <View style={styles.colorPicker}>
                        {
                            ColorsNames.map(({id, color})=>(
                                <Pressable 
                                    key={id} 
                                    style={[styles.colorItem, {backgroundColor: color, borderWidth: colorName === color ? 1 : 0, opacity: colorName === color ? 1 : 0.5}]} 
                                    onPress={()=>setColorName(color)}
                                />
                            ))
                        }
                    </View>

                </View>
                <CustomText textValue={"Tipo de proyecto"} otherStyles={{ fontSize: 12, marginVertical: 10 }} />
                <View style={styles.eventType}>
                    <Pressable onPress={()=>setProjectType('fijo')}>
                        <CustomText 
                            otherStyles={[styles.labels, projectType === "fijo" && styles.activeLabel]} 
                            textValue={"Fijo"} 
                            fontType="medium" 
                        />
                    </Pressable>
                    <Pressable onPress={()=>setProjectType('eventual')}>
                        <CustomText 
                            otherStyles={[styles.labels, projectType === "eventual" && styles.activeLabel]} 
                            textValue={"Eventual"} 
                            fontType="medium" 
                        />
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    <CustomButton
                        onPress={addProject}
                        text="GUARDAR"
                    />
                </View>
                {isModalVisible && <ModalMessage data={reusltData}/>}
                {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue}/>}
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