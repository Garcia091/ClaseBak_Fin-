import React from 'react';
import axios from 'axios';
import '../css/Login2.css'

const url="http://localhost:5000/api/usuario/";

class Login2 extends React.Component{

    state={
        form:{
            username: '',
            password: ''
        },
        error:false,
        errorMsg:"" //Mensale de error
    }

    handleChange=async e=>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
        console.log(this.state.form)
    }

    handleSubmit(e){ //Método para no actualizar la página con el boton
        e.preventDefault()
    }

    handleBoton=()=>{ //Método para no actualizar la página con el boton
       console.log('Enviando')
       axios.post(url,this.state.form).then(response=>{
        console.log(response)
      }).catch(error=>{
        console.log(error.message);
      })
    }

    render(){
        return(
            <div className="wrapper fadeInDown">
            <div id="formContent">
              <div className="fadeIn first py-3">
                <img src="./imgP/logo.png" id="icon" alt="User Icon" />
                <h1>Iniciar sesión</h1>
              </div>
              
              <form onSubmit={this.handleSubmit}>
                <input type="text"  className="fadeIn second" name="username" placeholder="usuario"  onChange={this.handleChange}/>
                <input type="password"  className="fadeIn third" name="password" placeholder="password"  onChange={this.handleChange}/>
                <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.handleBoton}/>
              </form>
              <div id="formFooter">
                <a className="underlineHover" href="#">Go to the Site</a>
              </div>
          
            </div>
          </div>
        )
    }
}

export default Login2;