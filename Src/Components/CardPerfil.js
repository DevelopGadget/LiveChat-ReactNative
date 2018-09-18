import React from 'react';
import { Icon, Button, Card, CardItem, H3 } from 'native-base';
import Estilos from '../Css/Estilos';
import { Image } from 'react-native';
import PropTypes from 'prop-types';
import { Seguir, Seguidor } from '../Controllers/UsuarioController';

export default class CardPerfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Color: Estilos.Color1 }
    }

    componentWillMount() {}

    Favorito = () => {}

    render() {
        return (
            <Card style={[Estilos.Card]}>
                <CardItem bordered style={Estilos.Item}>
                    <H3 style={Estilos.Color1}>{this.props.Nombre}</H3>
                </CardItem>
                <CardItem bordered style={Estilos.Item} cardBody>
                    <Image source={{ uri: this.props.Foto }} style={Estilos.ImagenPerfil} resizeMode='cover' />
                </CardItem>
                <CardItem bordered style={Estilos.Item}>
                    <Button transparent onPress={this.Favorito.bind(this)}>
                        <Icon active name='heartbeat' type='FontAwesome' style={this.state.Color} />
                    </Button>
                </CardItem>
            </Card>
        );
    }
}

CardPerfil.propTypes = {
    Id: PropTypes.string.isRequired,
    Nombre: PropTypes.string.isRequired,
    Foto: PropTypes.string.isRequired
}