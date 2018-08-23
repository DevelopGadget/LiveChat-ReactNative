import React from 'react';
import { Container, Spinner } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Login extends React.Component {
    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <Spinner color='blue'></Spinner>
                </LinearGradient>
            </Container>
        );
    }

}