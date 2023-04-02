import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText';
import { useSelector, useDispatch } from 'react-redux';
import { getProjectById } from '../../Store/Actions/projects.action';
import { EditProject } from '../../components';


const EditProjectContainer = ({ route }) => {
  const currentProjectId = route.params.id;
  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  const selectedProjectData = useSelector(({ projects }) => projects.selectedProject);

  React.useEffect(() => {
    dispatch(getProjectById(currentProjectId));
    selectedProjectData &&
      setIsReady(true);
  }, [currentProjectId, selectedProjectData]);

  return (
    <View style={styles.container}>
      { 
        isReady && selectedProjectData ? 
         <EditProject project={selectedProjectData}/> : 
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
