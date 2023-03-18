import React from "react";

export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
	const [projects, setProjects] = React.useState([]);
	const [tasksList, setTasksList] = React.useState([]);

	const [isListVisible, setIsListVisible] = React.useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const [step, setStep] = React.useState(1);
	const [isTutorialActive, setIsTutorialActive] = React.useState(true);

	const addNewTask = async (taskData) =>{
		return await new Promise((resolve, reject) =>{
			try {
				setTasksList(prev=>[...prev, taskData])
				setTimeout(() => {
					resolve({status: 200, message: "Tarea creada con exito!"})
				}, 500);
			} catch (error) {
				reject(error);
				throw error;
			}
		})
	}

	const deleteProject = (id) =>{
		const filteredList = projects.filter(element => element.id !== id)
		setProjects(filteredList);
	}

	const MemorizedContext = React.useMemo(()=>({
		projects, setProjects,
		tasksList, 
		isListVisible, setIsListVisible,
		isTutorialActive, setIsTutorialActive,
		isModalVisible, setIsModalVisible,
		step, setStep,
		deleteProject,
		addNewTask
	}), [
			projects,
			tasksList,
			isListVisible,
			isTutorialActive,
			isModalVisible,
			step,			
		])

	return (
		<CommonContext.Provider
			value={MemorizedContext}
		>
			{children}
		</CommonContext.Provider>
	);
};