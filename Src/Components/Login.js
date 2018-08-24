import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';
import { Image } from 'react-native';
import { Grid, Row } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class Login extends React.Component {
    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={{ flex: 1 }} fade delay={500} duration={1000} staticType='bounce' movementType='slide' direction='left'>
                        <Grid style={Estilos.Content}>
                            <Row size={3} style={Estilos.CenterFlex}>
                                <Image source={require('../../assets/icon.png')} style={Estilos.Imagen} resizeMode='contain' />
                            </Row>
                            <Row size={1}>
                                <Form style={Estilos.Form}>
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
                            </Row>
                            <Row size={1} style={Estilos.CenterFlex}>
                                <Button iconLeft style={Estilos.Boton}>
                                    <Icon name='login' type='Entypo' />
                                    <Text>Entrar</Text>
                                </Button>
                            </Row>
                        </Grid>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }
}