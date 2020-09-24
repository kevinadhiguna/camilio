/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// For Debugging
import Reactotron from 'reactotron-react-native';

import App from './src/App';
import {name as appName} from './app.json';

// For Debugging
Reactotron.setAsyncStorageHandler(AsyncStorage)
	.configure()
	.useReactNative()
	.connect();

AppRegistry.registerComponent(appName, () => App);
