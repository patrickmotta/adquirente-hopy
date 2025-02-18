import 'dotenv/config'
export enum typeEnvironment {
	master = 'master',
	staging = 'staging',
	dev = 'dev',
}

const nodeEnv = process.env.NODE_ENV?.toLowerCase()

export const environment =
	nodeEnv === 'dev' || nodeEnv === 'development'
		? typeEnvironment.dev
		: nodeEnv === 'staging'
			? typeEnvironment.staging
			: nodeEnv === 'master' || nodeEnv === 'prod'
				? typeEnvironment.master
				: typeEnvironment.dev
