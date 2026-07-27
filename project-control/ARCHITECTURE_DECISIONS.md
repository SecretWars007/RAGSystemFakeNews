## Dependencias Backend

Las dependencias Python se gestionan exclusivamente desde:

backend/requirements.txt

No se permiten instalaciones manuales dentro de contenedores.

Motivo:

Garantizar builds reproducibles mediante Docker.


# ADR-003

## Clean Architecture

Decisión:

Separar reglas de negocio de infraestructura.

Motivo:

Permitir reemplazar PostgreSQL, ORM o framework web sin modificar el dominio.
