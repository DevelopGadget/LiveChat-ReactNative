import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Login from './Src/Components/Login';
import { Spinner } from 'native-base';

export default class App extends React.Component {

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ Load: true })
  }

  render() {
    return (<Navigation />);
  }
}

const Navigation = createStackNavigator({
  Login: { screen: Login, navigationOptions: () => ({ header: null }) }
})
