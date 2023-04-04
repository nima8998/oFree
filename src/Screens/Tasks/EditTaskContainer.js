import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText';
import { useSelector, useDispatch } from 'react-redux';
import { getTaskById } from '../../Store/Actions/tasks.action';
import EditTask from '../../components/Tasks/EditTask';


const EditProjectContainer = ({ route }) => {
  const currentTaskId = route.params.id;
  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  const selectedTaskData = useSelector(({ tasks }) => tasks.selectedTask);

  React.useEffect(() => {
    dispatch(getTaskById(currentTaskId));
    selectedTaskData &&
      setIsReady(true);
  }, [currentTaskId, selectedTaskData]);

  return (
    <View style={styles.container}>
      { 
        isReady && selectedTaskData ? 
         <EditTask task={selectedTaskData}/> : 
          <CustomText textValue="Cargando..."/>
      }
    </View>
  );
};

export default EditProjectContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
