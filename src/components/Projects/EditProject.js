import { StyleSheet, View, Pressable, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native'
import React from 'react'
import { CustomButton, CustomInput, CustomDropdown } from '..'
import CustomText from '../Elements/CustomText';
import Colors from '../../Constants/Colors';
import { useSelector } from 'react-redux';
import { ColorsNames } from '../../Constants/ColorNames'
import { useDispatch } from 'react-redux';
import { updateProjectById, deleteProjectById } from '../../Store/Actions/projects.action';
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

const EditProject = ({
  project
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { setIsModalVisible, setResultData } = useCommonContext();
  const clientsList = useSelector(({ clients }) => clients.list);
  const { userId } = useSelector(({ auth }) => auth);

  const [isLoading, setIsLoading] = React.useState(false);
  const [isDisabledBtn, setIsDisabledBtn] = React.useState();

  const [projectType, setProjectType] = React.useState('fijo');
  const [colorName, setColorName] = React.useState();

  const [formState, dispatchFormState] = React.useReducer(formReducer, {
    inputValues: {
      name: project.name,
      client: project.client,
      projectType: project.projectType,
      colorName: project.colorName,
    },
    inputValidities: {
      name: false,
      client: false,
      projectType: true,
      colorName: true,
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
    dispatch(getClients(userId))
    setProjectType(project.projectType)
    setColorName(project.colorName)
  }, [])

  React.useEffect(() => {
    if (formState.inputValues.name === '')
      setIsDisabledBtn(true);
    else
      setIsDisabledBtn(false);
  }, [formState.inputValues.name])

  const updateProject = () => {
    const updatedProjectData = {
      name: formState.inputValues.name,
      client: formState.inputValues.client,
      colorName: colorName,
      projectType: projectType,
    }
    dispatch(updateProjectById(updatedProjectData, project.id))
      .then((res) => {
        setResultData(res.message)
        setIsModalVisible(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500)
      })
      .catch((error) => {
        setResultData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1500)
        setIsLoading(false);

      })
  }

  const deleteProject = () => {
    const { id } = project;

    dispatch(deleteProjectById(id))
      .then((res) => {
        setResultData(res.message)
        setIsModalVisible(true);
        setTimeout(() => {
          navigation.goBack();
        }, 1500)
      })
      .catch((error) => {
        setResultData(error.message)
        setIsModalVisible(true);
      })
      .finally(() => {
        setTimeout(() => {
          setIsModalVisible(false);
        }, 1500)
        setIsLoading(false);

      })
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>

        <View style={styles.body}>

          <CustomInput
            placeholder="Nombre del proyecto *"
            onInputChange={handleInputChange}
            otherStyles={styles.inputs}
            id="name"
            initialValue={formState.inputValues.name}
            initiallyValid={formState.inputValidities.name}
            required={true}
            errorValue={"Ingrese el nombre del proyecto"}
          />

          <CustomDropdown
            data={clientsList}
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
                    { backgroundColor: color, opacity: colorName === color ? 1 : 0.3 }
                  ]}
                  onPress={() => setColorName(color)}
                />
              ))
            }
          </View>

        </View>

        <CustomText textValue={"Tipo de proyecto"} otherStyles={{ fontSize: 12, marginVertical: 10 }} />
        <View style={styles.eventType}>
          <Pressable onPress={() => setProjectType('fijo')} style={projectType === "fijo" && styles.activeLabel}>
            <CustomText
              otherStyles={[styles.labels, projectType === "fijo" && styles.activeColor]}
              textValue={"Fijo"}
              fontType="medium"
            />
          </Pressable>
          <Pressable onPress={() => setProjectType('eventual')} style={projectType === "eventual" && styles.activeLabel}>
            <CustomText
              otherStyles={[styles.labels, projectType === "eventual" && styles.activeColor]}
              textValue={"Eventual"}
              fontType="medium"
            />
          </Pressable>
        </View>

        <View style={styles.footer}>
          <CustomButton
            onPress={deleteProject}
            text="ELIMINAR"
            disabled={isDisabledBtn}
            type='warning'
          />
          <CustomButton
            onPress={updateProject}
            text="GUARDAR"
            disabled={isDisabledBtn}
          />
        </View>

        {isLoading && <ActivityIndicator animating={true} size="large" color={Colors.primaryBlue} />}
      </View>
    </TouchableWithoutFeedback>
  )
}

export default EditProject

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
    textAlign: "center",
    paddingHorizontal: 15,
    paddingBottom: 5
  },
  activeLabel: {
    borderBottomColor: Colors.primaryBlue,
    borderBottomWidth: 2
  },
  activeColor: {
    color: Colors.primaryBlue,
  },
  footer: {
    marginVertical: 50,
    flexDirection: 'row',
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
  }
})