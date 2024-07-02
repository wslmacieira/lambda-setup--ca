import { APIGatewayRequest, APIGatewayResponse } from '@/interfaces'
// import { CreateProductInputDto, CreateProductOutputDto } from '@/usecsases/create-product/create-product.usecase'

export interface ApiHandler<TRequest, TResponse> {
  execute(): (event: APIGatewayRequest<TRequest>) => Promise<APIGatewayResponse<TResponse>>
}
