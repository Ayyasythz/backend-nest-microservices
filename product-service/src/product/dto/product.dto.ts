export class CreateProductDto {
  name : string;
  price : number;
  description : string;
  stockQuantity: number;
}

export class UpdateProductDto {
  isActive?: boolean
}
