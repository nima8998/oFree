import React from "react";

export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
	const [newProjectModal, setNewProjectModal] = React.useState(false);
	const [editProjectModal, setEditProjectModal] = React.useState(false);

	const [projects, setProjects] = React.useState([]);
	const [projectName, setProjectName] = React.useState('');
	const [projectDescription, setProjectDescription] = React.useState('');

	const [isListVisible, setIsListVisible] = React.useState(false);
	const [currentProject, setCurrentProject] = React.useState({});

	const [step, setStep] = React.useState(1);
	const [isTutorialActive, setIsTutorialActive] = React.useState(true);
  

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
		setNewProjectModal(false);
		setIsListVisible(false);
	}

	const deleteProject = (id) =>{
		const filteredList = projects.filter(element => element.id !== id)
		setProjects(filteredList);
		setEditProjectModal(!editProjectModal);
	}

	const editCurrentProject = (id) =>{
		const selectedProject = projects.find(element => element.id === id)
		setCurrentProject(selectedProject);
		setEditProjectModal(true);
	}

	const MemorizedContext = React.useMemo(()=>({
		newProjectModal, setNewProjectModal,
		editProjectModal, setEditProjectModal,
		projectName, setProjectName,
		projectDescription, setProjectDescription,
		projects, setProjects,
		isListVisible, setIsListVisible,
		currentProject, setCurrentProject,
		isTutorialActive, setIsTutorialActive,
		step, setStep,
		addProject,
		deleteProject,
		editCurrentProject
	}), [
			newProjectModal,
			editProjectModal,
			projectName,
			projectDescription,
			projects,
			isListVisible,
			currentProject,
			isTutorialActive,
			step
		])

	return (
		<CommonContext.Provider
			value={MemorizedContext}
		>
			{children}
		</CommonContext.Provider>
	);
};