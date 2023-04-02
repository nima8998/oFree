import React from 'react'
import {  StyleSheet, ScrollView, RefreshControl } from 'react-native'
import { ButtonActions, ClientsList, ProjectsNavbar,  } from '../../components';
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';

const Clients = () => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getClients())
  },[refreshing])

  const onRefresh = React.useCallback(()=>{
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  })

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
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