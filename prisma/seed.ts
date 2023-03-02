import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.usuario.createMany({
    data: [
      {
        login: 'user1',
        senha: 'senha1',
        nome: 'Emerson Amorim',
        email: 'emerson-amorim@example.com',
        idade: 42,
      },
      {
        login: 'user2',
        senha: 'senha2',
        nome: 'Emerson Luiz',
        email: 'emerson-luiz@example.com',
        idade: 25,
      },
      {
        login: 'user3',
        senha: 'senha3',
        nome: 'Emerson Silva',
        email: 'emerson-silva@example.com',
        idade: 40,
      },
    ],
  });

  console.log('Usuários criados com sucesso!');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());