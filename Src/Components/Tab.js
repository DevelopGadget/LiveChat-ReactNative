import Perfil from './Perfil';
import { createBottomTabNavigator } from 'react-navigation';
import { Footer, FooterTab, Button, Icon, Text } from 'native-base';

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
                    <Footer>
                        <FooterTab>
                            <Button vertical active={routeName == 'Mensajes'}>
                                <Icon type='' name='' color='#ffff'/>
                                <Text active={routeName == 'Mensajes'}>Mensajes</Text>
                            </Button>
                            <Button vertical active={routeName == 'Buscar'}>
                                <Icon type='' name='' color='#ffff'/>
                                <Text active={routeName == 'Buscar'}>Buscar</Text>
                            </Button>
                            <Button vertical active={routeName == 'Perfil'} onPress={() => props.navigation.navigate('Perfil')}>
                                <Icon type='' name='' color='#ffff'/>
                                <Text active={routeName == 'Perfil'}>Mensajes</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                );
            }
        })
    }
);