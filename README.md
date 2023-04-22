# AWS-Lambda-Prisma

Códificação de uma API RESTful para interagir com registros de usuário em um banco de dados, usando uma combinação de Express.js com Typescript e Prisma uma ORM para abstração. 
Programado em Express.js que fornece endpoints CRUD (criação, leitura, atualização e exclusão) para um banco de dados Prisma, usando o modelo ORM (Object-Relational Mapping) do Prisma.

- Os endpoints fornecidos são 
- '/usuario', 
- '/usuario/:id' 
(onde :id é um parâmetro para obter um usuário específico), '/usuario' (para criar um novo usuário) e '/usuario/:id' (para atualizar um usuário existente).

O aplicativo também exporta uma função Lambda que usa o evento e o contexto da AWS para manipular as requisições e respostas do Express.js e retorna um erro 404 se a rota não for encontrada.
