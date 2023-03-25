import React from 'react'
import {  StyleSheet, View } from 'react-native'
import { ButtonActions, List, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';

const Projects = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)

  React.useEffect(()=>{
    dispatch(getClients())
  },[])

  return (
    <View style={styles.container}>
      <ProjectsNavbar navigation={navigation}/>
      <List data={clients}/>
      <ButtonActions navigation={navigation}/>
    </View>
  )
}

export default Projects

const styles = StyleSheet.create({
  container: {
        flex: 1,
    }
})