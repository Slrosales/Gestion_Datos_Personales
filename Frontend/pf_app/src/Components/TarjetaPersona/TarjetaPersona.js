import React from 'react';
import { motion } from 'framer-motion'; // Importamos motion de framer-motion
import classes from './TarjetaPersona.module.css';
import { useState } from 'react';

function TarjetaPersona({ Persona }) {


  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }
  const formatTextWithBold = (text) => {
    return text.replace(/\*\s*(.*?)\s*\*/g, '<strong>$1</strong>');
  };
  const formatBirthDate = (dateString) => {
 
    const date = new Date(dateString);

  
    const day = date.getUTCDate(); // Día en UTC
    const month = date.toLocaleString("es-ES", { month: "long", timeZone: "UTC" }); // Mes en letras en español, ajustado a UTC
    const year = date.getUTCFullYear(); // Año completo en UTC
  
    return `${day} ${month} ${year}`;
  };
  
  
  
  return (
    <div className={classes.tarjetaConPiernas}>
      {/* Ojos encima de la tarjeta */}
      <motion.div
        className={classes.ojos}
        initial={{ y: 0 }}
        animate={{ y: [0, -2, 0] }} // La tarjeta "salta"
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <img src="https://iili.io/236ch2s.png" alt="Ojo izquierdo" className={classes.ojo} />
        <img src="https://iili.io/236ch2s.png" alt="Ojo derecho" className={classes.ojo} />
      </motion.div>

      {/* Sección de las piernas */}
      <div className={classes.legs}>
        <motion.div
          className={classes.leg}
          initial={{ rotate: 0 }}
          animate={{ y: [0, 0, 2] }} 
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
        <motion.div
          className={classes.leg}
          initial={{ rotate: 0 }}
          animate={{ y: [2, 0, 0] }} 
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatType: 'mirror',
          }}
        />
      </div>

      <motion.div
        className={classes.tarjeta}
        initial={{ y: 0 }}
        animate={{ y: [0, -2, 0] }} // La tarjeta "salta"
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: 'loop',
        }}
      >
        <div className={classes.contenido}>
          <div className={classes.nombre}>
            <h2>{Persona.firstName} {Persona.lastName}</h2>
            <p></p>
          </div>
        </div>
        <div className={classes.boton_detalles}>
          <button onClick={handleOpenModal}>Ver detalles</button>

        </div>
        <div className={classes.boton_eliminar}>
          <button>Eliminar</button>
        </div>

      </motion.div>

      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>

            <h2 className={classes.tituloModal}>Detalles de la persona</h2>
            <div className={classes.principal}>
            <div className={classes.detalles}>
                <p><span className={classes.color}>Nombre:</span> <span className={classes.colori}>{Persona.firstName}</span></p>
                {Persona.secondName && (
                  <p><span className={classes.color}>Segundo nombre:</span> <span className={classes.colori}>{Persona.secondName}</span></p>
                )}
                <p><span className={classes.color}>Apellido:</span> <span className={classes.colori}>{Persona.lastName}</span></p>
              </div>

              <div className={classes.detalles}>
                <p><span className={classes.color}>Tipo de documento:</span> <span className={classes.colori}>{Persona.documentType}</span></p>
                <p><span className={classes.color}>Documento:</span> <span className={classes.colori}>{Persona.documentNumber}</span></p>
                <p><span className={classes.color}>Fecha de nacimiento:</span> <span className={classes.colori}>{formatBirthDate(Persona.birthDate)}</span></p>
              </div>

              <div className={classes.detalles}>
                <p><span className={classes.color}>Teléfono:</span> <span className={classes.colori}>{Persona.phone}</span></p>
                <p><span className={classes.color}>Email:</span> <span className={classes.colori}>{Persona.email}</span></p>
                <p><span className={classes.color}>Género:</span> <span className={classes.colori}>{Persona.gender}</span></p>
              </div>
              </div>
            <div className={classes.toponimia}>
              <h2> <span className={classes.color}>Toponimia: </span></h2>
              
            <p className={classes.parrafo}
            dangerouslySetInnerHTML={{
              __html: ` ${formatTextWithBold(Persona.toponymy)}`,
            }}
          ></p>
              </div>
    
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default TarjetaPersona;
