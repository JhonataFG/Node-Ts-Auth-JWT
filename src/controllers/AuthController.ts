import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Users from '../app/models/Users'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

class AuthController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(Users);
        const { email, password } = req.body;

        const user = await repository.findOne({ where: { email } })

        if (!user) {
            return res.sendStatus(401);
        }

        const isValidPassword = await bcryptjs.compare(password, user.password);

        if (!isValidPassword) {
            return res.sendStatus(401);
        }

        const token = await jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

        delete user.password;

        return res.json({
            user,
            token
        })
    }
}

export default new AuthController()