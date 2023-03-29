import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import {CustomButton, CustomInput, CustomText} from '../../components'
import React from 'react'
import { Keyboard } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp, login } from '../../Store/Actions/auth.action';

const Login = () => {
    const dispatch = useDispatch();
    const [user, setUser] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSignUp = () =>{
        if(user === '' && password === "") return
        dispatch(signUp(user, password))
    }

    const handleLogin = () =>{
        if(user === '' && password === "") return
        dispatch(login(user, password))
    }

  return (
    <TouchableWithoutFeedback onPress={()=>Keyboard.dismiss()}>
        <View style={styles.container}>
            <CustomInput otherStyles={styles.inputs} placeholder={"Email"} action={setUser}/>
            <CustomInput otherStyles={styles.inputs} placeholder={"Clave"} action={setPassword}/>
            <View style={styles.containerFooter}>
                <CustomButton text={'SIGN UP'} type='primary' onPress={handleSignUp}/>
                <CustomButton text={'LOGIN'} type='secondary' onPress={handleLogin}/>
            </View>
        </View>
    </TouchableWithoutFeedback>
  )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerFooter:{
        marginTop: 25,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputs:{
        marginVertical: 10,
    }
})