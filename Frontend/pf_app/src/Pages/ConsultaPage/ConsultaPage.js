import React, { useEffect, useState } from 'react';
import { useCallback } from 'react'; 
import classes from './ConsultaPage.module.css';
import TarjetaPersona from '../../Components/TarjetaPersona/TarjetaPersona';
import { getAll } from '../../Services/PersonService';
import Busqueda from '../../Components/Busqueda/Busqueda.js'; 



export default function ConsultaPage() {
  const [Persona, setPersona] = useState([]);
  const [documento, setDocumento] = useState([])
  const [busqueda, setbusqueda] = useState(false)
  const [noencontrada, setNoencontrada] = useState(false)

  useEffect(() => {
    if(documento.length !== 0){
      console.log('entra')
      setbusqueda(false)
    }

  
    console.log(busqueda)
  }, [documento , busqueda])
  


  const recibirPersona = useCallback((documento) => {

    console.log(documento.length)
    
     if(documento.length !== 0){

    
      setbusqueda(false)
      console.log(documento)
      
   
     }else {
      console.log(documento)
      
      setbusqueda(true) 

     }
    setDocumento(documento);
  }, []);

  const persona_no_encontrada = (data) => {
    if(data){
      setbusqueda(false)
      setNoencontrada(true)
      
      
    }else {
      setNoencontrada(false)
    }
   
  }
   

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getAll();
        setPersona(result.data.data);
       
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };
    fetchData();
  }, []); // Remover Persona de las dependencias para evitar re-render innecesarios

  return (

    <div className={classes.principal}>
      <div className={classes.contenedor_boton_volver}>
        <a href="/"><button className={classes.boton_volver}>Volver</button></a>
      </div>
      <div className={classes.titulo_div}>
        <h1 className={classes.titulo}> Personas</h1>
      </div>
      <Busqueda recibirPersona={recibirPersona} persona_no_encontrada={persona_no_encontrada}/>
  
      
      <div className={classes.tarjetas}>
        {!busqueda? 
        <>
        {noencontrada? <h1 className={classes.nada}>Persona no encontrada</h1> :  <TarjetaPersona key={documento._id} Persona={documento} /> }
       
        </>
        : 
        <>

        {Persona.length === 0 ? <h1 className={classes.nada}>No hay personas registradas </h1> :
         <>
        {Persona.map((Persona) => (
          <TarjetaPersona key={Persona._id} Persona={Persona} />
         ))} 
         </>
         }
         
        
         </>}
        
      </div>
    </div>
  );
}
