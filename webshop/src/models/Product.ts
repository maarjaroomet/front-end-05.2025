import { Category } from "./Category"

export class Product {
  constructor(
    public title: string = "",
    public price: number = 0,
    public description: string = "",
    public category: Category = {id: 0, name: ""},
    public image: string = "",
    public rating: Rating = {rate: 0, count: 0},
    public id?: number,
  ) {}
}

type Rating = {
  rate: number
  count: number
}