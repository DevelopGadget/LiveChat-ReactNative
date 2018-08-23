import React from 'react';
import { Container, Form, Item, Input, Label, Content, Icon } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';

export default class Login extends React.Component {
    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <Content contentContainerStyle={[Estilos.Content, Estilos.CenterFlex]} padder>
                        <Form>
                            <Item floatingLabel>
                                <Icon name='email' style={Estilos.Color} type='Entypo' />
                                <Label style={Estilos.Color}>Email</Label>
                                <Input style={Estilos.Color} />
                            </Item>
                            <Item floatingLabel>
                                <Icon name='vpn-key' style={Estilos.Color} type='MaterialIcons' />
                                <Label style={Estilos.Color}>Password</Label>
                                <Input style={Estilos.Color} />
                            </Item>
                        </Form>
                    </Content>
                </LinearGradient>
            </Container>
        );
    }

}