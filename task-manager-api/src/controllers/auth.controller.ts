import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'
import { registerSchema, loginSchema } from '../schemas/auth.schema'

export async function register(req: Request, res: Response) {
  try {
    const { name, email, password } = registerSchema.parse(req.body)

    const userExists = await prisma.user.findUnique({ where: { email } })

    if (userExists) {
      return res.status(400).json({ error: 'E-mail já cadastrado' })
    }

    const hashedPassword = await bcrypt.hash(password, 8)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return res.status(201).json(user)
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message })
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = loginSchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Credenciais inválidas' })
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    )

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error: any) {
    return res.status(400).json({ error: error.errors || error.message })
  }
}
