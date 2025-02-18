import {
	HashingService,
	IHashInput,
	IHashOutput,
	ICompareInput,
} from '../resources/interfaces/hashing.interface'

import * as bcrypt from 'bcryptjs'

export class BcryptService extends HashingService {
	async hash({ password }: IHashInput): Promise<IHashOutput> {
		const salt = await bcrypt.genSalt()
		const passwordHash = await bcrypt.hash(password, salt)

		return { passwordHash }
	}

	async compare({ password, passwordHash }: ICompareInput): Promise<boolean> {
		return bcrypt.compare(password, passwordHash)
	}
}
