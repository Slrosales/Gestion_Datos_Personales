import React from 'react'
import classes from './HomePage.module.css'
import { Link } from 'react-router-dom'
function HomePage() {
  return (
    <div className={classes.contenedorP}> 
     
      <div className={classes.contenido}>
      <h1 className={classes.titulo}>Toponimízate </h1>
        <ul >
       
        <li className={classes.boton_creacion}>
            <Link to="/CreacionPage"> Creacion </Link>
            </li>
          <li className={classes.boton_consulta}>
            <Link to="/ConsultaPage">Consulta</Link>
          </li>
          
        </ul>
     </div>
    </div>
    )
}

export default HomePage