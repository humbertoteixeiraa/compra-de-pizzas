//Selection FUNCTIONS
const c = function(el) {
    return document.querySelector(el);
}

const cs = function(el) {
    return document.querySelectorAll(el);
}

/**/

//Calling the .map() function on the array of 'pizzaJson' objects.
//'item' is each array object.
pizzaJson.map(function(item, index) {

    //Copying the complete structure with .cloneNode().
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //Adding 'data-key' attribute in the 'pizaItem' class.
    pizzaItem.setAttribute('data-key', index);
    //Adding pizza images.
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    //Replacing pizza price.
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    //Replacing pizza names.
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    //Replacing pizza description.
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    //Executing function 'function(e) { }' when clicking <a> tag.
    pizzaItem.querySelector('a').addEventListener('click', function(e) {
        e.preventDefault();

        //'Event.target' references the element that fired the event.
        //'Method.closest()' returns the closest ancestor, relative to the current element, that has the provided selector as a parameter.
        /* 
         - ATTENTION! -> Seria possível utilizar 'let key = index', já que o valor de 'key' é o mesmo de 'index'. NO ENTANTO, caso seja necessário refatorar esse código e extrair a função adicionada ao .addEventListener() para fora de.map(), seria perfeitamente possível já que ela não depende de informações de fora dela.
        */
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        //Filling in the information of <div class="pizzaInfo">.
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaBig img').src = pizzaJson[key].img;

        //Changing the CSS to show the content of '.pizzaWindowArea' and setting the animation.
        c('.pizzaWindowArea').style.display = 'flex';
        c('.pizzaWindowArea').style.opacity = 0;
        setTimeout(function() {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });
    

    //Adding 'pizza-item' in 'pizza-area'.
    c('.pizza-area').append(pizzaItem);
});
