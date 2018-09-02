import React from 'react';
import { Container, Content } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient } from 'expo';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={Estilos.Content} delay={100} duration={1000} staticType='zoom' movementType='spring' direction='left'>
                        <Content style={Estilos.Content}>
                            <Grid style={Estilos.Content}>
                                <Row size={1}>
                                    
                                </Row>
                                <Row size={3}>

                                </Row>
                            </Grid>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }

}