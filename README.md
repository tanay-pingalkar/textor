![logo](https://github.com/tanay-pingalkar/textor/blob/main/client/public/logo.svg)

# textor

## a minimal online platform for serious discussions in development !


## setting up on local machine
- `fork and clone the repo`
- `yarn` 
- `cd client && yarn`
- `cd server && yarn` 

- `cd server && touch .env` 
- fill 
```
JWT_SECRET=a_random_string
NAME=db_name
PASSWORD=db_password
DATABASE=db_name `CREATE DATABASE textor;`
```
- `cd server && yarn start`
- `cd client && yarn dev` 
