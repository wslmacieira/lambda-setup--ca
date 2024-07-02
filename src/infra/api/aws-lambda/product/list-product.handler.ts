import { APIGatewayResponse } from '@/interfaces'
import {
  ListProductInputDto,
  ListProductOutputDto,
  ListProductUsecase,
} from '@/usecsases/list-product/list-product.usecase'
import { ApiHandler } from '../../handler'

export type ListProductResponseDto = {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export class ListProductHandler implements ApiHandler<ListProductInputDto, ListProductResponseDto> {
  private constructor(private readonly listProductService: ListProductUsecase) {}

  public static create(listProductService: ListProductUsecase) {
    return new ListProductHandler(listProductService)
  }

  execute() {
    return async (): Promise<APIGatewayResponse<ListProductResponseDto>> => {
      const output = await this.listProductService.execute()

      const responseBody = this.presente(output)

      return {
        statusCode: 200,
        body: responseBody,
      }
    }
  }

  private presente(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    }

    return response
  }
}
