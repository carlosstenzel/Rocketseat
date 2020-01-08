import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
  createStackNavigator({
    Main: {
      screen: Main,
    },
    User: {
      screen: User,
    },
  }),
);

export default Routes;
