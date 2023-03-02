import express, { Request, Response } from 'express';
import { Handler, Context } from 'aws-lambda';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.get('/usuario', async (req: Request, res: Response) => {
  const usuario = await prisma.usuario.findMany();
  res.status(200).json(usuario);
});

app.get('/usuario/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const usuario = await prisma.usuario.findUnique({ where: { id } });
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

app.post('/usuario', async (req: Request, res: Response) => {
  const { login, senha, nome, email, idade } = req.body;
  const usuario = await prisma.usuario.create({ data: { login, senha, nome, email, idade } });
  res.status(201).json(usuario);
});

app.put('/usuario/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const { login, senha, nome, email, idade } = req.body;
  const usuario = await prisma.usuario.update({ where: { id }, data: { login, senha, nome, email, idade } });
  if (usuario) {
    res.status(200).json(usuario);
  } else {
    res.status(404).json({ message: 'Usuário não encontrado' });
  }
});

// Define a função Lambda
export const handler: Handler = async (event: any, context: Context) => {
  const { httpMethod, path } = event;
  const body = JSON.parse(event.body || '{}');

  // Trata as requisições recebidas pelo Express.js
  if (httpMethod && path) {
    const req = { ...event, body };
    const res = { status: (statusCode: number) => ({ json: (data: any) => ({ statusCode, body: JSON.stringify(data) }) }), send: () => ({ statusCode: 204, body: '' }) };
    return;
  }

  // Retorna erro 404 se a rota não for encontrada
  return { statusCode: 404, message: "Rota não encontrada"};

}

