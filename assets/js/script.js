
let modalQt = 1;

//Selection FUNCTIONS
const c = function(el) {
    //document.querySelector() returns a list with the FIRST ELEMENT equal to the selector.
    return document.querySelector(el);
}

const cs = function(el) {
    //document.querySelectorAll() returns a list with ALL ELEMENTS equal to the selector.
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
        //The preventDefault() method cancels the default behavior of an element.
        e.preventDefault();

        /*
        01) 'Event.target' references the element that fired the event.
        02) 'Method.closest()' returns the closest ancestor, relative to the current element, that has the provided selector as a parameter. 
        03) ATTENTION! -> Seria possível utilizar 'let key = index', já que o valor de 'key' é o mesmo de 'index'. NO ENTANTO, caso seja necessário refatorar esse código e extrair a função adicionada ao .addEventListener() para fora de.map(), seria perfeitamente possível já que ela não depende de informações de fora dela.
        */
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalQt = 1;

        //Filling in the information of <div class="pizzaWindowArea">.
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaInfo--size.selected').classList.remove('selected');

        /* 
        01) The forEach() method executes a callback function for each array element.
        */
        cs('.pizzaInfo--size').forEach( function(size, sizeIndex) {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }

            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        

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
