import React from 'react';
import { motion } from 'framer-motion'; // Importamos motion de framer-motion
import classes from './TarjetaPersona.module.css';

function TarjetaPersona({ Persona }) {
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
          <button>Ver detalles</button>

        </div>
        <div className={classes.boton_eliminar}>
          <button>Eliminar</button>
        </div>

      </motion.div>
    </div>
  );
}

export default TarjetaPersona;
