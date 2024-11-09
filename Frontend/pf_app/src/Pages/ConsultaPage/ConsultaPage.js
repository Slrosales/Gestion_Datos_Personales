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
  const [error, setError] = useState(false); // Estado de error
  const [loading, setLoading] = useState(true); // Estado de carga

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

  const handleDeletePersona = (documentNumber) => {
    setPersona((prevPersonas) => 
      prevPersonas.filter((persona) => persona.documentNumber !== documentNumber)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Asegurarse de activar el estado de carga al inicio
      try {
        const result = await getAll();
        if (result.data && Array.isArray(result.data.data)) {
          setPersona(result.data.data);
          setError(false);
        } else {
          throw new Error("Estructura de datos inesperada");
        }
      } catch (error) {
        console.error("Error al obtener los datos:", error);
        setError(true); // Marcar el estado de error
      } finally {
        setLoading(false); // Asegurarse de desactivar el estado de carga en todas las situaciones
      }
    };

    fetchData();
  }, []); // Se deja el array de dependencias vacío para ejecutar solo al montar el componente

  return (
    <div className={classes.principal}>
      <div className={classes.contenedor_boton_volver}>
        <a href="/"><button className={classes.boton_volver}>Volver</button></a>
      </div>
      <div className={classes.titulo_div}>
        <h1 className={classes.titulo}>Personas</h1>
      </div>

      {loading ? (
        <h1 className={classes.cargando}>Cargando...</h1> // Muestra el mensaje de carga
      ) : error ? (
        <h1 className={classes.nada}>Estamos en mantenimiento, pronto estará resuelto.</h1> // Muestra mensaje de error
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
