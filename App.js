import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import Navigator from './src/components/Navigator/Navigator';
import { CommonContextProvider } from './src/Context/CommonContextProvider';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import Store from './src/Store';

import { useFonts } from 'expo-font';
import { init_user_profile_data, init_user_work_time, init_local_settings } from './db';

import * as SplashScreen from 'expo-splash-screen';
import { UserContextProvider } from './src/Context/UserContextProvider';
import ContainerNavigator from './src/components/Navigator/ContainerNavigator';

// inicializo tablas de sqlite
init_local_settings()
  .then(() => console.log('init_local_settings initialized.'))
  .catch((err) => {
    console.log('init_local_settings init failed.');
    console.log(err.message);
  })

init_user_profile_data()
  .then(() => console.log('user_profile_data initialized.'))
  .catch((err) => {
    console.log('user_profile_data init failed.');
    console.log(err.message);
  })

init_user_work_time()
  .then(() => console.log('user_work_time initialized.'))
  .catch((err) => {
    console.log('user_work_time init failed.');
    console.log(err.message);
  })

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require("./src/Font/Montserrat-Regular.ttf"),
    'Montserrat-SemiBold': require("./src/Font/Montserrat-SemiBold.ttf"),
    'Montserrat-Medium': require("./src/Font/Montserrat-Medium.ttf"),
  })

  React.useEffect(() => {
    fontsLoaded && SplashScreen.hideAsync();
  }, [fontsLoaded])

  if (!fontsLoaded) return null;

  return (
    <Provider store={Store}>
      <UserContextProvider>
        <CommonContextProvider>
          <NativeBaseProvider>
            <StatusBar translucent />
            <ContainerNavigator/>
            {/* <Navigator /> */}
          </NativeBaseProvider>
        </CommonContextProvider>
      </UserContextProvider>
    </Provider>
  );
}
