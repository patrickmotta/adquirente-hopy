import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common'

@Injectable()
export class ParseIntIdPipe implements PipeTransform {
	transform(value: unknown, metadata: ArgumentMetadata): unknown {
		if (metadata.type !== 'param' || metadata.data !== 'id') {
			return value
		}

		const parsedValue = Number(value)

		if (isNaN(parsedValue)) {
			throw new BadRequestException('ParseIntIdPipe espera uma string numerica')
		}

		if (parsedValue < 0) {
			throw new BadRequestException(
				'ParseIntIdPipe espera um numero maior que 0',
			)
		}

		return parsedValue
	}
}
