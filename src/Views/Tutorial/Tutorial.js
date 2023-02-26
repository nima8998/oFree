import {
    FirstStep,
    SecondStep,
    ThirdStep
  } from "../../components/index"

import { View, StyleSheet } from 'react-native'
import React from 'react'

export default function Tutorial({step, setStep}) {

  return (
    <View style={styles.container} 
        onTouchStart={e=> e.touchX = e.nativeEvent.pageX}
        onTouchEnd={e => {
            e.touchX - e.nativeEvent.pageX > 5 && step < 3  && setStep(step + 1)
            e.touchX - e.nativeEvent.pageX < 5 && step > 1 && setStep(step - 1)
        }}
    >
        {
            step === 1 ?
                <FirstStep/> :
            step === 2 ?
                <SecondStep/> :
            step === 3 &&
                <ThirdStep/>
        }
        <View style={styles.stepsContainer}>
            <View style={step === 1 ? styles.activeStep : styles.inactiveStep}/>
            <View style={step === 2 ? styles.activeStep : styles.inactiveStep}/>
            <View style={step === 3 ? styles.activeStep : styles.inactiveStep}/>
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    stepsContainer:{
        flexDirection: "row",
        marginVertical: 35
    },
    activeStep: {
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: "#304FFE",
        borderColor: "#304FFE",
        marginHorizontal: 5
    },
    inactiveStep: {
        width: 8,
        height: 8,
        borderRadius: 50,
        backgroundColor: "transparent",
        borderColor: "#304FFE",
        borderWidth: 1,
        marginHorizontal: 5
    }
})