import React, { useState } from 'react';
import classes from './CreacionPage.module.css';
import { create, getByDocument } from '../../Services/PersonService'; // Asumo que getByEmail también existe

export default function CreacionPage() {
  // Estado para almacenar los valores del formulario
  const [formValues, setFormValues] = useState({
    firstName: '',
    secondName: '',
    lastName: '',
    birthDate: '',
    gender: '',
    email: '',
    phone: '',
    documentNumber: '',
    documentType: '',
  });

  // Estado para controlar la visibilidad del modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');  // Para el mensaje del modal
  const [titletTopo, setTitleToponymy] = useState(false);  // Para la toponimia

  // Función para manejar los cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

        // Validaciones básicas del formulario
    if (!/^\d+$/.test(formValues.documentNumber) || formValues.documentNumber.length > 10) {
       setModalMessage("El número de documento debe ser un número de hasta 10 caracteres.");
       setIsModalOpen(true); 
       setTitleToponymy(false);
      return;
    }

    if (!/^[a-zA-Z]+$/.test(formValues.firstName) || formValues.firstName.length > 30) {
     setModalMessage("El primer nombre no debe contener números y debe tener un máximo de 30 caracteres.");
     setIsModalOpen(true); 
     setTitleToponymy(false);

      return;
    }

    if (formValues.secondName && (!/^[a-zA-Z]+$/.test(formValues.secondName) || formValues.secondName.length > 30)) {
     setModalMessage("El segundo nombre no debe contener números y debe tener un máximo de 30 caracteres.");
     setIsModalOpen(true); 
     setTitleToponymy(false);

      return;
    }

    if (!/^[a-zA-Z]+$/.test(formValues.lastName) || formValues.lastName.length > 60) {
       setModalMessage("El apellido no debe contener números y debe tener un máximo de 60 caracteres.");
       setIsModalOpen(true); 
       setTitleToponymy(false);

      return;
    }

    // Validar que la fecha de nacimiento esté en formato yyyy-mm-dd y que sea una fecha válida
    if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.birthDate)) {
       setModalMessage("La fecha de nacimiento debe tener el formato yyyy-mm-dd.");
       setIsModalOpen(true); 
       setTitleToponymy(false);

      return;
    } else {
      const birthDate = new Date(formValues.birthDate);
      const today = new Date();
      if (isNaN(birthDate.getTime()) || birthDate > today) {
        setModalMessage("La fecha de nacimiento debe ser una fecha válida y no puede ser en el futuro.");
        setIsModalOpen(true); 
        setTitleToponymy(false);

        return;
      }
    }

    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no reportar'];
    if (!validGenders.includes(formValues.gender)) {
       setModalMessage("El género debe ser una de las siguientes opciones: Masculino, Femenino, No binario, Prefiero no reportar.");
       setIsModalOpen(true); 
       setTitleToponymy(false);

      return;
    }

    // Validar email con un regex básico (ya que el schema lo pide)
    if (!/.+@.+\..+/.test(formValues.email)) {
      setModalMessage("Debe ingresar un correo electrónico válido.");
      setIsModalOpen(true); 
      setTitleToponymy(false);

      return;
    }

    // Validar que el teléfono tenga exactamente 10 caracteres y sea numérico
    if (!/^\d{10}$/.test(formValues.phone)) {
      setModalMessage("El teléfono debe ser un número de exactamente 10 caracteres.");
      setIsModalOpen(true); 
      setTitleToponymy(false);

      return;
    }

    const validDocumentTypes = ['Cédula', 'Tarjeta de identidad'];
    if (!validDocumentTypes.includes(formValues.documentType)) {
      setModalMessage("El tipo de documento debe ser 'Cédula' o 'Tarjeta de identidad'.");
      setIsModalOpen(true); 
      setTitleToponymy(false);


      return;
    }

    try {
      // Si no se encuentra ninguna coincidencia, procedemos a crear la persona
      const response = await create(formValues);
      console.log('Respuesta de creación:', response);
      
      // Verificar si hubo un error de validación en la creación
      if (!response.success) {
          if (response.status === 400) {
             
              setModalMessage(response.message); // Mostrar el mensaje de error
              setIsModalOpen(true); // Abrir modal para mostrar el error
              setTitleToponymy(false);

          } 
         
          return; 
      }
  
      console.log('Persona creada:', response);
      if(response.status === 201) {
       console.log('Persona creada:', response.data);
     
      const newPersonData = await getByDocument(formValues.documentNumber);
      const formatTextWithBold = (text) => {
       
        return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      };
      
  
      const ModalContent = () => {
        return (
          <div dangerouslySetInnerHTML={{ __html: formatTextWithBold(newPersonData.data.data.toponymy) }} />
        );
      };
      
    
      setModalMessage(<ModalContent />);
      setIsModalOpen(true); 
      setTitleToponymy(true);
      }
  
  } catch (error) {
      console.error("Error al crear persona:", error);
  }
  
    
  };

  // Función para cerrar el modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className={classes.contenedor_boton_volver}>
        <a href="/"><button className={classes.boton_volver}>Volver</button></a>
      </div>
      <div className={classes.titulo}>
        <h1>Crear Persona</h1>
      </div>
      <div className={classes.formContainer}>
        <form onSubmit={handleSubmit} className={classes.form}>
          <div className={classes.tituloform}>
            <h3>Datos Personales</h3>
          </div>
          <div className={classes.nombre}>
            <div>
              Primer Nombre:
              <input
                type="text"
                name="firstName"
                value={formValues.firstName}
                onChange={handleInputChange}
                maxLength="30"
                required
              />
            </div>
            <div>
              Segundo Nombre:
              <input
                type="text"
                name="secondName"
                value={formValues.secondName}
                onChange={handleInputChange}
                maxLength="30"
              />
            </div>
            <div>
              Apellido:
              <input
                type="text"
                name="lastName"
                value={formValues.lastName}
                onChange={handleInputChange}
                maxLength="60"
                required
              />
            </div>
          </div>
          <div className={classes.fecha_genero}>
            <div>
              Fecha de Nacimiento:
              <input
                type="date"
                name="birthDate"
                value={formValues.birthDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              Género:
              <select
                name="gender"
                value={formValues.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
                <option value="No binario">No Binario</option>
                <option value="Prefiero no reportar">Prefiero no reportar</option>
              </select>
            </div>
          </div >
          <div className={classes.correo_telefono} >
            <div>
              Correo Electrónico:
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              Teléfono:
              <input
                type="tel"
                name="phone"
                value={formValues.phone}
                onChange={handleInputChange}
                maxLength="10"
                required
              />
            </div>
          </div>
          <div className={classes.tip_doc} >
            <div>
              Tipo de Documento:
              <select
                name="documentType"
                value={formValues.documentType}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccionar</option>
                <option value="Tarjeta de identidad">Tarjeta de identidad</option>
                <option value="Cédula">Cédula</option>
              </select>
            </div>
            <div>
              Número de Documento:
              <input
                type="text"
                name="documentNumber"
                value={formValues.documentNumber}
                onChange={handleInputChange}
                maxLength="10"
                required
              />
            </div>
          </div>
          <div className={classes.boton_enviar}>
            <button type="submit">Crear Persona</button>
          </div>
        </form>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
           {titletTopo ? <h1> Origen Toponimico </h1> : <h1>  </h1>}
             
            <p>{modalMessage}</p> 
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
