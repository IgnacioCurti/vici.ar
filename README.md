# vici.ar

Este repositorio contiene el proyecto vici.ar. A continuación se encuentran buenas prácticas recomendadas para programación y uso de Git por el equipo.

**Buenas Prácticas de Programación**

- **Legibilidad:** Escriba código claro y fácil de leer. Use nombres descriptivos para variables, funciones y clases.
- **Modularidad:** Divida la lógica en funciones y módulos pequeños y con una sola responsabilidad.
- **Documentación:** Añada comentarios cuando la intención no sea obvia y mantén la documentación actualizada. Use README.md y comentarios en el código para explicar decisiones importantes.
- **Pruebas:** Cubra la lógica crítica con pruebas automatizadas (unitarias, de integración). Ejecute las pruebas antes de abrir un pull request.
- **Manejo de errores:** Maneje errores de forma explícita y escriba mensajes que ayuden al diagnóstico.
- **Performance:** Optimice solo cuando haya evidencia de problemas. Es preferible soluciones simples y medibles.
- **Seguridad:** Evite exponer secretos en el repositorio. Use variables de entorno y almacenamiento seguro para credenciales.
- **Revisión de Código:** Solicite y responda revisiones. Apunte a pull requests pequeños y fáciles de revisar.

**Buenas Prácticas de Git**

- **Commits atómicos:** Cada commit debe representar un cambio lógico y autocontenido.
- **Mensajes claros:** Escriba mensajes de commit descriptivos, por ejemplo: "Agrega validación de email en el formulario de registro".
- **Rebase vs Merge:** Rebase localmente para mantener un historial lineal cuando trabajes en una rama feature. Evita reescribir historial compartido.
- **Pull requests pequeños:** Los PRs deben ser lo suficientemente pequeños para revisar con facilidad. Incluya descripción clara y pasos para probar.
- **Ramas:** Siga la convención de nombres de ramas descrita más abajo.
- **Protección de ramas:** La rama main (o master) debe estar protegida y requerir revisiones antes de merge.

Usaremos dos ramas principales para coordinar el flujo de trabajo y despliegue:

- `main`: rama estable desde la que se tomará el código para el deploy en producción. Solo deben mergearse a `main` cambios ya revisados y probados.
- `dev`: rama de integración donde se mergearán las `feature/*` y `fix/*`. En `dev` se realizan pruebas de integración y verificación antes de preparar releases o mergear a `main`.

Reglas rápidas:

- Hacer merge a `dev` cuando la feature/fix esté lista y aprobada por revisión.
- Ejecutar pruebas en `dev` y resolver conflictos antes de promover cambios a `main`.
- Hacer merge a `main` solo para versiones listas para producción.
**Convención de nombres de ramas**

Usaremos el siguiente formato para las ramas de trabajo:

- Para nuevas funcionalidades:
  - Backend: `feature/BE-nombreDeLaFeature` (ejemplo: `feature/BE-login-con-token`)
  - Frontend: `feature/FE-nombreDeLaFeature` (ejemplo: `feature/FE-pantalla-login`)
- Para correcciones (bug fixes):
  - Backend: `fix/BE-nombreDelFix` (ejemplo: `fix/BE-validacion-email`)
  - Frontend: `fix/FE-nombreDelFix` (ejemplo: `fix/FE-estilos-boton`)

Reglas adicionales:

- Use `-` para separar palabras dentro del nombre de la feature.
- Mantenga los nombres cortos pero descriptivos (no más de 4-6 palabras cuando sea posible).
- Si su trabajo incluye cambios en ambos lados (backend y frontend), cree ramas separadas por cada repositorio o, si trabaja en mono-repo, especifique ambos prefijos cuando corresponda (por ejemplo `feature/FE-BE-nombre`), aunque preferimos ramas separadas por responsabilidad.

**Flujo sugerido**

1. Sincronice `main`: `git checkout main` y `git pull origin main`.
2. Cree su rama: `git checkout -b feature/FE-mi-feature`.
3. Trabaje y haga commits atómicos frecuentemente.
4. Mantenga tu rama actualizada con `main` mediante rebase o merge: `git fetch origin` y `git rebase origin/main`.
5. Pushee la rama remota: `git push -u origin feature/FE-mi-feature`.
6. Abra un Pull Request para revisión.

**Checklist antes de abrir un Pull Request**

- [ ] Código compilado y lint pasado.
- [ ] Pruebas relevantes agregadas y pasando.
- [ ] Documentación o notas de implementación incluidas en la descripción del PR.
- [ ] No hay secretos en los cambios.
- [ ] La rama está actualizada con `main`.
