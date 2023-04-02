import { StyleSheet, View} from 'react-native'
import React from 'react'
import CustomText from '../../components/Elements/CustomText';
import { useSelector, useDispatch } from 'react-redux';
import { getClientById } from '../../Store/Actions/clients.action';
import { EditClient } from '../../components';


const EditClientContainer = ({ route }) => {
  const selectedClient = route.params.id;
  const dispatch = useDispatch();
  const [isReady, setIsReady] = React.useState(false);
  const selectedClientData = useSelector(({ clients }) => clients.selectedClient);

  React.useEffect(() => {
    dispatch(getClientById(selectedClient));
    selectedClientData &&
      setIsReady(true);
  }, [selectedClient, selectedClientData]);

  return (
    <View style={styles.container}>
      { 
        isReady && selectedClientData ? 
         <EditClient client={selectedClientData}/> : 
          <CustomText textValue="Cargando..."/>
      }
    </View>
  );
};

export default EditClientContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
