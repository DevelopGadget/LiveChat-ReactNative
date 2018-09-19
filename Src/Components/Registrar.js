import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text, Content } from 'native-base';
import Estilos from '../Css/Estilos';
import { Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import Alertas from 'react-native-increibles-alertas';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Registro } from '../Controllers/UsuarioController';

export default class Registrar extends React.Component {

    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
        this.state = {
            User: { Email: '', Password: '', Nombre: '' }, Alert: {
                Mostrar: false, Spinner: false, Titulo: '', Mensaje: '', Tipo: '', Boton: () => this.setState({ Alert: { Mostrar: false } })
            }
        }
    }

    Registrar = () => {
        if (this.state.User.Email.length <= 0 || this.state.User.Nombre.length <= 0 || this.state.User.Password.length <= 0 || this.state.User.Email.indexOf(" ") !== -1 ||
            this.state.User.Password.indexOf(" ") !== -1) {
            this.CambiarEstadoAlert(true, false, 'Error', 'Todos los campos son requeridos, email y contraseña no deben tener espacio', 'error', () => { this.CambiarEstadoAlert(false, false, '', '', '', () => { }) })
        } else {
            this.CambiarEstadoAlert(true, true, 'Cargando', 'Por favor espere un momento...', 'aprobado', () => { });
        }
    }

    CambiarEstadoUser = (Nombre, Password, Email) => {
        this.setState({ User: { Nombre: Nombre, Password: Password, Email: Email } });
    }

    CambiarEstadoAlert = (Mostrar, Spinner, Titulo, Mensaje, Tipo, Boton) => {
        this.setState({ Alert: { Mostrar: Mostrar, Spinner: Spinner, Titulo: Titulo, Mensaje: Mensaje, Tipo: Tipo, Boton: Boton } });
    }

    render() {
        return (
            <Container>
                <Alertas
                    Tipo={this.state.Alert.Tipo}
                    Titulo={this.state.Alert.Titulo}
                    Mensaje={this.state.Alert.Mensaje}
                    Spinner={this.state.Alert.Spinner}
                    Mostrar={this.state.Alert.Mostrar}
                    BotonCancelado={false}
                    TextoBotonCancelado='Cancelar'
                    TextoBotonConfirmado='Ok'
                    onBotonCancelado={() => { }}
                    onBotonConfirmado={this.state.Alert.Boton} />
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content padder contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={1} style={Estilos.End}>
                                    <Image source={require('../../assets/Add.png')} style={Estilos.Imagen} resizeMode='contain' />
                                </Row>
                                <Row size={2} style={Estilos.CenterFlex}>
                                    <Form style={[Estilos.Content, Estilos.CenterFlex]}>
                                        <Item floatingLabel last>
                                            <Icon name='pencil' style={Estilos.Color} type='FontAwesome' />
                                            <Label style={Estilos.Color}>Nombre Completo</Label>
                                            <Input style={Estilos.Color} onChangeText={text => this.CambiarEstadoUser(text, this.state.User.Password, this.state.User.Email)} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='email' style={Estilos.Color} type='Entypo' />
                                            <Label style={Estilos.Color}>Email</Label>
                                            <Input style={Estilos.Color} keyboardType='email-address' onChangeText={text => this.CambiarEstadoUser(this.state.User.Nombre, this.state.User.Password, text)} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='vpn-key' style={Estilos.Color} type='MaterialIcons' />
                                            <Label style={Estilos.Color}>Password</Label>
                                            <Input style={Estilos.Color} secureTextEntry onChangeText={text => this.CambiarEstadoUser(this.state.User.Nombre, text, this.state.User.Email)} />
                                        </Item>
                                    </Form>
                                </Row>
                                <Row size={2} style={Estilos.CenterFlex}>
                                    <Col style={[Estilos.CenterFlex]}>
                                        <Button iconLeft style={Estilos.Boton} block onPress={this.Registrar.bind(this)}>
                                            <Icon name='add-box' type='MaterialIcons' />
                                            <Text>Registrar</Text>
                                        </Button>
                                        <Button iconLeft transparent block onPress={() => this.props.navigation.push('Login')}>
                                            <Icon name='arrow-left' type='FontAwesome' style={Estilos.Color} />
                                            <Text style={Estilos.Color}>Cancelar</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }
}