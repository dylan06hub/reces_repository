Carniceria Reses
Página:

Tecnologías utilizadas
React 
React Router DOM 
CSS 
Typescript 
Vite
Instalación
Clonar el repositorio:

 git clone https://github.com/dylan06hub/reces_repository.git 
cd [repositorio]

Instalar las dependencias:

 npm install

Crear un archivo .env en la raíz del proyecto con las variables necesarias:

 VITE_API_URL=[url]

Comandos para ejecutar el proyecto
npm run dev
Levanta el servidor de desarrollo
npm run build
Genera la build de producción
npm run preview
Sirve la build de producción localmente

Estructura del proyecto
- `src/main.tsx`: entrada de la aplicación.
- `src/App.tsx`: contenedor principal y layout global.
- `src/router.tsx`: rutas disponibles.
- `src/components/`: componentes compartidos entre vistas.
- `src/pages/`: páginas `Home`, `Nosotros` y `Contacto`.
- `src/data/`: catálogo de productos.
- `src/hooks/`: lógica reutilizable de productos y formularios.
- `src/utils/`: formateadores y validaciones.
- `src/styles/global.css`: variables, reset y estilos globales.

