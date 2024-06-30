import { APIGatewayRequest, APIGatewayResponse } from '@/interfaces'
import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { Product } from './domain/product/entity/product'

// Middlewares
const middleware = (): middy.MiddlewareObj<APIGatewayProxyEvent, APIGatewayProxyResult> => {
  const before: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<APIGatewayProxyResult> => {
    // Your middleware logic
    request.event.body = JSON.parse(request.event.body)
    return
  }
  const after: middy.MiddlewareFn<APIGatewayProxyEvent, APIGatewayProxyResult> = async (
    request,
  ): Promise<APIGatewayProxyResult> => {
    // Your middleware logic
    request.response.body = JSON.stringify(request.response.body)
    return
  }

  return {
    before,
    after,
  }
}

const execute = async (event: APIGatewayRequest<Partial<Product>>): Promise<APIGatewayResponse<Partial<Product>>> => {
  const { name, price } = event.body
  const product = Product.create(name, price)
  return {
    statusCode: 200,
    body: product,
  }
}

export const mainHandler = middy<APIGatewayProxyEvent, APIGatewayProxyResult>().use(middleware()).handler(execute)
