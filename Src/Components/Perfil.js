import React from 'react';
import { Container, Content, H3, Thumbnail, Card, CardItem, Icon, Body, Right, Form, Item, Input, Button, Label, Text } from 'native-base';
import Estilos from '../Css/Estilos';
import Alertas from 'react-native-increibles-alertas';
import { LinearGradient, Permissions } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';
import ModalBox from 'react-native-modalbox';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Alert: {
                Mostrar: false, Spinner: true, Cancelado: false, Titulo: 'Cargando', Mensaje: 'Espere un momento...', Tipo: '', Boton: () => { }, Cancelar: () => { }
            },
            Nombre: ''
        }
        this.Cards = [
            {
                Texto: 'Seguidores',
                NombreIcono: 'heartbeat',
                Func: () => { }
            },
            {
                Texto: 'Seguidos',
                NombreIcono: 'hand-peace-o',
                Func: () => { }
            },
            {
                Texto: 'Cambiar Foto',
                NombreIcono: 'image',
                Func: this.CambiarImagen
            },
            {
                Texto: 'Cambiar Nombre',
                NombreIcono: 'user',
                Func: () => { this.refs.Modal.open() }
            },
            {
                Texto: 'Salir',
                NombreIcono: 'remove',
                Func: this.Salir
            },
            {
                Texto: 'Borrar Cuenta',
                NombreIcono: 'user-times',
                Func: this.BorrarCuenta
            }
        ];
    }

    async componentDidMount() {
        await Permissions.askAsync(Permissions.CAMERA_ROLL);
        await Permissions.askAsync(Permissions.CAMERA);
    }

    Salir = () => {
        
    }

    BorrarCuenta = () => {
        
    }

    CambiarNombre = () => {
 
    }

    CambiarImagen = async () => {
        this.CambiarEstadoAlert(true, true, 'Cargando', 'Por favor espere un momento...', 'aprobado', () => { }, () => { }, false);
        CambiarImagen().then(() => {
            this.CambiarEstadoAlert(false, true, '', '', '', () => { }, () => { }, false);
        }).catch(err => {
            this.CambiarEstadoAlert(true, false, 'Error', err.message, 'error', () => { this.CambiarEstadoAlert(false, false, '', '', '', () => { }, () => { }, false) }, () => { }, false);
        })
    }

    CambiarEstadoAlert = async (Mostrar, Spinner, Titulo, Mensaje, Tipo, Boton, Cancelar, Cancelado) => {
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
                <ModalBox style={Estilos.Modal} position='center' ref='Modal' isDisabled={false} backdropPressToClose swipeToClose={false} onClosed={() => { this.setState({ Nombre: '' }) }}>
                    <Container>
                        <Content padder contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={2}>
                                    <Form style={[Estilos.Content, Estilos.Start]}>
                                        <Item floatingLabel last>
                                            <Icon name='email' style={Estilos.Color} type='Entypo' />
                                            <Label style={Estilos.Color}>Nombre</Label>
                                            <Input style={Estilos.Color} onChangeText={text => this.setState({ Nombre: text })} />
                                        </Item>
                                    </Form>
                                </Row>
                                <Row size={1}>
                                    <Col size={1}>
                                        <Button block style={Estilos.Backgroud} onPress={this.CambiarNombre.bind(this)}>
                                            <Text>Ok</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Grid>
                        </Content>
                    </Container>
                </ModalBox>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={1} style={Estilos.Backgroud}>
                                    <Col style={[Estilos.CenterFlex, Estilos.Espaciado]}>
                                        <Thumbnail large source={{ uri: this.state.Usuario.photoURL }} onError={() => { this.setState({ Usuario: { displayName: this.state.Usuario.displayName, photoURL: 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png' } }) }} />
                                        <H3 style={Estilos.Color1}>{this.state.Usuario.displayName}</H3>
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