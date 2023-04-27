import { Keyboard, StyleSheet, TouchableWithoutFeedback, View, ActivityIndicator, Pressable, ScrollView, RefreshControl } from 'react-native'
import { CustomButton, CustomInput } from '../../components'
import React from 'react'
import { useCommonContext } from '../../Context/CommonContextProvider';
import Colors from '../../Constants/Colors';
import { Feather } from '@expo/vector-icons';
import onRefresh from '../../Utils/refresh';

import { useSelector, useDispatch } from 'react-redux';
import ProfileImageSelector from '../../components/Profile/ProfileImageSelector';
import { getUserData, updateUserData } from '../../Store/Actions/auth.action';

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const inputValues = {
      ...state.inputValues,
      [action.input]: action.value
    }
    const inputValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    }
    let formIsValid = true;
    for (const key in inputValidities) {
      formIsValid = formIsValid && inputValidities[key];
    }
    return {
      formIsValid,
      inputValidities,
      inputValues
    }
  }
  return state;
}

const Profile = () => {
  const dispatch = useDispatch();
  const {currentUser, token} = useSelector(({auth})=>auth)
  const { setIsModalVisible, setResultData } = useCommonContext();
  const [isLoading, setIsLoading] = React.useState(false);
  const [imageValue, setImageValue] = React.useState(null)
  const [refreshing, setRefreshing] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const executeRefresh = onRefresh(setRefreshing, 500);

  React.useEffect(()=>{
    dispatch(getUserData(token))
  },[token, refreshing])

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      name: currentUser?.displayName,
      mail: currentUser?.email,
      // password: currentUser?.passwordHash,
      profileImage: imageValue,
    },
    inputValidities: {
      name: false,
      mail: false,
      password: false,
      profileImage: false,
    }
  })

  const handleInputChange = React.useCallback((inputIdentifier, inputValue, inputValidity) => {
    dispatchFormState({
      type: FORM_INPUT_UPDATE,
      value: inputValue,
      isValid: inputValidity,
      input: inputIdentifier
    })
  }, [dispatchFormState])

  const handleUpdateUserData = async () => {
    setIsLoading(true);

    dispatch(updateUserData(token, formState.inputValues.name, imageValue, formState.inputValues.mail))
      .then((res) => {
        setResultData(res.message);
        setIsModalVisible(true);
        executeRefresh();
        dispatch(getUserData(token))
      })
      .catch((error) => {
        setResultData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
        }, 750);
        setIsLoading(false);
      })
  }

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh(setRefreshing, 500)}/>
      }  
    >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <TouchableWithoutFeedback>
            <View style={styles.imgHero}>
              <ProfileImageSelector onImage={image=>setImageValue(image)} defaultImage={currentUser?.photoUrl !== '' ? currentUser?.photoUrl : null}/>
            </View>
          </TouchableWithoutFeedback>

          <CustomInput
            placeholder="Nombre"
            id="name"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            initialValue={formState.inputValues.name}
            initiallyValid={formState.inputValidities.name}
          />

          <CustomInput
            placeholder="Mail"
            id="mail"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            initialValue={formState.inputValues.mail}
            initiallyValid={formState.inputValidities.mail}
            keyboardType='email-address'
            enable={false}
          />
          {/* se comenta para poder configurar la modificaciond de la clave */}
          {/* <View style={styles.inputGroup}>
            <CustomInput
              otherStyles={styles.inputs}
              placeholder={"Contraseña"}
              onInputChange={handleInputChange}
              id='password'
              initialValue={formState.inputValues.password}
              initiallyValid={formState.inputValidities.password}
              type={!show && 'password'}
              inputRightIcon={
                <Pressable onPress={() => setShow(!show)}>
                  <Feather name={show ? "eye" : "eye-off"} size={22} color="black" />
                </Pressable>
              }
            />
          </View> */}

          <CustomButton type='primary' text="GUARDAR" onPress={handleUpdateUserData} />
          {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
        </View>
      </TouchableWithoutFeedback>
    </ScrollView>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputs: {
    width: "65%",
    textAlign: 'center',
    marginVertical: 10,
  },
  imgHero: {
    borderBottomStartRadius: 15,
    borderBottomEndRadius: 15,
    height: 232,
    width: "100%",
  },
  inputGroup:{
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
})