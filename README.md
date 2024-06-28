# Backend Do BurgerQueen

## Índice

- [Projeto](#projeto)
- [Como rodar](#como-rodar)
- [Rede Social](#como-rodar)

## Projeto 
Bem-vindo ao BurgerQueen API, uma plataforma backend robusta projetada para suportar um ecossistema de e-commerce dinâmico e eficiente. Este projeto visa oferecer uma API escalável e flexível para facilitar operações de venda online, gestão de produtos e interações com clientes. Este documento README irá guiá-lo através das informações básicas sobre o projeto.

## Como rodar

Para rodar o projeto, você precisará ter:

-[NPM](https://www.npmjs.com/) <br>
-[Docker](https://www.docker.com/products/docker-desktop/) <br>
-[Node.js](https://nodejs.org/) <br>

Após clonar o projeto, acesse a pasta raiz do projeto e inicie o banco de dados com docker:
```docker-compose
npm docker-compose up 
```

Assim que o banco de dados estiver funcionando, você deve configurar as variáveis de ambiente
apontando `PORT`, `POSTGRESQL_USERNAME` , `POSTGRESQL_PASSWORD` , `POSTGRESQL_DATABASE` e `JWT_SECRET` para o seu ambiente local.

```env
PORT = 300
POSTGRESQL_USERNAME=docker
POSTGRESQL_PASSWORD=password
POSTGRESQL_DATABASE=docker
JWT_SECRET= JWTSECRETHASHED
```

Com o banco de dados configurado, instale as dependências do projeto:
```
npm install
```

Rode as migrations para criar as tabelas no banco de dados:
```
npm run migrate
```

Não se esqueça de gerar as tipagens do banco com o prisma:
```
npx prisma generate
```
## Redes sociais
- Twitter: [(@saypaje)](https://twitter.com/saypaje)
- LinkedIn: [(@Yan Edwards)](www.linkedin.com/in/yanedwards)
