import { writable } from "svelte/store"
const elementsFood = writable(JSON.parse(`
{
  "elements" : [
    {
      "name" : "Veggies",
      "malnourishmentMin" : 0,
      "malnourishmentMax" : 100,
      "target": 50,
      "targetCap": 100
    },
    {
      "name" : "Carbs",
      "malnourishmentMin" : 0,
      "malnourishmentMax" : 90,
      "target": 50,
      "targetCap": 60
    },
    {
      "name" : "Protein",
      "malnourishmentMin" : 0,
      "malnourishmentMax" :90,
      "target": 50,
      "targetCap": 60
    },
    {
      "name" : "Fruits",
      "malnourishmentMin" : 0,
      "malnourishmentMax" : 90,
      "target": 50,
      "targetCap": 60
    },
    {
      "name" : "Sugar",
      "malnourishmentMin" : 0,
      "malnourishmentMax" : 90,
      "target": 0,
      "targetCap": 60
    }
  ]
}`
).elements)

const food = writable(
  JSON.parse(`
{
  "food" : [
    {
      "food" : "apple",
      "units" : 12,
      "nutrients" : [
        "Protein", "Fruits"
      ]
    }
  ]
}`
).food)

const error = writable(undefined)

export { elementsFood, food, error }