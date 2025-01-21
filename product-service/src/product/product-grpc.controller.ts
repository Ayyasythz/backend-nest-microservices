import { Controller, Injectable, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { GrpcMethod } from '@nestjs/microservices';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';

@Controller()
export class ProductGrpcController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProductById')
  async getProductById({id} : {id: string}) {
    return this.productService.findById(id)
  }

  @GrpcMethod('ProductService', 'GetAllProducts')
  async getAllProducts(){
    const products = await this.productService.findAll()
    return {products}
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  async createProducts(data: CreateProductDto) {
    return this.productService.create(data)
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  async updateProducts({id, ...updateData}: UpdateProductDto & {id: string}) {
    return this.productService.update(id, updateData)
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  async deleteProducts({id}: {id: string}) {
    await this.productService.delete(id)
    return {}
  }
}