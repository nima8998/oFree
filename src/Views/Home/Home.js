import React from 'react'
import { StyleSheet, View } from 'react-native'
import { AddNewTask, TasksList, ButtonActions } from '../../components';

import AddNewProjectModal from '../../components/Projects/AddNewProjectModal'
import EditProjectModal from '../../components/Projects/EditProjectModal';

const Home = () => {
  const [projectName, setProjectName] = React.useState('');
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = React.useState(false);
  const [projectDescription, setProjectDescription] = React.useState('');
  const [projects, setProjects] = React.useState([]);
  const [isListVisible, setIsListVisible] = React.useState(false);
  const [currentProject, setCurrentProject] = React.useState({});

    // React.useEffect(() => {
    //     console.log('projects',projects)
    // }, [projects])

  const addProject = () =>{
    if(projectName === '') return;
    const newProject = {
      id: projects.length+1,
      name: projectName,
      description: projectDescription,
      projectType: "Fijo"
    }
    setProjects(prev => [...prev, newProject]);
    setProjectName('');
    setProjectDescription('');
    setIsModalVisible(false);
    setIsListVisible(false);
  }

  const deleteProject = (id) =>{
    const filteredList = projects.filter(element => element.id !== id)
    setProjects(filteredList);
    setIsEditModalVisible(!isEditModalVisible);
  }

  const selectCurrentProject = (selectedProject) =>{
    setCurrentProject(selectedProject);
    setIsEditModalVisible(!isEditModalVisible);
  }

  return (
    <View style={styles.container}>
      <TasksList 
        projects={projects}
        setProjects={setProjects}
        deleteProject={deleteProject}
        selectCurrentProject={selectCurrentProject}
      />
      <AddNewProjectModal
        isModalVisible={isModalVisible}
        setIsModalVisible={()=>setIsModalVisible(!isModalVisible)}
        setProjectName={(name)=>setProjectName(name)}
        setProjectDescription={(desc)=>setProjectDescription(desc)}
        projectName={projectName}
        addProject={addProject}
      />
      <EditProjectModal
        isEditModalVisible={isEditModalVisible}
        setIsEditModalVisible={setIsEditModalVisible}
        currentProject={currentProject}
        deleteProject={deleteProject}
      />
      <ButtonActions 
        handleModal={()=>setIsModalVisible(!isModalVisible)}
        setIsListVisible={setIsListVisible}
        isListVisible={isListVisible}
      />
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 50,
        flex: 1,
    }
})