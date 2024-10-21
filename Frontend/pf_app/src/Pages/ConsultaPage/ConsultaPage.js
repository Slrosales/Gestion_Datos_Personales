import React, { useEffect, useState } from 'react';
import classes from './ConsultaPage.module.css';
import TarjetaPersona from '../../Components/TarjetaPersona/TarjetaPersona';
import { getAll } from '../../Services/PersonService';

export default function ConsultaPage() {
  const [Persona, setPersona] = useState([]);
 
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
  
      
      <div className={classes.tarjetas}>
        {Persona.map((Persona) => (
          <TarjetaPersona key={Persona._id} Persona={Persona} />
        ))}
      </div>
    </div>
  );
}
