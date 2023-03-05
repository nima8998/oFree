import React from "react";

export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
	const [newProjectModal, setNewProjectModal] = React.useState(false);

	const [projects, setProjects] = React.useState([]);


	const [isListVisible, setIsListVisible] = React.useState(false);

	const [step, setStep] = React.useState(1);
	const [isTutorialActive, setIsTutorialActive] = React.useState(true);

	const [currentView, setCurrentView] = React.useState("home");

	// hardcode para manejar el 'enrutado'
	const handleView = view =>{
		setCurrentView(view);
		setIsListVisible(false);
	}

	const deleteProject = (id) =>{
		const filteredList = projects.filter(element => element.id !== id)
		setProjects(filteredList);
	}

	const MemorizedContext = React.useMemo(()=>({
		newProjectModal, setNewProjectModal,
		projects, setProjects,
		isListVisible, setIsListVisible,
		isTutorialActive, setIsTutorialActive,
		step, setStep,
		deleteProject,
		currentView,
		handleView
	}), [
			newProjectModal,
			projects,
			isListVisible,
			isTutorialActive,
			step,
			currentView
		])

	return (
		<CommonContext.Provider
			value={MemorizedContext}
		>
			{children}
		</CommonContext.Provider>
	);
};