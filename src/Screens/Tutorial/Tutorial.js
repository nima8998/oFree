import {
  CustomButton,
} from "../../components/index"

import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useCommonContext } from "../../Context/CommonContextProvider"
import Colors from "../../Constants/Colors"
import CustomText from "../../components/Elements/CustomText"
import { updateDbfieldSettings } from "../../../db"
import { useSelector } from "react-redux"
import { useNavigation } from "@react-navigation/native"


const handleStep = (step) => {
  let value;
  if (step === 1) value = 'Con Ofree podés organizar tu semana y repartir en ella todas las tareas de tus proyectos.'
  if (step === 2) value = 'También podés agendar clientes, reuniones con ellxs y deadlines de los proyectos.'
  if (step === 3) value = '¡Podés configurar los avisos del día para no saltearte comidas ni trabajar de más!'
  return <CustomText textValue={value} otherStyles={styles.textStyle} />
}

export default function Tutorial() {
  const navigation = useNavigation();
  const { step, setStep, setShowTutorial, showTutorial, handleTutorial } = useCommonContext();
  const {userId} = useSelector(({auth})=>auth)

  const slideStep = e => {
    e.touchX - e.nativeEvent.pageX > 0 && step < 3 && setStep(step + 1)
    e.touchX - e.nativeEvent.pageX < 0 && step > 1 && setStep(step - 1)
  }

  const handleSkipTutorial = () =>{
    updateDbfieldSettings("tutorial", 'false')
      .then(_=>{
        // setShowTutorial(false);
        // console.log(showTutorial)
        handleTutorial();
      })
      .catch((error)=>{
        console.log(error)
      })
  }

  return (
    <View style={styles.container}
      onTouchStart={e => e.touchX = e.nativeEvent.pageX}
      onTouchEnd={e => { slideStep(e) }}>
      {handleStep(step)}
      <View style={styles.stepsContainer}>
        <View style={step === 1 ? styles.activeStep : styles.inactiveStep} />
        <View style={step === 2 ? styles.activeStep : styles.inactiveStep} />
        <View style={step === 3 ? styles.activeStep : styles.inactiveStep} />
      </View>
      <CustomButton
        text="Saltar"
        onPress={handleSkipTutorial}
      />
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  stepsContainer: {
    flexDirection: "row",
    marginVertical: 35
  },
  activeStep: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: Colors.primaryBlue,
    borderColor: Colors.primaryBlue,
    marginHorizontal: 5
  },
  inactiveStep: {
    width: 8,
    height: 8,
    borderRadius: 50,
    backgroundColor: "transparent",
    borderColor: Colors.primaryBlue,
    borderWidth: 1,
    marginHorizontal: 5
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
    color: Colors.primaryBlue,
    paddingHorizontal: 25
  }
})