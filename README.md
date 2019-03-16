# Blockchain Web DB

Powered by: [![N|Solid](http://gisai.dit.upm.es/wp-content/uploads/logo-gisai.png)](http://gisai.dit.upm.es/)

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Proyecto de ejemplo para la consulta y provisión de información desde una página Web con Node y Express hacia la Blockchain, y la provisión de información hacia una base de datos MySQL off-chain.

  - Característica 1
  - Característica 2

### Installation

Se requiere la instalación de los siguientes paquetes software:
-  [Node.js](https://nodejs.org/) v10+.
-  [Git](https://git-scm.com/downloads) v2+.
-  [Ganache](https://truffleframework.com/ganache) v1.3+
-  Una base de datos MySQL. Recomendamos el paquete [XAMPP](https://www.apachefriends.org/download.html) v7+  

Instalamos truffle.

```sh
$ npm install -g truffle
```

Instalamos las dependencias de Web3. IMPORTANTE: Ejecutar en PowerShell y como administradores:

```sh
$ npm install --global --production windows-build-tools
```
Descargamos el repositorio de GitHub. 

Arrancamos Ganache.

Abrimos un terminal, vamos a la carpeta del sub-proyecto DBManager y ejecutamos:
```sh
$ truffle compile --all
$ truffle migrate
```
Al hacer este último comando aparece un resultado como el de la siguiente imagen. Anote la información correspondiente con contract address para el contrato de 'Gestion':

<p align="center">
<img src="https://github.com/gisai/BlockchainWebDB/raw/master/documentacion/contract_address.png" width="750">
</p>

Antes de proseguir, hemos de introducir la dirección donde se ha desplegado el contrato en nuestros proyectos. En WebServer\routes\index.js y en DBManager\oracle.js modificamos el valor de "const contractAddress" por el valor que nos aparece en la consola al haber hecho 'truffle migrate' (en amarillo en la imagen).

Procedemos a la instalación del sub-proyecto WebServer. Dentro de la carpeta WebServer ejecutamos:

```sh
$ npm install
$ npm run dev
```

Esta última orden lanzará el servidor en localhost:3000

Para la parte de base de datos, iniciamos nuestro servidor MySQL, nos aseguramos de que está lanzado en localhost:3306.
Dentro del proyecto DBManager ejecutamos:

```sh
$ npm install
$ npm run dev
```

En la capeta documentación hay un archivo sql para crear una talba de ejemplo en la base de datos y así poder jugar con las consultas a través de la blockchain. Consultas que se puede hacer:
```sql
INSERT INTO video_games (ID, name, owner, console, price, players, comments) VALUES (51, 'New Super Mario Bros', 'John', 'Wii', 4, 1, 'Incredible!')
SELECT name FROM video_games WHERE console = 'Nintendo 64'
SELECT name FROM video_games WHERE price >30
UPDATE video_games SET owner='Kathy' WHERE ID=1
```

License
----

Copyright VACADENA
**All rights reserved**
