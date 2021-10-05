//Let’s start by creating an array of objects that will hold the products that we will have

var products = [{
    name: "Bouquet1",
    image: "img/bouquet-g7a52692e5_640.jpg",
    price: 100,
    qtty: 1
},
{
    name: "Bouquet2",
    image: "img/flower-g7fc3168f0_640.jpg",
    price: 150,
    qtty: 1
},
{
    name: "Bouquet3",
    image: "img/flowers-g110b5ccee_640.jpg",
    price: 110,
    qtty: 1
},
{
    name: "Bouquet4",
    image: "img/flowers-g45985c6fc_640.jpg",
    price: 180,
    qtty: 1
},
{
    name: "Bouquet5",
    image: "img/flowers-g68f2579ff_640.jpg",
    price: 130,
    qtty: 1
},
{
    name: "Bouquet6",
    image: "img/red-roses-g5048d1af1_640.jpg",
    price: 90,
    qtty: 1
}
];

//show these products in the browser

for (let val of products) {
    document.getElementsByClassName("products")[0].innerHTML += 
    `<div class="product col-12 col-md-6 col-lg-4 text-center fw-bold g-3">
        <p class ="product-title h3 m-3">${val.name}</p>
        <img class ="product-image" src="${val.image}" width="200"  height="200">
        <div class="product-details" >
            <p class="product-price h4 m-3">${ val.price} €</p>
            <button class="btn btn-success product-button"  type="button">ADD  TO CART</button>
        </div>
    </div>`
}

// The next step will be targeting all the buttons that add elements to the cart.
// When we print the products, we create a button with the class “product-button”

let btns = document.getElementsByClassName("product-button");

for (let i=0; i< btns.length; i++) {
    btns[i].addEventListener("click", function() {
        addToCart(products[i], i);
    })
}

//let’s create  the addToCart function

/* var cart = [];
  function addToCart (product, index) {
    cart.push (product);
    console.table(cart);
}
 */

//we should push each product only once. When clicking a second time, the product shouldn’t be added again, but instead, the quantity should increase by one. If the product doesn’t exist in the cart, it will be pushed to it.

/* In other words: The first step is to check if the cart is empty. If it is, the product will be pushed to the cart array. The next step is to search if the product exists in the array. To do so, we will trigger the find  Method, which accepts a function with one parameter, and then it returns true when the parameter.name is equal to the product.name. When this condition is true, the quantity of the element in the cart will be increased by 1. The last step is run if the array is not empty and the element doesn’t exist on the array. In this case, the new element will be pushed into the cart array. */

var cart = [];
function addToCart (product, index) {
    if (cart.length == 0) {
        cart.push (product);
    } else if (cart.find((val) => val.name == product.name)) {
        product.qtty++;
    } else {
        cart.push(product);
    }
    console.table(cart);
    createRows();
    Total();
    finalQuantity ();
    discount ();
}

// create the function createRows() which will show the items in the cart. This function will go through the elements inside the cart array and print them in the div with id “cart-items”. The function createRows() can be called inside the addToCart() function.

function createRows () {
    var result = "";
    for (let val of cart) {
        result += `<div class="cart-row row d-flex">

        <div class="cart-item col-6 my-3 ">

            <img class="cart-item-image" src="${val.image}" width="100" height="100">

            <span class="cart-item-title h5 ">${val.name}</span>

        </div>

        <span class="cart-price col-3 h4 my-3">${val.price} €</span>

        <div class="cart-qtty-action d-flex col-3 ">            

            <i class="minus fa fa-minus-circle my-auto" ></i>            

            <div class="cart-quantity p-4 h4">${val.qtty}</div>            

            <i class="plus fa fa-plus-circle my-auto"></i>        

            <button class="del btn btn-danger rounded-circle  my-auto ms-3 fw-bold" type="button"> X </button>
                       

        </div>

    </div>`;
    }
    document.getElementById("cart-items").innerHTML = result;

    //Let’s activate the plus and minus buttons, available in the quantity column. These buttons should increase or decrease the quantity of products, updating the total each time one of them gets clicked.
    let plus = document.getElementsByClassName("plus");
    let minus = document.getElementsByClassName("minus");
    let del = document.getElementsByClassName("del"); //Now the delete action will remove a selected item from the cart. We can add an event on the “x” button, and when that button is clicked, the product will be removed from the cart.The first step is the same as before, all the buttons with the class “del” need to be selected, and then an event calling the function deleteItem() needs to be added to the buttons


    for (let i = 0; i < plus.length; i++) {

        plus[i].addEventListener("click", function() {

            plusQtty(i);

            Total();
            finalQuantity ();
            discount ();

        });
        minus[i].addEventListener("click", function() {

            minusQtty(i);

            Total();
            finalQuantity ();
            discount ();

        });
        del[i].addEventListener("click", function() {

            deleteItem(i);

            Total();
            finalQuantity ();
            discount ();

        });

    }
}

function plusQtty(i) {

    cart[i].qtty++;

    document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;

} //The (i) parameter will help us know which quantity of the product needs to be increased, as well as display the new value of the quantity for that product.

function minusQtty(i) {
    if (cart[i].qtty == 1) {
        cart.splice(i, 1);
        createRows();
    } else {
        cart[i].qtty -= 1 ;
        document.getElementsByClassName("cart-quantity")[i].innerHTML = cart[i].qtty;
    }
 } //This function will first check if the product quantity is equal to one. If yes, the splice method will be used to remove the element from the cart array, and then the createRows() function needs to be called in order to rebuild the HTML. If not, the quantity will decrease by one, and the quantity on the browser will be updated.

 
function deleteItem(i) {

    cart[i].qtty = 1;

    cart.splice(i, 1);

    createRows();

} //When the deleteItem() function is called, we use the index of the element to set the qtty of the product to 1. Then the splice method will remove the element from the cart. And at last, the createRows() function will rebuild the elements from the cart array on the HTML.

//build a function to calculate the total price of the elements in the cart. We define a variable called total that will start with the value 0. Then the function will loop through the products in the cart array and increase the total value with the price of each product multiplied by the quantity. Then the total will be printed in the browser.
//Then the function Total() should be called inside the addToCart() function.



function Total() {

    let total = 0;
    let finalQtty = 0;
    let discount = 0;

    for (let val of cart) {

     total = total + (val.price * val.qtty);
     finalQtty = finalQtty + val.qtty;

     if (total > 300) {
        discount = 0.2;
        total= total  * (1-discount);
        
     }
    }
    document.getElementById("price").innerHTML = total + " €" ;
    document.getElementById("numberQtty").innerHTML = finalQtty;
    document.getElementById("discPrice").innerHTML = discount;
   
}

/* function finalQuantity () {

    let finalQtty = 0;
    for (let val of cart) {
     finalQtty = finalQtty + val.qtty;
    }
    document.getElementById("numberQtty").innerHTML = finalQtty;
} */
