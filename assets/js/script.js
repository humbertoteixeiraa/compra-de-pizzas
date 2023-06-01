//VARIABLES
let cart = [];
let modalQt = 1;
let modalKey = 0;

//SELECTION FUNCTIONS
function c(el) {
    return document.querySelector(el);
}

const cs = function(el) {
    return document.querySelectorAll(el);
}

 
//01) --> LOADING THE PIZZA LIST <-- 

pizzaJson.map(function(item, index) {
    //OPERATION THE FUNCTION:
    //a) Calling the .map() function on the array of 'pizzaJson' objects;
    //b) 'item' is each object of ARRAY 'pizza Json'.

    //Copying the complete structure with .cloneNode().
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    //Filling in the information of <div class="pizza-area">.
    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;




    
    //02) --> OPENING THE MODAL FOR EACH PIZZA <--
    //a) 'function(e) { }' is executed when clicking on the <a> tag of class="pizza-item".
    
    pizzaItem.querySelector('a').addEventListener('click', function(e) {
        //The preventDefault() method cancels the default behavior of an element.
        e.preventDefault();

        //ATENTTION !!!
        //a) 'Event.target' references the element that fired the event.
        //b) The '.closest()' method finds the closest parent element that satisfies the selector condition.
        //c) ATTENTION! -> Seria possível utilizar 'let key = index', já que o valor de 'key' é o mesmo de 'index'. NO ENTANTO, caso seja necessário refatorar esse código e extrair a função adicionada ao .addEventListener() para fora de.map(), seria perfeitamente possível já que ela não depende de informações de fora dela.
        let key = e.target.closest('.pizza-item').getAttribute('data-key');

        modalKey = key;
        modalQt = 1;

        //Filling in the information of <div class="pizzaWindowArea">.
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--qt').innerHTML = modalQt;
        c('.pizzaInfo--size.selected').classList.remove('selected');

        //The forEach() method executes a callback function for each array element.
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
        }, 100);
    });

    //ATENTTION !!! -> Adding <div class='pizza-item'< in <div class='pizza-area'>.
    c('.pizza-area').append(pizzaItem);
});














/* 
 01) --> MODAL EVENTS <--
*/
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(function() {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);

}

/* 
 01) CANCEL BUTTONS
 02) ATTENTON !!! -> Code different from the code made in class (Compra de Pizzas - Parte 07 - 1:54)
*/
c('.pizzaInfo--cancelButton').addEventListener('click', closeModal);
c('.pizzaInfo--cancelMobileButton').addEventListener('click', closeModal);

//PIZZA INCREASE AND DECREASE THE AMOUNT OF BUTTONS
c('.pizzaInfo--qtmenos').addEventListener('click', function() {
    if(modalQt > 1) {
        modalQt--;
        c('.pizzaInfo--qt').innerHTML = modalQt;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', function() {
    modalQt++;
    c('.pizzaInfo--qt').innerHTML = modalQt;
});

//PIZZA SIZE SELECTION BUTTONS
cs('.pizzaInfo--size').forEach(function(size, sizeIndex) {
    size.addEventListener('click', function(e) {
        c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

//ADD PIZZA TO CART BUTTON
c('.pizzaInfo--addButton').addEventListener('click', function() {

    //Getting the 'data-key' value of the selected pizza.
    let size = c('.pizzaInfo--size.selected').getAttribute('data-key');

    //Generating an identifier for each order (PIZZA ID + @ + PIZZA SIZE).
    let identifier = pizzaJson[modalKey].id + '@' + size;

    //Checking if the identifier just created already exists in the ARRAY cart.
    let key = cart.findIndex(function(item) {
        return item.identifier == identifier;
        /* 
         01) OPERATION THE FUNCTION:
            a) Each pizza order receives an identifier called 'identifier';
            b) The 'key' variable receives the result of the findIndex() method;
            c) The findIndex() method traverses the entire 'cart' ARRAY and executes a callback function;
            d) The callback function tests whether the newly created identifier already exists in any item of the 'cart' ARRAY;
            e) If it exists, it returns the value of the element's index. If it does not exist, it returns the value -1.
        */
    });

    //Checking and adding pizzas to the ARRAY cart.
    if(key > -1) {
        cart[key].qt += modalQt;
        //If the identifier already exists, add the number of pizzas in the 'modalQt' to 'cart.qt'.
    } else {
        //If it does not exist, the pizza is added to the ARRAY cart.
        cart.push(
            {
                identifier,
                id: pizzaJson[modalKey].id,
                size,
                qt: modalQt
            }
        );
    }
    
    updateCart()
    closeModal();
});

//SHOWING THE SHOPPING CART

//Opening the mobile menu.
c('.menu-openner').addEventListener('click', function() {
    if(cart.length > 0) {
        c('aside').style.left = '0';
    };
});

//Closing the mobile menu.
c('.menu-closer').addEventListener('click', function() {
    c('aside').style.left = '100vw';
});

function updateCart() {
    //Displays the cart if there is pizza in it.
    if(cart.length > 0) {
        //Displays the cart if there is any pizza in it.
        c('aside').classList.add('show');

        //Resetting cart elements list before loading elements
        c('.cart').innerHTML = '';

        //VARIABLES
        let subtotal = 0;
        let desconto = 0;
        let total = 0;
        

        for (let i in cart) {
            let pizzaItem = pizzaJson.find(function(itemPizzaJson) {
                return itemPizzaJson.id == cart[i].id;
                /* 
                01) OPERATION THE FUNCTION:
                    a) The 'pizzaItem' variable receives the result of the pizzaJson.find();
                    b) The findIndex() method traverses the entire 'cart' ARRAY and executes a callback function;
                    c) The callback function will return the complete item from the ARRAY 'pizzaJson' that has the same id as the id of the cart item.
                */
            });

            //Calculating the subtotal.
            subtotal = subtotal + (pizzaItem.price * cart[i].qt);

            //Cloning elements.
            let cartItem = c('.models .cart--item').cloneNode(true);

            //Filling in the information of <div class="cart--item">.
            cartItem.querySelector('img').src = pizzaItem.img;
            
            let pizzaSizeName;
            switch(cart[i].size) {
                case '0':
                    pizzaSizeName = 'P';
                    break;
                case '1':
                    pizzaSizeName = 'M';
                    break;
                case '2':
                    pizzaSizeName = 'G';
                    break;
            };
            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;

            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', function() {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);

                    c('.menu-openner span').innerHTML = cart.length;
                }

                
                updateCart();
            });

            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', function() {
                cart[i].qt++;

                updateCart();
            });


            //Inserting elements at the end.
            c('.cart').append(cartItem);
        }

        //Calculating the desconto and total
        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        //Filling in the information of <div class="cart--details">.
        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

        //Displaying the quantity of item in the cart on the mobile version of the website.
        c('.menu-openner span').innerHTML = cart.length;

    } else {
        //Does not display the cart if there is no pizza in it.
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw'; //Mobile cart.
    }
}

