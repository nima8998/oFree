import { StyleSheet, FlatList, View} from 'react-native'
import React from 'react'
import ListItem from './ListItem'

const List = ({
  data
}) => {
  return (
    <View>
      <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({item}) => 
            <ListItem 
              projectInfo={item} 
            />
          }
          contentContainerStyle={styles.container}
      />

    </View>
  )
}

export default List

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
    }
})