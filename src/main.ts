import middy from '@middy/core'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ProductRepositoryPrisma } from './infra/repositories/prisma/product.repository.prisma'
import { prisma } from './package/prisma/prisma'
// import { CreateProductUsecase } from './usecsases/create-product/create-product.usecase'
import { ListProductUsecase } from './usecsases/list-product/list-product.usecase'
import { ListProductHandler } from './infra/api/aws-lambda/product/list-product.handler'
import { ApiExpress } from './infra/api/express/api.express'
import { CreateProductRoute } from './infra/api/express/routes/product/create-product.express.route'
import { ListProductRoute } from './infra/api/express/routes/product/list-product.express.route'
import { CreateProductUsecase } from './usecsases/create-product/create-product.usecase'
import { CreateProductHandler } from './infra/api/aws-lambda/product/create-product.handler'

// // Middlewares
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

// API AWS Lambda
function startCreateProductHandler() {
  const aRepository = ProductRepositoryPrisma.create(prisma)
  const createProductUsecase = CreateProductUsecase.create(aRepository)
  const execute = CreateProductHandler.create(createProductUsecase).execute()
  return middy<APIGatewayProxyEvent, APIGatewayProxyResult>().use(middleware()).handler(execute)
}

function startListProductHandler() {
  const aRepository = ProductRepositoryPrisma.create(prisma)
  const listProductUsecase = ListProductUsecase.create(aRepository)
  const execute = ListProductHandler.create(listProductUsecase).execute()
  return middy<APIGatewayProxyEvent, APIGatewayProxyResult>().use(middleware()).handler(execute)
}

// API Express
function main() {
  const aRepository = ProductRepositoryPrisma.create(prisma)

  const createProductUsecase = CreateProductUsecase.create(aRepository)
  const listProductUsecase = ListProductUsecase.create(aRepository)

  const createRoute = CreateProductRoute.create(createProductUsecase)
  const listRoute = ListProductRoute.create(listProductUsecase)

  const port = 3000
  const api = ApiExpress.create([createRoute, listRoute])
  api.start(port)
}

export { startCreateProductHandler, startListProductHandler, main }
