import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common'
import { UserCreateDto } from './models/dto/userCreate.dto'
import { UserCreateService } from './services/userCreate.service'
import { UserGetOneService } from './services/userGetOne.service'
import { HashPassworPipe } from './resources/pipes/hashPassword.pipe'
import { UserUpdateDto } from './models/dto/userUpdate.dto'
import { AuthTokenGuard } from '@modules/v1/auth/resources/guards/authToken.guard'
import { LoggedUserParam } from '@common/v1/params/loggedUser.param'
import { UserGetAllService } from './services/userGetAll.service'
import { RoutePolicyGuard } from '@modules/v1/auth/resources/guards/routePolicy.guard'
import { SetRoutePolicy } from '@modules/v1/auth/resources/decorators/setRoutePolicy.decorator'
import { IUserType } from './resources/enums'
import { UserEntity } from './models/entities/user.entity'
import { UserUpdateService } from './services/userUpdate.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { UserResponseDto } from './models/dto/userReponse.dto'

@Controller('v1/user')
export class UserController {
	constructor(
		private readonly userCreateService: UserCreateService,
		private readonly userGetOneService: UserGetOneService,
		private readonly userGetAllService: UserGetAllService,
		private readonly userUpdateService: UserUpdateService,
	) {}

	@Post()
	async create(
		@Body(HashPassworPipe) userCreateDto: UserCreateDto,
	): Promise<object> {
		return await this.userCreateService.execute(userCreateDto)
	}

	@ApiBearerAuth()
	@UseGuards(AuthTokenGuard)
	@Post('/update')
	async update(
		@Body() userUpdateDto: UserUpdateDto,
		@LoggedUserParam() loggedUser: UserEntity,
	): Promise<object> {
		return await this.userUpdateService.execute({
			user: loggedUser,
			userUpdate: userUpdateDto,
		})
	}

	@ApiBearerAuth()
	@SetRoutePolicy([IUserType.admin])
	@UseGuards(AuthTokenGuard, RoutePolicyGuard)
	@Get('/all')
	async findAll(): Promise<UserResponseDto[]> {
		return await this.userGetAllService.execute()
	}

	@ApiBearerAuth()
	@SetRoutePolicy([IUserType.admin])
	@UseGuards(AuthTokenGuard)
	@Get(':id')
	findOne(@Param('id') id: number): Promise<UserResponseDto> {
		return this.userGetOneService.execute({ id })
	}

	@ApiBearerAuth()
	@UseGuards(AuthTokenGuard)
	@Get()
	async findUserLogged(
		@LoggedUserParam() loggedUser: UserEntity,
	): Promise<UserEntity> {
		return this.userGetOneService.execute({
			id: loggedUser.id,
		})
	}
}
