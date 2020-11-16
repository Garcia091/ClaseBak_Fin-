import React from 'react';
import axios from 'axios'; //Compartir resurcos entre servidores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //usar iconos en React
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import {
  Table, Button, Container, Modal, ModalHeader, ModalBody, FormGroup, ModalFooter,
} from "reactstrap";

const url = "http://localhost:5000/api/Tipo_usuario";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        id: '',
        TIPO_USUARIO: '',

      }
    }
  }
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  //seleccionar carro
  seleccionarCarro = (carros) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: carros.id,
        PLACA: carros.TIPO_USUARIO,

      }
    })
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
    const { form } = this.state;
    return (
      <div className="App">
        <br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Carro</button>
        <br /><br />
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>TIPO USUARIO</th>

            </tr>
          </thead>
          <tbody>
            {this.state.data.map(carros => {
              return (
                <tr>
                  <td>{carros.id}</td>
                  <td>{carros.TIPO_USUARIO}</td>
                  <td>
                    <button className="btn btn-primary" onClick={() => { this.seleccionarCarro(carros); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                    {" "}
                    <button className="btn btn-danger" onClick={() => { this.seleccionarCarro(carros); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>

        <Modal isOpen={this.state.modalInsertar}>
          <h1>Modal Insertar</h1>
          <ModalHeader style={{ display: 'block' }}>
            <span style={{ float: 'right' }}>x</span>
          </ModalHeader>
          <ModalBody>
            <div className="form-group">
              <label htmlFor="PLACA">id</label>
              <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form ? form.id : ''} />
              <br />
              <label htmlFor="TIPO_USUARIO">TIPO_USUARIO</label>
              <input className="form-control" type="text" name="TIPO_USUARIO" id="TIPO_USUARIO" onChange={this.handleChange} value={form ? form.TIPO_USUARIO : ''} />
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            {this.state.tipoModal == 'insertar'}
            <button className="btn btn-success" onClick={() => this.peticionesPost()}>
              Insertar
            </button>
            <button className="btn btn-primary" onClick={() => this.peticionesPut()}>
              Actualizar
            </button>
            <button className="btn btn-danger" onClick={() => this.modalInsertar()}>
              Cancelar
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            Está seguro de eliminar el carro con placa {form && form.PLACA}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={() => this.PeticionesDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={() => this.setState({ modalEliminar: false })}>No</button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default App;




import React from 'react';
import axios from 'axios'; //Compartir resurcos entre servidores
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //usar iconos en React
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const url = "http://localhost:4000/result/";


class Ejemplo extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      modalInsertar: false,
      modalEliminar: false,
      form: {
        id: '',
        PLACA: '',
        MARCA: '',
        MODELO: '',
        DOC_DUENIO: '',
        tipoModal: ''
      }
    }
  }
  modalInsertar = () => {
    this.setState({ modalInsertar: !this.state.modalInsertar });
  }

  //seleccionar carro
  seleccionarCarro = (carros) => {
    this.setState({
      tipoModal: 'actualizar',
      form: {
        id: carros.id,
        PLACA: carros.PLACA,
        MARCA: carros.MARCA,
        MODELO: carros.MODELO,
        DOC_DUENIO: carros.DOC_DUENIO
      }
    })
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
    const { form } = this.state;
    return (
      <div className="Ejemplo">
        <h1 className="text-center">Hola</h1>
        <br />
        <button className="btn btn-success" onClick={() => { this.setState({ form: null, tipoModal: 'insertar' }); this.modalInsertar() }}>Agregar Carro</button>
        <br /><br />

        <div className="container ">
          <div class="card-deck mb-3 text-center">
            {this.state.data.map(carros => {
              return (
                <div className="col-md-4 ">
                  <div className="card mt-4">
                    <div className="card-title text-center">
                      <h3>Hola</h3>
                      <span className="badge badge-pill badge-danger ml-2">
                        23
                                        </span>
                    </div>

                    <div className="text-center">
                      <img className="Logo" src="" alt="Logo" />
                    </div>
                    <div className="card-body">
                      <p>23</p>
                      <p><mark>23</mark></p>
                    </div>
                    <div className="card-footer">
                      <button className="btn btn-primary" onClick={() => { this.seleccionarCarro(carros); this.modalInsertar() }}><FontAwesomeIcon icon={faEdit} /></button>
                      {" "}
                      <button className="btn btn-danger" onClick={() => { this.seleccionarCarro(carros); this.setState({ modalEliminar: true }) }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

    );
  }

}

export default Ejemplo;