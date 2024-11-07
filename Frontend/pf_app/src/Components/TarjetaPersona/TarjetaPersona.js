import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import classes from './TarjetaPersona.module.css';
import { deleteByDocument, updateByDocument, update_img } from '../../Services/PersonService';

function TarjetaPersona({ Persona, onDelete }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedPersona, setUpdatedPersona] = useState({ ...Persona });
  const [errors, setErrors] = useState({});
  const birthDateRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageTimestamp, setImageTimestamp] = useState(Date.now());

  // useEffect para actualizar el timestamp cuando se cambia la imagen de perfil
  useEffect(() => {
    if (updatedPersona.profilePicture) {
      console.log("Imagen actualizada:", updatedPersona.profilePicture);
      setImageTimestamp(Date.now()); // Actualiza el timestamp para forzar la recarga de la imagen
    }
  }, [updatedPersona.profilePicture]);

  // Manejo de modales
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleOpenUpdateModal = () => setIsUpdateModalOpen(true);
  const handleCloseUpdateModal = () => setIsUpdateModalOpen(false);

  // Eliminar Persona
  const handleDelete = async () => {
    const response = await deleteByDocument(Persona.documentNumber);
    if (response.success) {
      console.log('Persona eliminada');
      if (onDelete) onDelete(Persona.documentNumber);
    }
  };

  // Formateo de fecha
  const formatBirthDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    const day = date.getUTCDate().toString().padStart(2, '0');
    const month = date.toLocaleString("es-ES", { month: "short", timeZone: "UTC" });
    const year = date.getUTCFullYear();
    return `${day}-${month}-${year}`;
  };

  // Validación de campos
  const validateField = (name, value) => {
    switch (name) {
      case 'secondName':
        if (!isNaN(value)) return 'No debe ser un número';
        if (value.length > 30) return 'Máximo 30 caracteres';
        break;
      case 'lastName':
        if (!isNaN(value)) return 'No debe ser un número';
        if (value.length > 60) return 'Máximo 60 caracteres';
        break;
      case 'birthDate':
        const selectedDate = new Date(value);
        const today = new Date();
        if (selectedDate > today) return 'No puede ser una fecha futura';
        break;
      case 'phone':
        if (!/^\d{10}$/.test(value)) return 'Debe ser un número de 10 dígitos';
        break;
      default:
        return null;
    }
    return null;
  };

  // Manejo de cambios en los campos
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    setUpdatedPersona((prevState) => ({ ...prevState, [name]: value }));
  };

  // Manejo de la actualización de imagen
  const handleImageUpdate = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        profilePicture: 'La imagen no debe superar los 2 MB.'
      }));
      setSelectedImage(null);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, profilePicture: '' }));
      setSelectedImage(file);
    }
  };

  // Actualizar Persona y reflejar los cambios en tiempo real
  const handleUpdate = async () => {
    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      console.error("Hay errores en el formulario");
      return;
    }

    // Si hay una imagen seleccionada, crea FormData y pasa la imagen a update_img
    if (selectedImage) {
      const formData = new FormData();
      formData.append('profilePicture', selectedImage);

      const imageResponse = await update_img(Persona.documentNumber, formData);
      if (imageResponse.success) {
        console.log('Imagen actualizada con éxito:', imageResponse.data.updatedProfilePicture);

        // Actualizar el estado `updatedPersona` con la nueva imagen
        setUpdatedPersona((prev) => ({
          ...prev,
          profilePicture: imageResponse.data.updatedProfilePicture,
        }));

        //recargar la pagina 
        window.location.reload();

        setSelectedImage(null);
      } else {
        console.error('Error al actualizar la imagen:', imageResponse.message);
        return;
      }
    }

    // Actualizar otros campos de la persona
    const response = await updateByDocument(Persona.documentNumber, updatedPersona);
    if (response.success) {
      console.log('Persona actualizada con éxito');
      Object.assign(Persona, updatedPersona);
      setIsModalOpen(true);
      setIsUpdateModalOpen(false);
    } else {
      console.error('Error al actualizar:', response.message);
    }
  };

  return (
    <div className={classes.tarjetaConPiernas}>
      {/* Animaciones de ojos y piernas */}
      <motion.div className={classes.ojos} initial={{ y: 0 }} animate={{ y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}>
        <img src="https://iili.io/236ch2s.png" alt="Ojo izquierdo" className={classes.ojo} />
        <img src="https://iili.io/236ch2s.png" alt="Ojo derecho" className={classes.ojo} />
      </motion.div>
      <div className={classes.legs}>
        <motion.div className={classes.leg} initial={{ rotate: 0 }} animate={{ y: [0, 0, 2] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }} />
        <motion.div className={classes.leg} initial={{ rotate: 0 }} animate={{ y: [2, 0, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatType: 'mirror' }} />
      </div>

      <motion.div className={classes.tarjeta} initial={{ y: 0 }} animate={{ y: [0, -2, 0] }} transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}>
        <div className={classes.contenido}>
          <div className={classes.nombre}>
            <h2>{updatedPersona.firstName} {updatedPersona.lastName}</h2>
          </div>
        </div>
        <div className={classes.boton_detalles}>
          <button onClick={handleOpenModal}>Ver detalles</button>
        </div>
        <div className={classes.boton_eliminar}>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      </motion.div>

      {/* Modal de detalles */}
      {isModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h2 className={classes.tituloModal}>Detalles de la persona</h2>
            <div className={classes.principal}>
              <div className={classes.detalles}>
                <img 
                  src={updatedPersona.profilePicture 
                    ? `http://localhost:5000/uploads/${updatedPersona.profilePicture}?t=${imageTimestamp}`
                    : "ruta/de/imagen/predeterminada.jpg"} // Imagen predeterminada si `profilePicture` es undefined
                  alt="Foto de la persona" 
                  className={classes.profilePicture} 
                />
                <p><span className={classes.color}>Nombre:</span> {updatedPersona.firstName}</p>
                {updatedPersona.secondName && <p><span className={classes.color}>Segundo nombre:</span> {updatedPersona.secondName}</p>}
                <p><span className={classes.color}>Apellido:</span> {updatedPersona.lastName}</p>
              </div>

              <div className={classes.detalles}>
                <p><span className={classes.color}>Tipo de documento:</span> {updatedPersona.documentType}</p>
                <p><span className={classes.color}>Documento:</span> {updatedPersona.documentNumber}</p>
                <p><span className={classes.color}>Fecha de nacimiento:</span> {formatBirthDate(updatedPersona.birthDate)}</p>
              </div>

              <div className={classes.detalles}>
                <p><span className={classes.color}>Teléfono:</span> {updatedPersona.phone}</p>
                <p><span className={classes.color}>Email:</span> {updatedPersona.email}</p>
                <p><span className={classes.color}>Género:</span> {updatedPersona.gender}</p>
              </div>
            </div>
            <div className={classes.botones}>
              <button className={classes.boton_g} onClick={handleCloseModal}>Cerrar</button>
              <button className={classes.boton_c} onClick={handleOpenUpdateModal}>Actualizar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de actualización */}
      {isUpdateModalOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent}>
            <h2 className={classes.tituloModal}>Actualizar Persona</h2>
            <div className={classes.principal}>
              <div className={classes.detalles}>
                <label>Segundo Nombre:</label>
                <input
                  type="text"
                  name="secondName"
                  value={updatedPersona.secondName || ''}
                  onChange={handleInputChange}
                />
                {errors.secondName && <p className={classes.error}>{errors.secondName}</p>}
              </div>
              <div className={classes.detalles}>
                <label>Apellido:</label>
                <input
                  type="text"
                  name="lastName"
                  value={updatedPersona.lastName}
                  onChange={handleInputChange}
                />
                {errors.lastName && <p className={classes.error}>{errors.lastName}</p>}
              </div>
              <div className={classes.detalles}>
                <label>Fecha de nacimiento:</label>
                <input
                  type="date"
                  name="birthDate"
                  ref={birthDateRef}
                  value={updatedPersona.birthDate}
                  onChange={handleInputChange}
                />
                {errors.birthDate && <p className={classes.error}>{errors.birthDate}</p>}
              </div>
              <div className={classes.detalles}>
                <label>Género:</label>
                <select
                  name="gender"
                  value={updatedPersona.gender}
                  onChange={handleInputChange}
                >
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="No binario">No binario</option>
                  <option value="Prefiero no reportar">Prefiero no reportar</option>
                </select>
              </div>
              <div className={classes.detalles}>
                <label>Teléfono:</label>
                <input
                  className={classes.input}
                  type="text"
                  name="phone"
                  value={updatedPersona.phone}
                  onChange={handleInputChange}
                />
                {errors.phone && <p className={classes.error}>{errors.phone}</p>}
              </div>
            </div>
            <p className={classes.tituloI}>Imagen de Perfil (máx. 2 MB):</p>
            <div
              className={`${classes.imageUpload} ${isDragOver ? classes.dragOver : ''}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleImageUpdate}
            >
              <label htmlFor="profilePicture" className={classes.uploadButton}>
                {selectedImage ? selectedImage.name : 'Seleccionar Imagen'}
              </label>
              <input
                id="profilePicture"
                type="file"
                name="profilePicture"
                accept="image/*"
                onChange={handleImageUpdate}
                className="hidden"
              />
              {errors.profilePicture && (
                <p className={classes.error}>{errors.profilePicture}</p>
              )}
            </div>
            <div className={classes.botones}>
              <button className={classes.boton_g} onClick={handleUpdate}>Guardar Cambios</button>
              <button className={classes.boton_c} onClick={handleCloseUpdateModal}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TarjetaPersona;
