*SW4_Proj_API_Eventos*

Pasos para ejecutar código:

1. Ejecutar los siguientes Comandos en la terminal (verificar de estar ubicado dentro de    la carpeta raíz del proyecto):

      npm init

      npm install express mysql2 ejs body-parser express-session dotenv express-validator boostrap method-override

      npm install --save-dev nodemon

2. Ir a nuestro gestor de base de datos y crear un base de datos en MySQL, el nombre puede ser a nuestra eleccion.

3. Variables de entorno:

    Pasos para crear el archivo con las variable de entorno (.env)

      * Crear un archivo dentro de la carpeta raíz del proyecto llamado .env, el archivo debe de contener las siguientes variables:
	
          DB_HOST = //Ponemos el host en el cual se ubica nuestra BD, predeterminado localhost

          DB_USER = //Ponemos el usuario con el cual ingresamos a nuestro gestor de BD

          DB_PASSWORD = //Ponemos la contraseña con la cual ingresamos a nuestro gestor de BD

          DB_NAME = //Ponemos el nombre que le asignamos a la BD que creamos en nuestro gestor de BD
    
        Guardamos los cambios y cerramos el archivo

4. Ejecutar comando para correr el codigo:

      Una vez terminado el .env, volvemos a la terminal, nos ubicamos dentro de la carpeta raiz del proyecto y ejecutamos el siguiente comando:

       node --watch app.js
