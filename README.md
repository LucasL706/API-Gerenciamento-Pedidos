# API de Gerenciamento de Pedidos

## Descrição

Esta é uma API REST desenvolvida em Node.js utilizando Express e Sequelize para gerenciar pedidos e seus itens.
Ela permite criar, consultar, atualizar e deletar pedidos, armazenando os dados em um banco de dados SQL (MySQL).

O projeto segue boas práticas de organização, incluindo controllers, models e rotas separadas, e está preparado para integração com Swagger para documentação.

## Tecnologias Utilizadas

- Node.js

- Express

- Sequelize (ORM)

- MySQL

- Body-parser

- Swagger para documentação

- Dotenv (para variáveis de ambiente)

## Instação e Execução
1. Clone o repositório:
```
git clone https://github.com/seu-usuario/api-gerenciamento-pedidos.git
cd api-gerenciamento-pedidos
```
2. Instale as dependências:
```
npm install
```
3. Configure seu banco de dados MySQL

``` 
CREATE DATABASE order_control;
``` 
4. Atualize o arquivo db.js com as credenciais root e password
``` 
Exeplo:
const sequelize = new Sequelize('order_control', 'seu_usuario', 'sua_senha', {
    host: 'localhost',
    dialect: 'mysql'
});
```
5. Execute a API
```
node server.js
```
6. Para testar utilize o postman ou via documentação do swagger disponível em
```
http://localhost:3000/api-docs
```

## Endpoints

### 1. Criar pedido

```
POST http://localhost:3000/order
```

#### Exemplo:

Body:

```
{
  "numeroPedido": "v10089015vdb-01",
  "valorTotal": 10000,
  "dataCriacao": "2023-07-19T12:24:11.529Z",
  "items":[
    {
      "idItem": "2434",
      "quantidadeItem": 1,
      "valorItem": 1000
    }
  ]
}
```

Resposta:

```
{
  "message": "Pedido criado com sucesso",
  "orderId": "v10089015vdb-01"
}
```

### 2. Lista todos os pedidos

```
GET http://localhost:3000/order/list
```

Resposta:

```
[
  {
    "orderId": "v10089015vdb-01",
    "value": 10000,
    "creationDate": "2023-07-19T12:24:11.529Z",
    "items": [
      {
        "productId": 2434,
        "quantity": 1,
        "price": 1000
      }
    ]
  }
]
```

### 3. Lista pedido por ID

```
GET http://localhost:3000/order/:orderId
```

#### Exemplo:

URL:

```
GET http://localhost:3000/order/v10089015vdb-01
```

Resposta:

```
{
  "orderId": "v10089015vdb-01",
  "value": 10000,
  "creationDate": "2023-07-19T12:24:11.529Z",
  "items": [
    {
      "productId": 2434,
      "quantity": 1,
      "price": 10000
    }
  ]
}
```

### 4. Atualizar pedido por ID

```
PUT http://localhost:3000/order/:orderId
```

#### Exemplo:

URL:

```
PUT http://localhost:3000/order/v10089015vdb-01
```

Body:

```
{
  "valorTotal": 12000,
  "dataCriacao": "2023-07-20T10:00:00.000Z",
  "items":[
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 6000
    }
  ]
}
```

Resposta:

```
"message": "Pedido atualizado com sucesso"
```

### 5. Deletar pedido por ID

```
DELETE http://localhost:3000/order/:orderId
```

#### Exemplo:

URL:

```
DELETE http://localhost:3000/order/v10089015vdb-01
```

Body:

```
{
  "valorTotal": 12000,
  "dataCriacao": "2023-07-20T10:00:00.000Z",
  "items":[
    {
      "idItem": "2434",
      "quantidadeItem": 2,
      "valorItem": 6000
    }
  ]
}
```

Resposta:

```
"message": "Pedido deletado com sucesso"
```

## Estrutura do Projeto

```
├── controllers/
│   └── OrderController.js
├── models/
│   ├── Item.js
│   ├── Order.js
│   └── index.js
├── routes/
│   └── OrderRoutes.js
├── db.js
├── server.js
└── README.md
```

## Boas Praticas Aplicadas

- Separação de responsabilidades (controllers, routes, models)

- Uso de Sequelize para ORM e relacionamentos entre tabelas

- Respostas padronizadas com tratamento de erros

- Endpoints REST com verbos HTTP corretos

- Preparado para integração com Swagger
