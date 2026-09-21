const menu = [];
function createPizza(name, price) {
    let newPizza = { name, price };
    return newPizza;
}
function addPizza(pizza) {
    menu.push(pizza);
}
let peperoni = createPizza("pepperoni", 10);
let hawaiian = createPizza("hawaiian", 10);
addPizza(peperoni);
addPizza(hawaiian);
console.log(menu);
