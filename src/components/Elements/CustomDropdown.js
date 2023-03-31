import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Select } from "native-base";

const CustomDropdown = ({
    data,
    action,
    defaultValue,
    placeholder = ""
}) => {

  return (
    <View style={styles.dropdown}>
      <Select 
        selectedValue={defaultValue} 
        minWidth="200" 
        accessibilityLabel={placeholder} 
        placeholder={data.length > 0 ? placeholder : "No hay registros"} 
        onValueChange={itemValue => action(itemValue)}
      >
        {
          data.length > 0 &&
          data.map(({id, name})=>(<Select.Item key={id} label={name} value={id} />))
        }
      </Select>
  </View>
  )
}

export default CustomDropdown

const styles = StyleSheet.create({
  dropdown:{
    marginTop: 20,
  },
  dropdownContent: {
    flexDirection: "column",
    borderWidth: 1,
    borderColor: "#dadada",
    borderRadius: 3,
    maxHeight: 150,
    width: "38%",
  },
  dropdownItem: {
    color: '#000',
    fontSize: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 4,
    borderRadius: 3,
  }
})