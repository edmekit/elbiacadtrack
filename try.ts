type Pizza = {
    name: string,
    price: number
}


const menu: Pizza[] = [

]

export function createPizza(name: string, price: number) {
    let newPizza: Pizza = { name, price } 
    return newPizza
}

export function addPizza(pizza: Pizza) {
    menu.push(pizza)
}

let peperoni = createPizza("pepperoni", 10)
let hawaiian = createPizza("hawaiian", 10)

addPizza(peperoni)
addPizza(hawaiian)

console.log(menu)
