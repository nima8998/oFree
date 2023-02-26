import React from 'react'
import { View, Text, StyleSheet } from 'react-native'


export default function FirstStep() {
  return (
    <View>
      <Text style={styles.fontStyle}>
        También podés agendar clientes, reuniones con ellxs y deadlines de los proyectos.
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  fontStyle:{
    fontSize: 18,
    textAlign: "center",
    color: "#304FFE",
    paddingHorizontal: 25
  }
})