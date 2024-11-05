import React, { useState } from 'react';
import classes from './CreacionPage.module.css';
import { create, getByDocument } from '../../Services/PersonService'; 

export default function CreacionPage() {
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

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');  
  const [titletTopo, setTitleToponymy] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!/^\d+$/.test(formValues.documentNumber) || formValues.documentNumber.length > 10) {
      newErrors.documentNumber = "El número de documento debe ser un número de hasta 10 caracteres.";
    }

    if (!/^[a-zA-Z]+$/.test(formValues.firstName) || formValues.firstName.length > 30) {
      newErrors.firstName = "El primer nombre no debe contener números y debe tener un máximo de 30 caracteres.";
    }

    if (formValues.secondName && (!/^[a-zA-Z]+$/.test(formValues.secondName) || formValues.secondName.length > 30)) {
      newErrors.secondName = "El segundo nombre no debe contener números y debe tener un máximo de 30 caracteres.";
    }

    if (!/^[a-zA-Z]+$/.test(formValues.lastName) || formValues.lastName.length > 60) {
      newErrors.lastName = "El apellido no debe contener números y debe tener un máximo de 60 caracteres.";
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(formValues.birthDate)) {
      newErrors.birthDate = "La fecha de nacimiento debe tener el formato yyyy-mm-dd.";
    } else {
      const birthDate = new Date(formValues.birthDate);
      const today = new Date();
      if (isNaN(birthDate.getTime()) || birthDate > today) {
        newErrors.birthDate = "La fecha de nacimiento debe ser válida y no puede ser en el futuro.";
      }
    }

    const validGenders = ['Masculino', 'Femenino', 'No binario', 'Prefiero no reportar'];
    if (!validGenders.includes(formValues.gender)) {
      newErrors.gender = "El género debe ser una opción válida.";
    }

    if (!/.+@.+\..+/.test(formValues.email)) {
      newErrors.email = "Debe ingresar un correo electrónico válido.";
    }

    if (!/^\d{10}$/.test(formValues.phone)) {
      newErrors.phone = "El teléfono debe ser un número de exactamente 10 caracteres.";
    }

    const validDocumentTypes = ['Cédula', 'Tarjeta de identidad'];
    if (!validDocumentTypes.includes(formValues.documentType)) {
      newErrors.documentType = "El tipo de documento debe ser 'Cédula' o 'Tarjeta de identidad'.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const response = await create(formValues);

      if (!response.success) {
        setModalMessage(response.message || "Ocurrió un error en la creación."); 
        setIsModalOpen(true); 
        setTitleToponymy(false);
        return;
      }
      
      if(response.status === 201) {
        const newPersonData = await getByDocument(formValues.documentNumber);
        const formatTextWithBold = (text) => text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        const ModalContent = () => (
          <div dangerouslySetInnerHTML={{ __html: formatTextWithBold(newPersonData.data.data.toponymy) }} />
        );

        setModalMessage(<ModalContent />);
        setIsModalOpen(true); 
        setTitleToponymy(true);
      }

    } catch (error) {
      console.error("Error al crear persona:", error);
      setModalMessage("Hubo un problema con el servidor. Inténtalo de nuevo más tarde.");
      setIsModalOpen(true); 
      setTitleToponymy(false);
    } finally {
      setIsLoading(false);
    }
  };

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
              {errors.firstName && <p className={classes.error}>{errors.firstName}</p>}
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
              {errors.secondName && <p className={classes.error}>{errors.secondName}</p>}
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
              {errors.lastName && <p className={classes.error}>{errors.lastName}</p>}
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
              {errors.birthDate && <p className={classes.error}>{errors.birthDate}</p>}
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
              {errors.gender && <p className={classes.error}>{errors.gender}</p>}
            </div>
          </div>
          <div className={classes.correo_telefono}>
            <div>
              Correo Electrónico:
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <p className={classes.error}>{errors.email}</p>}
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
              {errors.phone && <p className={classes.error}>{errors.phone}</p>}
            </div>
          </div>
          <div className={classes.tip_doc}>
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
              {errors.documentType && <p className={classes.error}>{errors.documentType}</p>}
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
              {errors.documentNumber && <p className={classes.error}>{errors.documentNumber}</p>}
            </div>
          </div>
          <div className={classes.boton_enviar}>
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Creando..." : "Crear Persona"}
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            {titletTopo ? <h1> Origen Toponímico </h1> : null}
            <p>{modalMessage}</p> 
            <button onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
}
