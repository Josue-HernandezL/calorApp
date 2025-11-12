import { Food } from '../types';
export const FOODS: Food[] = [
// Frutas
{
  id: 'f1',
  name: 'Manzana',
  category: 'fruits',
  caloriesPer100g: 52
}, {
  id: 'f2',
  name: 'Plátano',
  category: 'fruits',
  caloriesPer100g: 89
}, {
  id: 'f3',
  name: 'Naranja',
  category: 'fruits',
  caloriesPer100g: 47
}, {
  id: 'f4',
  name: 'Mango',
  category: 'fruits',
  caloriesPer100g: 60
}, {
  id: 'f5',
  name: 'Sandía',
  category: 'fruits',
  caloriesPer100g: 30
}, {
  id: 'f6',
  name: 'Fresa',
  category: 'fruits',
  caloriesPer100g: 32
}, {
  id: 'f7',
  name: 'Uva',
  category: 'fruits',
  caloriesPer100g: 69
}, {
  id: 'f8',
  name: 'Piña',
  category: 'fruits',
  caloriesPer100g: 50
},
// Proteínas
{
  id: 'p1',
  name: 'Pollo',
  category: 'proteins',
  caloriesPer100g: 165
}, {
  id: 'p2',
  name: 'Carne de res',
  category: 'proteins',
  caloriesPer100g: 250
}, {
  id: 'p3',
  name: 'Pescado',
  category: 'proteins',
  caloriesPer100g: 206
}, {
  id: 'p4',
  name: 'Huevo',
  category: 'proteins',
  caloriesPer100g: 155
}, {
  id: 'p5',
  name: 'Frijoles',
  category: 'proteins',
  caloriesPer100g: 127
}, {
  id: 'p6',
  name: 'Lentejas',
  category: 'proteins',
  caloriesPer100g: 116
}, {
  id: 'p7',
  name: 'Atún',
  category: 'proteins',
  caloriesPer100g: 132
},
// Lácteos
{
  id: 'd1',
  name: 'Leche',
  category: 'dairy',
  caloriesPer100g: 42
}, {
  id: 'd2',
  name: 'Yogurt',
  category: 'dairy',
  caloriesPer100g: 59
}, {
  id: 'd3',
  name: 'Queso',
  category: 'dairy',
  caloriesPer100g: 402
}, {
  id: 'd4',
  name: 'Queso fresco',
  category: 'dairy',
  caloriesPer100g: 264
},
// Bebidas
{
  id: 'b1',
  name: 'Refresco',
  category: 'beverages',
  caloriesPer100g: 42
}, {
  id: 'b2',
  name: 'Jugo de naranja',
  category: 'beverages',
  caloriesPer100g: 45
}, {
  id: 'b3',
  name: 'Café',
  category: 'beverages',
  caloriesPer100g: 1
}, {
  id: 'b4',
  name: 'Agua',
  category: 'beverages',
  caloriesPer100g: 0
}, {
  id: 'b5',
  name: 'Té',
  category: 'beverages',
  caloriesPer100g: 1
},
// Granos
{
  id: 'g1',
  name: 'Arroz',
  category: 'grains',
  caloriesPer100g: 130
}, {
  id: 'g2',
  name: 'Pasta',
  category: 'grains',
  caloriesPer100g: 131
}, {
  id: 'g3',
  name: 'Pan',
  category: 'grains',
  caloriesPer100g: 265
}, {
  id: 'g4',
  name: 'Tortilla',
  category: 'grains',
  caloriesPer100g: 218
}, {
  id: 'g5',
  name: 'Avena',
  category: 'grains',
  caloriesPer100g: 389
},
// Verduras
{
  id: 'v1',
  name: 'Lechuga',
  category: 'vegetables',
  caloriesPer100g: 15
}, {
  id: 'v2',
  name: 'Tomate',
  category: 'vegetables',
  caloriesPer100g: 18
}, {
  id: 'v3',
  name: 'Zanahoria',
  category: 'vegetables',
  caloriesPer100g: 41
}, {
  id: 'v4',
  name: 'Brócoli',
  category: 'vegetables',
  caloriesPer100g: 34
}, {
  id: 'v5',
  name: 'Espinaca',
  category: 'vegetables',
  caloriesPer100g: 23
}, {
  id: 'v6',
  name: 'Pepino',
  category: 'vegetables',
  caloriesPer100g: 16
}];
export const CATEGORY_LABELS: Record<string, string> = {
  fruits: 'Frutas',
  proteins: 'Proteínas',
  dairy: 'Lácteos',
  beverages: 'Bebidas',
  grains: 'Granos',
  vegetables: 'Verduras'
};