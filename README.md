
# Gestor de Pagos

## Descripción del Proyecto

Este proyecto es un **gestor de pagos** diseñado para que prestamistas puedan generar y actualizar sus préstamos, mientras que los usuarios con préstamos pueden buscarlos y pagarlos fácilmente. El sistema está dirigido tanto a **independientes** como a **empresas** que desean gestionar sus préstamos de manera más eficiente, dejando atrás la necesidad de llevar registros en papel. Además, proporciona **estadísticas** para facilitar la toma de decisiones.

## Arquitectura del Proyecto

El proyecto sigue una **arquitectura de microservicios**, lo que permite escalabilidad y modularidad. Los microservicios principales son:

- **Auth-Service**: Encargado de la autenticación y autorización de los usuarios.
- **Gateway**: Maneja las solicitudes y redirige el tráfico a los microservicios correspondientes.
- **Loan-Service**: Gestión de los préstamos y sus actualizaciones.
- **Payment-Service**: Manejo de los pagos realizados por los usuarios.
- **Shared**: Contiene recursos comunes que son utilizados por varios servicios.

## Tecnologías y Herramientas

El proyecto utiliza las siguientes tecnologías:

- **Lenguaje y Framework**: Node.js con Express y TypeScript.
- **Base de Datos**: MongoDB para los microservicios individuales y MySQL como base de datos central.
- **Contenedores**: Docker y Docker Compose para gestionar los entornos y servicios.

## Instalación

### Requisitos Previos

Asegúrate de tener instalados los siguientes componentes:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [MySQL](https://www.mysql.com/)

### Pasos de Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/aalejandrozuleta/paymentManager.git
   ```

2. Instalar las dependencias en cada microservicio:
   ```bash
   npm install
   ```

3. Configurar las variables de entorno necesarias para cada microservicio. Los detalles se encuentran en el archivo `.env.example` de cada servicio.

4. Levantar los servicios con Docker Compose:
   ```bash
   docker-compose up --build
   ```

## Uso del Proyecto

El proyecto cuenta con un frontend desarrollado en **React con TypeScript**, desde donde los usuarios pueden interactuar con la aplicación.

Existen dos tipos de usuarios:

- **Lenders**: Prestamistas que pueden generar y gestionar préstamos.
- **Admin**: Administradores que tienen control completo sobre la plataforma.

## Documentación de Endpoints

Los endpoints de la API solo son accesibles a través del **frontend**, por lo que no están expuestos públicamente para consumo externo.

## Contribución

Este proyecto **no acepta contribuciones** externas en este momento.

## Licencia

Este proyecto **no tiene licencia**.
