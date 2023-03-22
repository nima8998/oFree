import React from "react";

export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
	const [projects, setProjects] = React.useState([]);
	const [tasksList, setTasksList] = React.useState([]);
	const [clientsList, setClientsList] = React.useState([]);

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

	const addNewClient = async (clientData) =>{
		return await new Promise((resolve, reject) =>{
			try {
				setClientsList(prev=>[...prev, clientData])
				setTimeout(() => {
					resolve({status: 200, message: "Cliente agregado!"})
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
		addNewTask,
		addNewClient
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