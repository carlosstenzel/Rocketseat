import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure({host: 'localhost', port: 8081})
    .useReactNative()
    .connect();
  console.tron = tron;
  tron.clear();
}
