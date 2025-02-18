import { UserEntity } from '@modules/v1/user/models/entities/user.entity'

declare global {
	namespace Express {
		interface Request {
			user?: UserEntity // A propriedade user será do tipo UserEntity e pode ser opcional
		}
	}
}
