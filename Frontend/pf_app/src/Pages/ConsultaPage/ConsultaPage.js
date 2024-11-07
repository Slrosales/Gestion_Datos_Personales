import React, { useEffect, useState, useCallback } from 'react';
import classes from './ConsultaPage.module.css';
import TarjetaPersona from '../../Components/TarjetaPersona/TarjetaPersona';
import { getAll } from '../../Services/PersonService';
import Busqueda from '../../Components/Busqueda/Busqueda.js'; 

export default function ConsultaPage() {
  const [Persona, setPersona] = useState([]);
  const [documento, setDocumento] = useState([]);
  const [busqueda, setBusqueda] = useState(false);
  const [noencontrada, setNoEncontrada] = useState(false);

  const recibirPersona = useCallback((documento) => {
    if (documento.length !== 0) {
      setBusqueda(false);
    } else {
      setBusqueda(true);
    }
    setDocumento(documento);
  }, []);

  const persona_no_encontrada = (data) => {
    if (data) {
      setBusqueda(false);
      setNoEncontrada(true);
    } else {
      setNoEncontrada(false);
    }
  };

  // Función para manejar la eliminación de una persona
  const handleDeletePersona = (documentNumber) => {
    setPersona((prevPersonas) => 
      prevPersonas.filter((persona) => persona.documentNumber !== documentNumber)
    );
  };

  useEffect(() => {
    if (documento.length !== 0) {
      setBusqueda(false);
    }

    // Función para obtener todas las personas
    const fetchData = async () => {
      try {
        const result = await getAll();
        console.log(result.data.data);
        setPersona(result.data.data);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    fetchData();
  }, [documento, busqueda]);

  return (
    <div className={classes.principal}>
      <div className={classes.contenedor_boton_volver}>
        <a href="/"><button className={classes.boton_volver}>Volver</button></a>
      </div>
      <div className={classes.titulo_div}>
        <h1 className={classes.titulo}>Personas</h1>
      </div>
      <Busqueda recibirPersona={recibirPersona} persona_no_encontrada={persona_no_encontrada} />

      <div className={classes.tarjetas}>
        {!busqueda ? (
          <>
            {noencontrada ? (
              <h1 className={classes.nada}>Persona no encontrada</h1>
            ) : (
              <TarjetaPersona key={documento._id} Persona={documento} onDelete={handleDeletePersona} />
            )}
          </>
        ) : (
          <>
            {Persona.length === 0 ? (
              <h1 className={classes.nada}>No hay personas registradas</h1>
            ) : (
              Persona.map((persona) => (
                <TarjetaPersona key={persona._id} Persona={persona} onDelete={handleDeletePersona} />
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}
