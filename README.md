# Red Social - Prueba Técnica Periferia

Este proyecto es una aplicación de microservicios que permite el registro, login y publicación de posts en una red social. Implementa una arquitectura moderna con comunicación entre servicios, base de datos relacional y despliegue en Kubernetes.

## 🚀 Tecnologías Utilizadas

- **Frontend:** React, Vite, Zustand, Vitest.
- **Backend:** Node.js, Express, TypeScript, Sequelize (ORM).
- **Base de Datos:** PostgreSQL.
- **Infraestructura:** Kubernetes (K8s), Docker.
- **Documentación:** Swagger (OpenAPI 3.0).

## 🛠️ Requerimientos Cubiertos

- [x] **Microservicios:** Separación de lógica de Autenticación y Publicaciones.
- [x] **Seeder Dinámico:** El servicio de Posts genera automáticamente un post inicial por cada usuario existente en Auth (sin duplicados).
- [x] **Swagger:** Documentación interactiva disponible en cada microservicio.
- [x] **Pruebas Unitarias:** Cobertura con Jest (Backend) y Vitest (Frontend).
- [x] **Modo Oscuro:** Implementación persistente con Tailwind CSS.
- [x] **K8s:** Despliegue de base de datos y servicios en clúster.

## 📦 Instalación y Uso

- kubernetes:

```bash
kubectl apply -f k8s/
```

### Despliegue en Kubernetes

**Servicio Tipo Puerto Interno Puerto Externo**
Servicio,Tipo,Puerto Interno,Puerto Externo (NodePort)
Database,ClusterIP,5432,N/A
Auth Service,NodePort,4000,30000
Posts Service,NodePort,4001,30001
Frontend,NodePort,80,30002

### 1. Clonar el repositorio

```bash
git clone <tu-url-de-github>
cd testBackend-periferia
```
