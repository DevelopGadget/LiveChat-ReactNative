import React from 'react';
import Perfil from './Perfil';
import { createBottomTabNavigator } from 'react-navigation';
import { Footer, FooterTab, Button, Icon, Text, StyleProvider, getTheme } from 'native-base';
import EstiloTab from '../Css/EstiloTab';

export default Tabs = createBottomTabNavigator({
    Perfil: { screen: Perfil }
},
    {
        tabBarPosition: 'bottom',
        swipeEnabled: true,
        navigationOptions: ({ navigation }) => ({
            tabBarComponent: (props) => {
                const { routeName } = navigation.state;
                return (
                    <StyleProvider style={getTheme(EstiloTab)}>
                        <Footer>
                            <FooterTab>
                                <Button active={routeName == 'Mensajes'}>
                                    <Icon type='Entypo' name='message' />
                                </Button>
                                <Button active={routeName == 'Buscar'}>
                                    <Icon type='FontAwesome' name='search' />
                                </Button>
                                <Button active={routeName == 'Perfil'} onPress={() => props.navigation.navigate('Perfil')}>
                                    <Icon type='FontAwesome' name='user' />
                                </Button>
                            </FooterTab>
                        </Footer>
                    </StyleProvider>
                );
            }
        })
    }
);