import React from 'react'
import { StyleSheet, View } from 'react-native'
import { TasksList, ButtonActions } from '../../components';

import AddNewProjectModal from '../../components/Projects/AddNewProjectModal'
import EditProjectModal from '../../components/Projects/EditProjectModal';
import { useCommonContext } from '../../Context/CommonContextProvider';
import Tutorial from '../Tutorial/Tutorial';

const Home = () => {
  const {isTutorialActive} = useCommonContext();

  return (
    <View style={styles.container}>
      {
        isTutorialActive ?
          <Tutorial/> :
          <>
            <TasksList />
            <AddNewProjectModal/>
            <EditProjectModal/>
            <ButtonActions />
          </>
      }
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        marginTop: 50,
        flex: 1,
    }
})