import { ListProductOutputDto, ListProductUsecase } from '@/usecsases/list-product/list-product.usecase'
import { Request, Response } from 'express'
import { HttpMethod, Route } from '../route'

export type ListProductResponseDto = {
  products: {
    id: string
    name: string
    price: number
  }[]
}

export class ListProductRoute implements Route {
  constructor(
    private readonly path: string,
    private readonly method: HttpMethod,
    private readonly listProductService: ListProductUsecase,
  ) {}

  public static create(listProductService: ListProductUsecase) {
    return new ListProductRoute('/products', HttpMethod.GET, listProductService)
  }

  public getPath(): string {
    return this.path
  }

  public getMethod(): HttpMethod {
    return this.method
  }

  public getHandler() {
    return async (request: Request, response: Response) => {
      const output = await this.listProductService.execute()

      const responseBody = this.presente(output)

      response.status(200).json(responseBody).send()
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
