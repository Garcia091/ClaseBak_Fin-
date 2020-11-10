import React from 'react';
import axios from 'axios';

class Character extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      character: []
    };
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/Tipo_usuario`).then((res) => {
      const character = res.data;
      this.setState({ character });
    });
  }

  render() {
    return (
      <div className="container text-center">
        <h1 className="py-5">Consumir la base de datos</h1>
        <div className="card-deck mb-3 text-center">
          {this.state.character.map((item, index) => {
            return (
              <div className="col-md-4 ">
                <div className="card bg-dark mt-4" key={`Data-${index}`}>
                  <h3 className="card-title text-white"> {item.ID_TIPO}</h3>
                  <img src={item.image} alt="Personaje" />
                  <h3 className="card-text text-white">Estado: {item.TIPO_USUARIO}</h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Character;
