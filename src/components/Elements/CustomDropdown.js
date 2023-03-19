import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Select } from "native-base";

const CustomDropdown = ({
    data,
    action,
    clientSelected,
    placeholder = ""
}) => {
  return (
    <View style={styles.dropdown}>
      <Select 
        selectedValue={clientSelected} 
        minWidth="200" 
        accessibilityLabel={placeholder} 
        placeholder={placeholder} 
        onValueChange={itemValue => action(itemValue)}
      >
        {
          data.map(({id, value})=>(<Select.Item key={id} label={value} value={id}/>))
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