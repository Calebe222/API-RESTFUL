import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
  userId: string
  iat: number
  exp: number
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const parts = authorization.split(' ')

  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return res.status(401).json({ error: 'Formato do token inválido (Use: Bearer TOKEN)' })
  }

  const token = parts[1]

  try {
    const secret = process.env.JWT_SECRET || 'secret'
    const decoded = jwt.verify(token, secret) as TokenPayload

    req.userId = decoded.userId

    return next()
  } catch {
    return res.status(401).json({ error: 'Token inválido ou expirado' })
  }
}
