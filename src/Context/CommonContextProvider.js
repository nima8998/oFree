import React from "react";
import { getSettingValue, updateDbfieldSettings } from "../../db";
export let CommonContext = React.createContext();
export const useCommonContext = () => React.useContext(CommonContext);

export let CommonContextProvider = ({ children }) => {
  const [isListVisible, setIsListVisible] = React.useState(false);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [reusltData, setResultData] = React.useState();

  const [step, setStep] = React.useState(1);

  const [showTutorial, setShowTutorial] = React.useState();

  React.useEffect(()=>{
    getSettingValue('tutorial')
      .then(data => {
        const res = Boolean(data.rows._array[0]['tutorial'])
        setShowTutorial(res)
      })
      .catch(err => console.log(err))
  },[])

  const handleTutorial = () =>{
    updateDbfieldSettings('tutorial', 'false')
      .then((data)=>{
        setShowTutorial(false);
      })
      .catch((error)=>console.log(error))
  }


  return (
    <CommonContext.Provider
      value={{
        isListVisible, setIsListVisible,
        isModalVisible, setIsModalVisible,
        reusltData, setResultData,
        step, setStep,
        showTutorial, setShowTutorial,
        handleTutorial
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};