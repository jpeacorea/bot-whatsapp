# Bot de WhatsApp con Baileys y TypeScript

Este es un proyecto base para la creación de un bot de WhatsApp, utilizando [Baileys](https://github.com/WhiskeySockets/Baileys), la potente librería de Node.js para interactuar con la API de WhatsApp Web. El proyecto está construido sobre TypeScript, proporcionando un entorno de desarrollo robusto y escalable.

## ✨ Características

*   **Base en TypeScript:** Código tipado, limpio y mantenible.
*   **Conexión con Baileys:** Listo para conectar con WhatsApp y empezar a automatizar.
*   **Manejo de Sesión:** Configurado para guardar y reutilizar la sesión de autenticación.
*   **Variables de Entorno:** Usa `dotenv` para una configuración segura y flexible.
*   **Scripts listos para usar:** Scripts para desarrollo, compilación y ejecución.

## 📋 Requisitos Previos

Asegúrate de tener instalado lo siguiente en tu sistema:

*   Node.js (se recomienda la versión 18.x o superior)
*   npm o yarn

## 🚀 Instalación

Sigue estos pasos para poner en marcha el proyecto:

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DE_TU_REPOSITORIO>
    cd <NOMBRE_DE_LA_CARPETA>
    ```

2.  **Instala las dependencias:**
    *   Con npm:
        ```bash
        npm install
        ```
    *   O con yarn:
        ```bash
        yarn install
        ```

## ⚙️ Configuración

La configuración del bot se gestiona a través de variables de entorno.

1.  Crea una copia del archivo de ejemplo `.env.example`:
    ```bash
    cp .env.example .env
    ```

2.  Abre el archivo `.env` y modifica las variables según tus necesidades. Por ejemplo:
    ```env
    # El prefijo que usarán los comandos del bot (ej. !, /, .)
    PREFIX="!"

    # El número de teléfono del dueño del bot para notificaciones o comandos especiales
    OWNER_NUMBER="5211234567890"
    ```

## ▶️ Uso

Una vez instalado y configurado, puedes ejecutar el bot con los siguientes comandos:

*   **Modo de desarrollo (con recarga automática):**
    ```bash
    npm run dev
    ```

*   **Compilar para producción:**
    Este comando compilará el código TypeScript a JavaScript en la carpeta `dist`.
    ```bash
    npm run build
    ```

*   **Iniciar en producción:**
    Este comando ejecuta el código compilado desde la carpeta `dist`. Asegúrate de haber ejecutado `npm run build` primero.
    ```bash
    npm start
    ```

La primera vez que ejecutes el bot, es posible que necesites escanear un código QR desde tu teléfono para autenticar la sesión.

## 📁 Estructura del Proyecto (Sugerida)

```
├── src/ 
│ ├── bot.ts # Lógica principal del bot y conexión │ ├── handlers/ # Manejadores de mensajes, comandos, etc. 
│ │ └── message.ts 
│ ├── commands/ # Definición de los comandos del bot 
│ │ └── ping.ts 
│ └── utils/ # Funciones de utilidad 
├── dist/ # Carpeta con el código compilado (autogenerada) 
├── sessions/ # Carpeta para guardar la sesión (autogenerada) 
├── .env # Variables de entorno (local) 
├── .env.example # Ejemplo de variables de entorno ├── package.json 
├── tsconfig.json 
└── README.md
```


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
