import React from 'react';
import { Container, Content, H3, Thumbnail, Card, CardItem, Icon, Body, Right } from 'native-base';
import Estilos from '../Css/Estilos';
import Alertas from 'react-native-increibles-alertas';
import { LinearGradient } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Usuario, CerrarSesion } from '../Controllers/UsuarioController';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Alert: {
                Mostrar: false, Spinner: false, Cancelado: false, Titulo: '', Mensaje: '', Tipo: '', Boton: () => { }, Cancelar: () => {}
            }
        }
        this.Cards = [
            {
                Texto: 'Seguidores',
                NombreIcono: 'heartbeat',
                Func: () => {}
            },
            {
                Texto: 'Seguidos',
                NombreIcono: 'hand-peace-o',
                Func: () => {}
            },
            {
                Texto: 'Cambiar Foto',
                NombreIcono: 'image',
                Func: () => {}
            },
            {
                Texto: 'Cambiar Nombre',
                NombreIcono: 'user',
                Func: () => {}
            },
            {
                Texto: 'Salir',
                NombreIcono: 'remove',
                Func: this.Salir
            },
            {
                Texto: 'Borrar Cuenta',
                NombreIcono: 'user-times',
                Func: () => {}
            }
        ];
    }

    componentWillMount() {
        this.Usuario = Usuario();
        if (!this.Usuario) {
            this.Usuario.photoURL = 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png';
            this.Usuario.displayName = 'Error al cargar el perfil';
        }
    }

    Salir = () => {
        this.CambiarEstadoAlert(true, false, 'Confirmar', '¿Seguro que quiere salir?', 'info', () => { 
            this.CambiarEstadoAlert(true, true, 'Cargando', 'Por favor espere un momento...', 'aprobado', () => { }, () => { }, false);
            CerrarSesion().then(() => {
                this.CambiarEstadoAlert(false, false, '', '', '', () => { }, () => {}, false);
                this.props.navigation.push('Login');
            }).catch(err => {
                this.CambiarEstadoAlert(true, false, 'Error', err.message, 'error', () => { this.CambiarEstadoAlert(false, false, '', '', '', () => { }, () => {}, false) }, () => {}, false);
            })
        }, () => {
            this.CambiarEstadoAlert(false, false, '', '', '', () => { }, () => {}, false);
        }, true);
    }

    CambiarEstadoAlert = (Mostrar, Spinner, Titulo, Mensaje, Tipo, Boton, Cancelar, Cancelado) => {
        this.setState({ Alert: { Mostrar: Mostrar, Spinner: Spinner, Titulo: Titulo, Mensaje: Mensaje, Tipo: Tipo, Boton: Boton, Cancelar: Cancelar, Cancelado: Cancelado } });
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
                    BotonCancelado={this.state.Alert.Cancelado}
                    TextoBotonCancelado='Cancelar'
                    TextoBotonConfirmado='Ok'
                    onBotonCancelado={this.state.Alert.Cancelar}
                    onBotonConfirmado={this.state.Alert.Boton} />
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={1} style={Estilos.Backgroud}>
                                    <Col style={[Estilos.CenterFlex, Estilos.Espaciado]}>
                                        <Thumbnail large source={{ uri: this.Usuario.photoURL }} onError={() => { this.Usuario.photoURL = 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png' }} />
                                        <H3 style={Estilos.Color1}>{this.Usuario.displayName}</H3>
                                    </Col>
                                </Row>
                                <Row size={4}>
                                    <Col style={Estilos.Espaciado}>
                                        {
                                            this.Cards.map((Item, Key) => {
                                                return (
                                                    <Card style={[Estilos.Card]} key={Key}>
                                                        <CardItem bordered style={Estilos.Item} button onPress={Item.Func.bind(this)}>
                                                            <Icon name={Item.NombreIcono} type='FontAwesome' style={Estilos.Color} />
                                                            <H3 style={Estilos.Color}>{Item.Texto}</H3>
                                                            <Body />
                                                            <Right>
                                                                <Icon name='hand-o-right' type='FontAwesome' style={Estilos.Color} />
                                                            </Right>
                                                        </CardItem>
                                                    </Card>
                                                );
                                            })
                                        }
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