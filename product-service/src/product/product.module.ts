import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductGrpcController } from './product-grpc.controller';

@Module({
  imports : [
    TypeOrmModule.forFeature([Product]),
  ],
  providers: [ProductService],
  controllers: [ProductController, ProductGrpcController],
  exports: [ProductService],
})
export class ProductModule {}
