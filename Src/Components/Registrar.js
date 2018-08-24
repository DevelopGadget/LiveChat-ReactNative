import React from 'react';
import { Container, Form, Item, Input, Label, Icon, Button, Text, Content, Card, CardItem, Left, Body } from 'native-base';
import Estilos from '../Css/Estilos';
import { LinearGradient, ImagePicker } from 'expo';
import { Image } from 'react-native';
import { Grid, Row, Col } from 'react-native-easy-grid';
import { SimpleAnimation } from 'react-native-simple-animations';

const NotFound = 'https://cedcn.org/wp-content/themes/cedcn/images/404.png';

export default class Registrar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Usuario: { ImageUrl: NotFound } }
    }
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3],
            });

            if (!result.cancelled) {
                this.setState({ Usuario: { ImageUrl: result.uri } });
            }
        } catch (error) {

        }
    };

    render() {
        return (
            <Container>
                <LinearGradient colors={['#800080', '#000']} start={[0, 1]} end={[1, 0]} style={Estilos.Pantalla}>
                    <SimpleAnimation style={{ flex: 1 }} fade delay={500} duration={1000} staticType='bounce' movementType='slide' direction='left'>
                        <Content padder contentContainerStyle={Estilos.Content}>
                            <Grid>
                                <Row size={2}>
                                    <Form style={[Estilos.Content, Estilos.CenterFlex]}>
                                        <Item floatingLabel last>
                                            <Icon name='pencil' style={Estilos.Color} type='FontAwesome' />
                                            <Label style={Estilos.Color}>Nombre Completo</Label>
                                            <Input style={Estilos.Color} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='email' style={Estilos.Color} type='Entypo' />
                                            <Label style={Estilos.Color}>Email</Label>
                                            <Input style={Estilos.Color} />
                                        </Item>
                                        <Item floatingLabel last>
                                            <Icon name='vpn-key' style={Estilos.Color} type='MaterialIcons' />
                                            <Label style={Estilos.Color}>Password</Label>
                                            <Input style={Estilos.Color} />
                                        </Item>
                                    </Form>
                                </Row>
                                <Col size={3}>
                                    <Button iconLeft style={Estilos.Boton} block onPress={this._pickImage.bind(this)}>
                                        <Icon name='folder-multiple-image' type='MaterialCommunityIcons' />
                                        <Text>Añadir Imagen</Text>
                                    </Button>
                                    <Card>
                                        <CardItem>
                                            <Left>
                                                <Body>
                                                    <Text>Imagenes</Text>
                                                    <Text note>Vizualizador</Text>
                                                </Body>
                                            </Left>
                                        </CardItem>
                                        <CardItem cardBody>
                                            <Image source={{ uri: this.state.Usuario.ImageUrl }} resizeMode='contain' style={{ height: 300, width: null, flex: 1 }} onError={() => this.setState({ Usuario: { ImageUrl: NotFound } })} />
                                        </CardItem>
                                    </Card>
                                </Col>
                                <Col size={1} style={Estilos.Content}>
                                    <Button iconLeft style={Estilos.Boton} block>
                                        <Icon name='add-box' type='MaterialIcons' />
                                        <Text>Registrar</Text>
                                    </Button>
                                    <Button iconLeft transparent block>
                                        <Icon name='arrow-left' type='FontAwesome' style={Estilos.Color} onPress={() => this.props.navigation.navigate('Login')} />
                                        <Text style={Estilos.Color}>Cancelar</Text>
                                    </Button>
                                </Col>
                            </Grid>
                        </Content>
                    </SimpleAnimation>
                </LinearGradient>
            </Container>
        );
    }
}