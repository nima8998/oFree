import React from "react";
export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
	const [isListVisible, setIsListVisible] = React.useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState(false);

	const [step, setStep] = React.useState(1);
	const [isTutorialActive, setIsTutorialActive] = React.useState(true);

	// const deleteProject = (id) =>{
	// 	const filteredList = projects.filter(element => element.id !== id)
	// 	setProjects(filteredList);
	// }

	const MemorizedContext = React.useMemo(()=>({
		isListVisible, setIsListVisible,
		isTutorialActive, setIsTutorialActive,
		isModalVisible, setIsModalVisible,
		step, setStep,
	}), [
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