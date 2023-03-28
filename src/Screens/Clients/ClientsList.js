import React from 'react'
import {  StyleSheet, ScrollView } from 'react-native'
import { ButtonActions, List, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';

const Projects = ({
  navigation,
  route
}) => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)

  React.useEffect(()=>{
    dispatch(getClients())
  },[route])


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <ProjectsNavbar navigation={navigation}/>
        <List data={clients} navigation={navigation}/>
        <ButtonActions navigation={navigation}/>
      </>
    </ScrollView>
  )
}

export default Projects

const styles = StyleSheet.create({
  container: {
        flex: 1,
    }
})