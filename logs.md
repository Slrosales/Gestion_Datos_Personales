# Instrucciones para Verificar los Logs de Transacciones

## ¿Qué son los logs en el sistema?
Los logs en este sistema representan un historial de todas las transacciones que se realizan, como la **creación**, **eliminación** y **actualización** de registros en la base de datos. Cada transacción queda registrada con detalles como el número de documento y los cambios realizados, junto con la fecha y hora en que ocurrió la operación.

## Consultar los Logs Usando Postman

### 1. Consultar **todos** los logs

1. **Método**: **GET**
2. **URL**: `http://localhost:5000/api/logs`
3. **Descripción**: Esta llamada devolverá un listado de todas las transacciones registradas en el sistema, incluyendo la acción (crear, eliminar, actualizar), el número de documento, los detalles de la transacción y la fecha/hora.

#### Ejemplo de Respuesta:
```json
{
  "message": "Logs encontrados",
  "data": [
    {
      "action": "create",
      "documentNumber": "1022525679",
      "details": {
        "firstName": "Laura",
        "lastName": "Gómez",
        ...
      },
      "timestamp": "2024-10-15T21:45:00Z"
    },
    {
      "action": "update",
      "documentNumber": "1022525679",
      "details": {
        "before": { "firstName": "Laura" },
        "after": { "firstName": "Laurita" }
      },
      "timestamp": "2024-10-16T12:30:00Z"
    }
  ]
}
```

### 2. Filtrar logs por tipo de acción (crear, actualizar o eliminar)

Puedes buscar logs específicos utilizando parámetros de consulta (query params) en la URL.

1. **Método**: **GET**
2. **URL**: `http://localhost:5000/api/logs?action=create` 
3. **Descripción**: Devuelve solo los logs donde la acción fue "crear". Puedes cambiar `create` por `update` o `delete` según lo que necesites.

### 3. Filtrar logs por número de documento

1. **Método**: **GET**
2. **URL**: `http://localhost:5000/api/logs?documentNumber=1022525679`
3. **Descripción**: Devuelve los logs relacionados con un documento específico.

#### Ejemplo de Respuesta:
```json
{
  "message": "Logs encontrados",
  "data": [
    {
      "action": "create",
      "documentNumber": "1022525679",
      "details": { "firstName": "Laura", "lastName": "Gómez" },
      "timestamp": "2024-10-15T21:45:00Z"
    },
    {
      "action": "update",
      "documentNumber": "1022525679",
      "details": { "before": { "firstName": "Laura" }, "after": { "firstName": "Laurita" } },
      "timestamp": "2024-10-16T12:30:00Z"
    }
  ]
}
```

### 4. Filtrar logs por rango de fechas

Si deseas consultar logs en un rango de fechas, puedes añadir parámetros de fechas en la URL.

1. **Método**: **GET**
2. **URL**: `http://localhost:5000/api/logs?from=2024-10-10&to=2024-10-20`
3. **Descripción**: Devuelve los logs entre las fechas `2024-10-10` y `2024-10-20`.

---

### Verificación Manual de los Logs en MongoDB (Opcional)

Si prefieres verificar los logs directamente en la base de datos MongoDB, sigue estos pasos:

1. Accede a tu contenedor de MongoDB:
   ```bash
   docker exec -it mongodb bash
   ```

2. Abre el shell de MongoDB:
   ```bash
   mongo
   ```

3. Conéctate a la base de datos `gestion-datos`:
   ```bash
   use gestion-datos
   ```

4. Lista los logs almacenados:
   ```bash
   db.logs.find().pretty()
   ```

---

### Resumen:
- **Consulta general**: Usa `http://localhost:5000/api/logs`.
- **Filtrado por acción o número de documento**: Usa parámetros en la URL.
- **MongoDB**: Puedes verificar los logs directamente usando el shell de MongoDB.