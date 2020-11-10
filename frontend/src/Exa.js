import React, {useState,useEffect} from 'react'
import axios from 'axios'

const baseUrl = "http://localhost:5000/api"

async function getProducts(){
    try {
        const response = await axios({
            url: `${baseUrl}/Tipo_usuario`,
            method: 'GET'
        }
        )
        return response;
    } catch (error) {
        console.log(error)
    }
}

const Ejemplo = () =>{
    const [isLoading,setIsLoading] = useState(true);
    const [products,SetProducts] = useState([]);

useEffect (async ()=>{
    async function LoadProducto (){
        const response  = await getProducts()
        console.log(response)
        return response
    }
    LoadProducto();
})

return(
    <h1> Hola</h1>
)

}

export default Ejemplo;