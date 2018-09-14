import React from 'react';
import PropTypes from 'prop-types';
import { Container, Header, Item, Icon, Input, Content, Spinner, View } from 'native-base';
import { ScrollView } from 'react-native';
import { LinearGradient } from 'expo';
import Estilos from '../Css/Estilos';
import { SimpleAnimation } from 'react-native-simple-animations';
import CardPerfil from './CardPerfil';

export default class Cards extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Header searchBar rounded style={Estilos.Backgroud}>
                            <Item>
                                <Icon name='search' type='FontAwesome' style={Estilos.Color} />
                                <Input placeholder='Buscar' onChangeText={Texto => this.Buscar(Texto)} />
                                <Icon name='users' type='Feather' style={Estilos.Color} />
                            </Item>
                        </Header>
                        <Content padder>
                            <ScrollView>
                                {this.state.Load ?
                                    this.state.Correcto ? this.state.Usuarios.map((Item, Index) => {
                                        return (
                                            <CardPerfil Id={Item.Id} Foto={Item.Foto} Nombre={Item.Nombre} key={Index} />
                                        );
                                    }) : null :
                                    <View style={Estilos.CenterFlex}>
                                        <Spinner color='violet' size='large' />
                                    </View>
                                }
                            </ScrollView>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }
}

Cards.propTypes = {
    Cards: PropTypes.array.isRequired,
    Busqueda: PropTypes.func.isRequired,
    Correcto: PropTypes.bool.isRequired,
    Load: PropTypes.bool.isRequired 
}