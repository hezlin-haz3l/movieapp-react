import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './components/Home';
import Detail from './components/Detail';

const screens = {
    Home: {
        screen: Home
    },
    Detail: {
        screen: Detail
    }
}

const homeStack = createStackNavigator(screens);
export default createAppContainer(homeStack);

