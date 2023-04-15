import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CustomText from '../../components/Elements/CustomText';
import { getUserData } from '../../Store/Actions/auth.action';
import { useSelector, useDispatch } from 'react-redux';

// console.log(data)
// if(userRegisterOk){
//     createUserDataLocal( data.localId, user)   
//     .then((res)=>{console.log("Local data saved with rowId", res.insertId)})
//     .catch((err)=>{console.log("Errr executing signUp auth.action", err)})
// }

const Home = ({
  navigation
}) => {
  const dispatch = useDispatch();
  const {token} = useSelector(({auth})=>auth)

  React.useEffect(()=>{
    dispatch(getUserData(token))
  },[])
  return (
    <View style={styles.container}>
      <CustomText textValue={"Home View"}/>
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