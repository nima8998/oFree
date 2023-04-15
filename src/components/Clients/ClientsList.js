import {  StyleSheet, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import ClientListItem from './ClientListItem'
import CustomText from '../Elements/CustomText'
import { useDispatch, useSelector } from 'react-redux';
import { getClients } from '../../Store/Actions/clients.action';
import onRefresh from '../../Utils/refresh'

const List = () => {
  const dispatch = useDispatch();
  const clients = useSelector(({clients})=>clients.list)
  const {userId} = useSelector(({auth})=>auth)
  const [refreshing, setRefreshing] = React.useState(false);

  React.useEffect(()=>{
    dispatch(getClients(userId))
  },[refreshing])

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
        {
          clients.length > 0 ?
            clients.map((item, index)=><ClientListItem data={item} key={index}/>) :
            <CustomText textValue={"No hay clientes creados"}/>
        }
    </ScrollView>
  )
}

export default List

const styles = StyleSheet.create({
  container:{
    flex: 1,
    width: "90%",
    paddingHorizontal: 35,
    paddingTop: 20,
  },
})