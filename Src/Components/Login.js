import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text, Content } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';
import { Image, StatusBar } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { AlertaSpinnerModule, AlertasModule } from 'react-native-increibles-alertas';
import { SimpleAnimation } from 'react-native-simple-animations';
import { LoginUser, setDatos, Restablecer, getDatos } from '../Controllers/UsuarioController';

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        StatusBar.setHidden(true);
        this.state = {
            User: { Email: '', Password: '' }, Alert: {
                Mostrar: false, Titulo: 'Cargando', Mensaje: 'Por favor espere un momento...', Tipo: 'aprobado', Boton: () => { }
            },
            Spinner: true
        }
    }

    componentWillMount() {
        getDatos('User').then(user => {
            user ? this.props.navigation.push('Tabs') : null;
        }).catch(err => {});
        this.setState({ Spinner: false });
    }

    Restaurar = async () => {
        if (this.state.User.Email.length <= 0) {
            this.CambiarEstadoAlert(true, 'Error', 'Debe usar el campo del email', 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) });
        } else {
            this.setState({ Spinner: true });
            Restablecer(this.state.User.Email).then(value => {
                this.CambiarEstadoAlert(true, 'Enviado', 'Revise su correo para cambiar la contraseña', 'aprobado', () => { this.CambiarEstadoAlert(false, false, '', '', '', () => { }) });
            }).catch(err => {
                this.CambiarEstadoAlert(true, 'Error', err, 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) });
            })
        }
    }

    Entrar = async () => {
        if (this.state.User.Email.length <= 0) {
            this.CambiarEstadoAlert(true, 'Error', 'Todos los campos son requeridos', 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) })
        } else {
            this.setState({ Spinner: true });
            LoginUser(this.state.User).then((user) => {
                setDatos({ Token: user.Token, Nombre: user.Nombre, Foto: user.Foto, Email: this.state.User.Email, Password: this.state.User.Password }, 'User').then(() => {
                    this.props.navigation.push('Tabs');
                }).catch(() => {
                    this.CambiarEstadoAlert(true, 'Error', 'Ha ocurrido un error vuelva a intentar', 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) })
                })
            }).catch(err => {
                this.CambiarEstadoAlert(true, 'Error', err, 'error', () => { this.CambiarEstadoAlert(false, '', '', '', () => { }) });
            })
        }
    }

    CambiarEstadoUser = (Email, Password) => {
        this.setState({ User: { Password: Password, Email: Email } });
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
                                <Row size={2} style={Estilos.CenterFlex}>
                                    <Image source={require('../../assets/icon.png')} style={Estilos.Imagen} resizeMode='contain' />
                                </Row>
                                <Row size={1} style={[Estilos.Start]}>
                                    <Form style={[Estilos.Content, Estilos.CenterFlex]}>
                                        <Item floatingLabel last>
                                            <Icon name='email' style={Estilos.Color} type='Entypo' />
                                            <Label style={Estilos.Color}>Email</Label>
                                            <Input style={Estilos.Color} keyboardType='email-address' onChangeText={text => this.CambiarEstadoUser(text, this.state.User.Password)} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='vpn-key' style={Estilos.Color} type='MaterialIcons' />
                                            <Label style={Estilos.Color}>Password</Label>
                                            <Input style={Estilos.Color} secureTextEntry onChangeText={text => this.CambiarEstadoUser(this.state.User.Email, text)} />
                                        </Item>
                                        <Button iconLeft transparent block onPress={this.Restaurar.bind(this)}>
                                            <Icon name='backup-restore' type='MaterialCommunityIcons' style={Estilos.Color} />
                                            <Text style={Estilos.Color}>Recuperar Contraseña</Text>
                                        </Button>
                                    </Form>
                                </Row>
                                <Row size={2} style={[Estilos.CenterFlex]}>
                                    <Col style={[Estilos.CenterFlex]}>
                                        <Button iconLeft style={Estilos.Boton} block onPress={this.Entrar.bind(this)}>
                                            <Icon name='login' type='Entypo' />
                                            <Text>Entrar</Text>
                                        </Button>
                                        <Button iconLeft transparent block onPress={() => this.props.navigation.push('Registrar')}>
                                            <Icon name='add-box' type='MaterialIcons' style={Estilos.Color} />
                                            <Text style={Estilos.Color}>Registrar</Text>
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