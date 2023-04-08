import React from 'react'
import {  StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { ButtonActions, ClientsList, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';
import onRefresh from '../../Utils/refresh'

const Clients = () => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getClients())
  },[refreshing])


  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
      <>
        <ProjectsNavbar/>
        <ClientsList data={clients}/>
        <ButtonActions/>
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