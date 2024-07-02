import { APIGatewayRequest, APIGatewayResponse } from '@/interfaces'
import {
  CreateProductInputDto,
  CreateProductOutputDto,
  CreateProductUsecase,
} from '@/usecsases/create-product/create-product.usecase'
import { ApiHandler } from '../../handler'

export type CreateProductResponseDto = {
  id: string
}

export class CreateProductHandler implements ApiHandler<CreateProductInputDto, CreateProductOutputDto> {
  private constructor(private readonly createProductService: CreateProductUsecase) {}

  public static create(createProductService: CreateProductUsecase) {
    return new CreateProductHandler(createProductService)
  }

  execute() {
    return async (
      event: APIGatewayRequest<CreateProductInputDto>,
    ): Promise<APIGatewayResponse<CreateProductOutputDto>> => {
      const { name, price } = event.body

      const input: CreateProductInputDto = {
        name,
        price,
      }

      const output: CreateProductOutputDto = await this.createProductService.execute(input)

      const responseBody = this.presente(output)

      return {
        statusCode: 200,
        body: responseBody,
      }
    }
  }

  private presente(input: CreateProductOutputDto): CreateProductResponseDto {
    const response = { id: input.id }

    return response
  }
}
