export enum TransactionStatusEnum {
	PROCESSING = 'PROCESSING',
	AUTHORIZED = 'AUTHORIZED',
	PAID = 'PAID',
	REFUNDED = 'REFUNDED',
	WAITING_PAYMENT = 'WAITING_PAYMENT',
	REFUSED = 'REFUSED',
	CHARGEBACK = 'CHARGEBACK',
	CANCELED = 'CANCELED',
	IN_PROTEST = 'IN_PROTEST',
	PARTIALLY_PAID = 'PARTIALLY_PAID',
	PENDING = 'PENDING',
}
