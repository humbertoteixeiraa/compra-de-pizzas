const c = function(el) {
    return document.querySelector(el);
}

const cs = function(el) {
    return document.querySelectorAll(el);
}

/**/

//Calling the .map() function on the array of ''pizzaJson'' objects.
//'item' is each array object.
pizzaJson.map(function(item, index) {

    //Copying the complete structure with .cloneNode().
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //Replacing pizza price
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    //Replacing pizza names
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //Replacing pizza description
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    

    //Adding 'pizza-item' in 'pizza-area'.
    c('.pizza-area').append(pizzaItem);
});
