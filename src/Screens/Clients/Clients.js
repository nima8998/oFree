import React from 'react'
import {  StyleSheet, ScrollView } from 'react-native'
import { ButtonActions, ClientsList, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';

const Clients = ({
  navigation,
}) => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)

  React.useEffect(()=>{
    dispatch(getClients())
  },[])


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <>
        <ProjectsNavbar navigation={navigation}/>
        <ClientsList data={clients} navigation={navigation}/>
        <ButtonActions navigation={navigation}/>
      </>
    </ScrollView>
  )
}

export default Clients

const styles = StyleSheet.create({
  container: {
        flex: 1,
    }
})