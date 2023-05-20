//Selection FUNCTIONS
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

    //Adding pizza images
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //Replacing pizza price
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    //Replacing pizza names
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //Replacing pizza description
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //
    pizzaItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();

        //Changing the CSS to show the content of '.pizzaWindowArea' and setting the animation
        c('.pizzaWindowArea').style.display = 'flex';
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(function() {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
    

    //Adding 'pizza-item' in 'pizza-area'.
    c('.pizza-area').append(pizzaItem);
});
