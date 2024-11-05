import React, { useEffect, useState } from 'react'
import classes from './Busqueda.module.css'
import { getByDocument } from '../../Services/PersonService'


function Busqueda({recibirPersona,persona_no_encontrada}) {


   const [documentNumber, setDocumentNumber] = useState('')
   useEffect(() => {
        if(documentNumber === ''){
    
            recibirPersona([])

          
        }
    }, [recibirPersona, documentNumber])

   const handleChange = (event) => {
    setDocumentNumber(event.target.value)

    }
   const persona_encontrada = async () => {
    try {
        if(documentNumber !== ''){
        const result = await getByDocument(documentNumber);
        recibirPersona(result.data.data);
        noEncontrada(false)
        }

    } catch (error) {
    
        noEncontrada(true)
    }
    }
    const noEncontrada = async (data) => {
        if(data){
            console.log("Persona no encontrada")
            persona_no_encontrada(true)
        }else{
            console.log("Persona encontrada")
            persona_no_encontrada(false)
        }

           
    }
  return (
    <div className={classes.contenedorb}>
       <div className={classes.contenedor_input_b} >
       <input
        type="text" 
        value={documentNumber} 
        onChange={handleChange}
         placeholder="Buscar por documento.." className={classes.buscador}></input>
       <button className={classes.boton_buscar} onClick={persona_encontrada}>🔍</button> 
       </div>
         
        
    </div>
  )
}

export default Busqueda