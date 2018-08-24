import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text, Content } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';
import { Image } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class Login extends React.Component {
    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} fade delay={500} duration={1000} staticType='bounce' movementType='slide' direction='left'>
                        <Content padder contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={3} style={{alignItems: 'flex-end'}}>
                                    <Image source={require('../../assets/icon.png')} style={Estilos.Imagen} resizeMode='contain' />
                                </Row>
                                <Row size={2} style={{alignItems: 'flex-start'}}>
                                    <Form style={Estilos.Content}>
                                        <Item floatingLabel last>
                                            <Icon name='email' style={Estilos.Color} type='Entypo' />
                                            <Label style={Estilos.Color}>Email</Label>
                                            <Input style={Estilos.Color} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='vpn-key' style={Estilos.Color} type='MaterialIcons' />
                                            <Label style={Estilos.Color}>Password</Label>
                                            <Input style={Estilos.Color} />
                                        </Item>
                                    </Form>
                                </Row>
                                <Col size={2} style={Estilos.CenterFlex}>
                                    <Button iconLeft transparent block>
                                        <Icon name='backup-restore' type='MaterialCommunityIcons' style={Estilos.Color} />
                                        <Text style={Estilos.Color}>Recuperar Contraseña</Text>
                                    </Button>
                                    <Button iconLeft style={Estilos.Boton} block>
                                        <Icon name='login' type='Entypo' />
                                        <Text>Entrar</Text>
                                    </Button>
                                    <Button iconLeft transparent block onPress={() => this.props.navigation.push('Registrar')}>
                                        <Icon name='add-box' type='MaterialIcons' style={Estilos.Color} />
                                        <Text style={Estilos.Color}>Registrar</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }
}