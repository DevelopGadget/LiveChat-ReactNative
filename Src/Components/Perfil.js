import React from 'react';
import { Container, Content, H3, Thumbnail, Card, CardItem, Text, Icon, Left, Body, Right, StyleProvider, getTheme } from 'native-base';
import Estilos from '../Css/Estilos';
import Alertas from 'react-native-increibles-alertas';
import { LinearGradient } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';
import { Usuario } from '../Controllers/UsuarioController';
const Cards = [
    {
        Texto: 'Seguidores',
        NombreIcono: 'heartbeat'
    },
    {
        Texto: 'Seguidos',
        NombreIcono: 'hand-peace-o'
    },
    {
        Texto: 'Cambiar Foto',
        NombreIcono: 'image'
    },
    {
        Texto: 'Cambiar Nombre',
        NombreIcono: 'user'
    },
    {
        Texto: 'Salir',
        NombreIcono: 'remove'
    },
    {
        Texto: 'Borrar Cuenta',
        NombreIcono: 'user-times'
    }
];

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount(){
        this.Usuario = Usuario();
    }

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={1} style={Estilos.Backgroud}>
                                    <Col style={[Estilos.CenterFlex, Estilos.Espaciado]}>
                                        <Thumbnail large source={{ uri: this.Usuario.photoURL }} onError={() => {this.Usuario.photoURL = 'https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-512.png'}}/>
                                        <H3 style={Estilos.Color1}>{this.Usuario.displayName}</H3>
                                    </Col>
                                </Row>
                                <Row size={4}>
                                    <Col style={Estilos.Espaciado}>
                                        {
                                            Cards.map((Item, Key) => {
                                                return (
                                                    <Card style={[Estilos.Card]} key={Key}>
                                                        <CardItem bordered style={Estilos.Item}>
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