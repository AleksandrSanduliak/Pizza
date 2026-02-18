import { CategoryItem } from "./category-interface";

interface RestaurantsItem {

}

export interface CityItem {
  city: string
  id: number
  isActive: boolean
  name: string;
  restaurants: RestaurantsItem[]
  url: string;
  categories: CategoryItem[]
}
