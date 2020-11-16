import React from 'react';
import axios from 'axios';
import '../css/Registro.css';

const url = "http://localhost:5000/api/usuario/";

class Registro extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                apellido_paterno: '',
                apellido_materno: '',
                nombre: '',
                username: '',
                password: ''
            }
        }
    }
    modalInsertar = () => {
        this.setState({ modalInsertar: !this.state.modalInsertar });
    }


    //Petición tipo GET
    peticionesGet = () => {
        axios.get(url).then(response => {
            //console.log(response.data) 
            //asignaremos al estado
            this.setState({ data: response.data })
        }).catch(error => {
            console.log(error.message);
        })
    }

    //Petición tipo POST
    peticionesPost = async () => {
        await axios.post(url, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    //Peticiones tipo PUT
    peticionesPut = () => {
        axios.put(url + this.state.form.id, this.state.form).then(response => {
            this.modalInsertar();
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    PeticionesDelete = () => {
        axios.delete(url + this.state.form.id).then(response => {
            this.setState({ modalEliminar: false });
            this.peticionesGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    //carpturar lo que el usuario inserte en las cajas de texto
    //como se ejecuta en segundo plano debe ser asíncrono
    handleChange = async e => {
        e.persist();
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    //primer ciclo de vida de los componentes

    componentDidMount() {
        this.peticionesGet();
    }

    render() {
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">id</label>
                            <input type="text" class="form-control" id="id" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1"> Apellido paterno</label>
                            <input type="text" class="form-control" id="apellido_paterno" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Apellido materno</label>
                            <input type="text" class="form-control" id="apellido_materno" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Nombre</label>
                            <input type="text" class="form-control" id="nombre" />
                        </div>


                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="username" aria-describedby="emailHelp" />
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input type="password" class="form-control" id="password" />
                        </div>

                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Registro;