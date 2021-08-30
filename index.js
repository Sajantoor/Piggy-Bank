import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './src/app.json';

console.log('register');
AppRegistry.registerComponent(appName, () => App);