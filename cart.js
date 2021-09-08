const container = document.getElementById('container');
let cartStr = localStorage.getItem('cart') ||'[]';
let cartArray = JSON.parse(cartStr);
console.log(cartArray);
//function to create each card for this we are making a for loop thru the cartStr

for (let i=0; i<cartArray.length; i++){
    createCard(cartArray[i]);
}

function createCard(object){
    // console.log('inCreateCard');
    //create the elements here
    //append to the card
    // let path = localStorage.getItem('cart') ||'[]';
    const card = document.createElement('a');

    const name = document.createElement('h2');
    name.innerHTML = object.name;
    // name.classList.add(put classes here);
    card.appendChild(name);

    const options = document.createElement('p');
    options.innerHTML = object.options;
    card.appendChild(options);

    const quantity = document.createElement('p');
    quantity.innerHTML = object.quantity;
    card.appendChild(quantity);


    const imgUrl = document.createElement('img');
    imgUrl.setAttribute('src', object.imageUrl);
    imgUrl.setAttribute('alt', object.name);

    card.appendChild(imgUrl);


    const description = document.createElement('p');
    description.innerHTML = object.description;
    card.appendChild(description);


    const price = document.createElement('p');
    name.innerHTML = object.name;
    card.appendChild(price);
    container.appendChild(card);

    const buyNow = document.createElement('a');
    buyNow.innerText = 'Buy Now';
    buyNow.setAttribute('href', './cart.html');
    card.appendChild(buyNow);

    const removeFromCart = document.createElement('button');
    removeFromCart.setAttribute('type', 'button');
    removeFromCart.innerText = 'Remove';

    removeFromCart.addEventListener('click', removeElement);

    //create buttons to add and substract items from the cart;
    //use Parse Int and create the function for + and -;
    //function to update the view and the option in the cart array;
    //function to sync the cart with local storage;

    // removeFromCart.addEventListener('click', showME);
    function showME(e){
      console.log(e);
    }
    card.appendChild(removeFromCart);
}
function removeElement(event){
  //by traversing the DOM i can get the name of the obj and the lens options then I can use that to figure out the object clicked on
  //then use splice method to remove one item;
  // console.log(event.target);
  const cardToRemove = event.target.parentElement;
  const name = event.target.parentElement.firstElementChild.innerText;
  // console.log(name);
  for(let i=cartArray.length-1; i>-1; i--){

        //this for loop iterates over the cart arr to compare names and option then I'll have to use splice;
    // if (cartArray[i].name === name && cartArray[i].options===options){

    if (cartArray[i].name === name){
      //removing from cartArray
      // console.log('splice', cartArray[i]);
      cartArray.splice(i, 1);
      console.log(cartArray);
      //removing from dom
      cardToRemove.remove();
    }
  }
      // console.log('afterForLoop', cartArray);
      localStorage.setItem('cart', JSON.stringify(cartArray));
      cartArray = JSON.parse(localStorage.getItem('cart'));
}

    // function addItemToCart(item:any){
    //   var cartArray = localStorage.getItem('cart');
    //   var itemsArray = JSON.parse(cartArray);
    //   itemsArray.add(item);
    // }

    //update total items in cart function

      function totalItemsInCart(){
        const cartTotal = document.getElementById(_id);

          let total = 0;
          for (let i = 0; i<cartArray.length; i++){
            total += cartArray[i].price;
            console.log(cartArray[i]);
          }
          console.log(cartTotal.innerHTML, total);
          cartTotal.innerHTML = total;
          loc
      }
