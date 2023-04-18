import React from 'react'
import { StyleSheet, View } from 'react-native'
import {Counter} from "../../components"
import { useSelector, useDispatch } from 'react-redux';
import { getUserData } from '../../Store/Actions/auth.action';

const Home = ({
  navigation
}) => {
	const dispatch = useDispatch();
	const {token} = useSelector(({ auth }) => auth)

  React.useEffect(()=>{
    dispatch(getUserData(token))
  },[])

  return (
    <View style={styles.container}>
      <Counter/>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20,
        flex: 1,
    }
})