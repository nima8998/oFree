import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButton, CustomInput, ModalMessage, CustomDropdown } from '../../components'
import CustomText from '../../components/Elements/CustomText';
import Colors from '../../Constants/Colors';
import { useSelector } from 'react-redux';
import { ColorsNames } from '../../Constants/ColorNames'
import { useDispatch } from 'react-redux';
import { createProject } from '../../Store/Actions/projects.action';
import { getClients } from '../../Store/Actions/clients.action';
import { useCommonContext } from '../../Context/CommonContextProvider';
import { useNavigation } from '@react-navigation/native';

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

const NewProject = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { setIsModalVisible, isModalVisible } = useCommonContext();
  
  const {list} = useSelector(({clients})=>clients);
  const {userId} = useSelector(({auth})=>auth)

  const [reusltData, setReusltData] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);

  const [projectType, setProjectType] = React.useState('fijo');
  const [colorName, setColorName] = React.useState();

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      name: "",
      client: "",
    },
    inputValidities: {
      name: false,
      client: false,
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


  React.useEffect(() => {
    dispatch(getClients())
  }, [])



  const addProject = () => {
    const newProject = {
      name: formState.inputValues.name,
      client: formState.inputValues.client,
      colorName: colorName,
      projectType: projectType,
      userOwner: userId,
    }
    dispatch(createProject(newProject))
      .then((res) => {
        setReusltData(res.message)
        setIsModalVisible(true);
      })
      .catch((error) => {
        setReusltData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.goBack();
        }, 2000)
        setIsLoading(false);
      })
  }


  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.body}>

          <CustomInput
            placeholder="Nombre del proyecto"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            id="name"
            initialValue={formState.inputValues.name}
            initiallyValid={formState.inputValidities.name}
          />

          <CustomDropdown
            data={list}
            onDropdownChange={handleInputChange}
            placeholder="Seleccionar cliente"
            id="client"
            initialValue={formState.inputValues.client}
            initiallyValid={formState.inputValidities.client}
          />

          <View style={styles.colorPicker}>
            {
              ColorsNames.map(({ id, color }) => (
                <Pressable
                  key={id}
                  style={[
                    styles.colorItem,
                    { backgroundColor: color, opacity: colorName === color ? 1 : 0.5 }
                  ]}
                  onPress={() => setColorName(color)}
                />
              ))
            }
          </View>

        </View>

        <CustomText textValue={"Tipo de proyecto"} otherStyles={{ fontSize: 12, marginVertical: 10 }} />
        <View style={styles.eventType}>
          <Pressable onPress={() => setProjectType('fijo')}>
            <CustomText
              otherStyles={[styles.labels, projectType === "fijo" && styles.activeLabel]}
              textValue={"Fijo"}
              fontType="medium"
            />
          </Pressable>
          <Pressable onPress={() => setProjectType('eventual')}>
            <CustomText
              otherStyles={[styles.labels, projectType === "eventual" && styles.activeLabel]}
              textValue={"Eventual"}
              fontType="medium"
            />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <CustomButton
            onPress={addProject}
            text="GUARDAR"
          />
        </View>

        {isModalVisible && <ModalMessage data={reusltData} />}
        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default NewProject

const styles = StyleSheet.create({
  container: {
    padding: 25,
    alignItems: 'center',
    width: "100%"
  },
  body: {
    marginVertical: 15,
    width: "100%",
    alignItems: 'center'
  },
  eventType: {
    flexDirection: 'row',
    width: "50%",
    justifyContent: 'space-around',
  },
  inputs: {
    width: "65%",
    textAlign: 'center',
    marginVertical: 10,
  },
  labels: {
    borderBottomWidth: 2,
    textAlign: "center",
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  activeLabel: {
    color: Colors.primaryBlue,
    borderBottomColor: Colors.primaryBlue
  },
  footer: {
    marginVertical: 50
  },
  colorPicker: {
    flexDirection: 'row',
    marginVertical: 15,
    borderBottomWidth: 1,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
  },
  colorItem: {
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 3,
    borderColor: Colors.secondaryBlue
  }
})