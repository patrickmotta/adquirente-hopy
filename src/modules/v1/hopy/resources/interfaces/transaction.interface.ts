export interface ITransaction {
	id: string
	amount: number
	refundedAmount: number
	companyId: number
	installments: number
	paymentMethod: string
	status: string
	postbackUrl: string | null
	metadata: unknown | null
	traceable: boolean
	secureId: string
	secureUrl: string
	createdAt: string
	updatedAt: string
	paidAt: string | null
	ip: string | null
	externalRef: string | null
	customer: ICustomer
	card: ICard | null
	boleto: unknown | null
	pix: unknown | null
	shipping: unknown | null
	refusedReason: unknown | null
	items: ITransactionItem[]
	splits: ISplit[]
	refunds: unknown[]
	delivery: unknown | null
	fee: IFee
}

interface ICustomer {
	id: number
	externalRef: string | null
	name: string
	email: string
	phone: string
	birthdate: string | null
	createdAt: string
	document: IDocument
	address: IAddress
}

interface IDocument {
	number: string
	type: string
}

interface IAddress {
	street: string
	streetNumber: string
	complement: string | null
	zipCode: string
	neighborhood: string
	city: string
	state: string
	country: string
}

interface ICard {
	id: number
	brand: string
	holderName: string
	lastDigits: string
	expirationMonth: number
	expirationYear: number
	reusable: boolean
	createdAt: string
}

interface ITransactionItem {
	externalRef: string | null
	title: string
	unitPrice: number
	quantity: number
	tangible: boolean
}

interface ISplit {
	recipientId: number
	amount: number
	netAmount: number
}

interface IFee {
	fixedAmount: number
	spreadPercentage: number
	estimatedFee: number
	netAmount: number
}
