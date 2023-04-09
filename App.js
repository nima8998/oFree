import 'react-native-gesture-handler'
import React from 'react';
import { StatusBar } from 'react-native';
import Colors from './src/Constants/Colors';
import Navigator from './src/components/Navigator/Navigator';
import { CommonContextProvider } from './src/Context/CommonContextProvider';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux';
import Store from './src/Store';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
  const [fontsLoaded] = useFonts({
    'Montserrat-Regular': require("./src/Font/Montserrat-Regular.ttf"), 
    'Montserrat-SemiBold': require("./src/Font/Montserrat-SemiBold.ttf"), 
    'Montserrat-Medium': require("./src/Font/Montserrat-Medium.ttf"), 
  })

  React.useEffect(()=>{
    fontsLoaded && SplashScreen.hideAsync();
  }, [fontsLoaded])

  if(!fontsLoaded) return null

  return (
    <Provider store={Store}>
      <CommonContextProvider>
        <NativeBaseProvider>
          <StatusBar translucent/>
          <Navigator/>
        </NativeBaseProvider>
      </CommonContextProvider>
    </Provider>
  );
}
