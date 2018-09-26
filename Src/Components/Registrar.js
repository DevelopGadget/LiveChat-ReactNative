import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text, Content } from 'native-base';
import Estilos from '../Css/Estilos';
import { Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import {AlertasModule, AlertaSpinnerModule} from 'react-native-increibles-alertas';
import { SimpleAnimation } from 'react-native-simple-animations';
import { RegistrarUser } from '../Controllers/UsuarioController';

export default class Registrar extends React.Component {

    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
        this.state = {
            User: { Email: '', Password: '', Nombre: '', Foto: 'http://iconbug.com/data/bd/512/f329adad1100d9608c26b3f072aa016f.png' }, 
            Alert: {
                Mostrar: false, Titulo: '', Mensaje: '', Tipo: '', Boton: () => this.setState({ Alert: { Mostrar: false } })
            },
            Spinner: false
        }
    }

    Registro = () => {
        if (this.state.User.Email.length <= 0 || this.state.User.Nombre.length <= 0 || this.state.User.Password.length <= 0 || this.state.User.Email.indexOf(" ") !== -1 ||
            this.state.User.Password.indexOf(" ") !== -1) {
            this.CambiarEstadoAlert(true, 'Error', 'Todos los campos son requeridos, email y contraseña no deben tener espacio', 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) });
        } else {
            this.setState({Spinner: true});
            RegistrarUser(this.state.User).then(() => {
                this.CambiarEstadoAlert(true, 'Usuario Creado', 'Proceda al login', 'aprobado', () => { this.props.navigation.push('Login') });
            }).catch(err => {
                this.CambiarEstadoAlert(true, 'Error', err, 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) });
            });
        }
    }

    CambiarEstadoUser = (Nombre, Password, Email) => {
        this.setState({ User: { Nombre: Nombre, Password: Password, Email: Email, Foto: this.state.User.Foto } });
    }

    CambiarEstadoAlert = (Mostrar, Titulo, Mensaje, Tipo, Boton) => {
        this.setState({ Alert: { Mostrar: Mostrar, Titulo: Titulo, Mensaje: Mensaje, Tipo: Tipo, Boton: Boton }, Spinner: false });
    }

    render() {
        return (
            <Container>
                <AlertasModule Tipo={this.state.Alert.Tipo} Titulo={this.state.Alert.Titulo} Mensaje={this.state.Alert.Mensaje} Mostrar={this.state.Alert.Mostrar} TextoBotonConfirmado='Ok' onBotonConfirmado={this.state.Alert.Boton} />
                <AlertaSpinnerModule Titulo='Cargando' Mensaje='Espere un momento...' Mostrar={this.state.Spinner} />
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={500} duration={1500} direction='left' movementType='slide' staticType='bounce'>
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
                                        <Button iconLeft style={Estilos.Boton} block onPress={this.Registro.bind(this)}>
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