import { CustomDecorator, SetMetadata } from '@nestjs/common'
import { routePolicyKey } from '../constants/auth.constants'
import { IUserType } from '@modules/v1/user/resources/enums'

export const SetRoutePolicy = (
	policy: IUserType[],
): CustomDecorator<string> => {
	return SetMetadata(routePolicyKey, policy)
}
