import React from 'react';
import Cards from './Cards';

export default class Busqueda extends React.Component {

    constructor(props) {
        super(props);
        this.state = { Usuarios: [], Backup: [], Load: false, Correcto: false}
    }

    componentWillMount() {
        this.Usuarios();
    }

    Usuarios = () => {
        this.setState({ Load: true });
    }

    Buscar = async (Texto) => {
        Texto.length <= 0 ? this.setState({ Usuarios: this.state.Backup }) : this.setState({ Usuarios: this.state.Backup.filter(item => { return item.Nombre.match(Texto.toUpperCase()) }) })
    }

    render() {
        return (
            <Cards Cards={this.state.Usuarios} Busqueda={this.Buscar} Correcto={this.state.Correcto} Load={this.state.Load}/>
        );
    }

}