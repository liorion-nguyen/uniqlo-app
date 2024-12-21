import { StyleSheet } from 'react-native';
import Root from './src/navigations/Root';
import { NativeBaseProvider } from 'native-base';
import appTheme from './src/theme';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StatusBar } from 'expo-status-bar';
import setupAxiosInterceptors from './src/config/axiosConfig';
import Toast from 'react-native-toast-message';

export default function App() {
  setupAxiosInterceptors(() => {});
  return (
    <NativeBaseProvider theme={appTheme}>
      <Provider store={store}>
        <StatusBar style="light" />
        <Root />
        <Toast />
      </Provider>
    </NativeBaseProvider>
  );
}