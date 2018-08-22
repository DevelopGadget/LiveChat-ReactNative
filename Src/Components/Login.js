import React from 'react';
import { Container, Content, Spinner } from 'native-base';
import Estilos from '../Css/Estilos';

export default class Login extends React.Component {
    render() {
        return (
            <Container style={Estilos.Fondo}>
                <Content>
                    <Spinner color='blue' size='large' />
                </Content>
            </Container>
        );
    }
}