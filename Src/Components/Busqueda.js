import React from 'react';
import { Container, Header, Item, Icon, Input, Content, Button, H3, Card, CardItem, Body, Thumbnail } from 'native-base';
import { Image } from 'react-native';
import { LinearGradient } from 'expo';
import Estilos from '../Css/Estilos';
import { Grid, Row, Col } from 'react-native-easy-grid';

export default class Busqueda extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <Header searchBar rounded style={Estilos.Backgroud}>
                        <Item>
                            <Icon name='search' type='FontAwesome' style={Estilos.Color} />
                            <Input placeholder='Buscar' />
                            <Icon name='users' type='Feather' style={Estilos.Color} />
                        </Item>
                    </Header>
                    <Content padder contentContainerStyle={Estilos.Content}>
                        <Card style={[Estilos.Card]}>
                            <CardItem bordered style={Estilos.Item}>
                                <H3 style={Estilos.Color1}>Fernando Araujo</H3>
                            </CardItem>
                            <CardItem bordered style={Estilos.Item} cardBody>
                                <Image source={{ uri: 'http://s3-eu-west-1.amazonaws.com/cinemania-cdn/wp-content/uploads/2018/04/05102714/avengers-infinity-war-character-posters-black-widow-1099218.jpeg' }} style={Estilos.ImagenPerfil} resizeMode='cover' />
                            </CardItem>
                            <CardItem bordered style={Estilos.Item}>
                                <Button transparent>
                                    <Icon active name='heartbeat' type='FontAwesome' style={Estilos.Color1} />
                                </Button>
                            </CardItem>
                        </Card>
                    </Content>
                </LinearGradient>
            </Container>
        );
    }

}