import React from 'react';
import axios from 'axios';

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";


class App extends React.Component {
  constructor(){
    super();
    this.state = {
      data: [],
      modalActualizar: false,
      modalInsertar: false,
      form: {
        id: "",
        usuario: "",
        mensaje: "",
        respuesta: "",
      },
    };
    
  }
  componentDidMount() {
    axios.get(`http://localhost:3002/data`).then((res) => {
      const data = res.data;
      this.setState({ data });
      console.log(data)
    });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.id ===registro.id) {
        arreglo[contador].usuario = dato.usuario;
        arreglo[contador].mensaje = dato.mensaje;
        arreglo[contador].respuesta = dato.respuesta;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.id);
    if (opcion === true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.id === registro.id) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    valorNuevo.id=this.state.data.length+1;
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
          <h1 className="text-center">Quejas y reclamos</h1>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>Id</th>
                <th>Usuario</th>
                <th>Mensaje</th>
                <th>Respuesta</th>
                <th>Accion</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.usuario}</td>
                  <td>{dato.mensaje}</td>
                  <td>{dato.respuesta}</td>
               
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               Id:
              </label>
            
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.form.ID_TIPO}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Personaje: 
              </label>
              <input
                className="form-control"
                name="usuario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.TIPO_USUARIO}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Anime: 
              </label>
              <input
                className="form-control"
                name="mensaje"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.mensaje}
              />
            </FormGroup>

            <FormGroup>
              <label>
              respuesta: 
              </label>
              <input
                className="form-control"
                name="respuesta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.respuesta}
              />
            </FormGroup>
          </ModalBody>
          

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar Personaje</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                Id: 
              </label>
              
              <input
                className="form-control"
                readOnly
                type="text"
                value={this.state.data.length+1}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Usuario: 
              </label>
              <input
                className="form-control"
                name="usuario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Mensaje: 
              </label>
              <input
                className="form-control"
                name="mensaje"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Respuesta: 
              </label>
              <input
                className="form-control"
                name="respuesta"
                readOnly
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
