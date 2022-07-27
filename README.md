# Next.js OpenJira App
Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

*El -d, significa __detached

*MongoDB URL Local:

```
mongodb://localhost:27017/entriesdb
```

##Configurar las variables de entorno
Renombrar el archivo __.env.template__a__.env__

* MongoDB URL Local:
```
MONGO_URL=mongodb://localhost:27017/entriesdb
```

* Reconstruir los modulos de node y levantar NextJs
```
yarn install
yarn dev
```


## Llenar la base de datos con la inforamcion de pruebas

LLamara: con postman usualmente

```
http://localhost:3000/api/seed
```