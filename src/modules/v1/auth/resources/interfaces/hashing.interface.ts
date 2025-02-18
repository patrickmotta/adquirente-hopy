export interface IHashInput {
	password: string
}

export interface IHashOutput {
	passwordHash: string
}

export interface ICompareInput {
	password: string
	passwordHash: string
}

export abstract class HashingService {
	abstract hash(input: IHashInput): Promise<IHashOutput>
	abstract compare(input: ICompareInput): Promise<boolean>
}
