        //id will be retreived from the querystring URLSearchParams
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');

        //TODO:get cart from local storage
        const currItem = {
          //what propreties do i need from fetch call
          name: '',
          description: '',
          price: '',
          id: '',
          options:'',
          imageUrl:'',
          quantity:1
          //update the option here using an event listener (change)
        };

        // const cart = {
        //   name: '',
        //   description: '',
        //   price: '',
        //   quantity: ''
        // }

        let cartStr = localStorage.getItem('cart') ||'[]';
        let cartArray = JSON.parse(cartStr);
        console.log('this is the cart', cartArray);




      fetch(`http://localhost:3000/api/cameras/${id}`)
        .then(response => {
        return  response.json()
         })
        .then(data => {
          initItem(data);
          buildPage(data);
        })
        .catch(error => console.log(error));


        function initItem(obj){
          currItem.name = obj.name;
          currItem.description = obj.description;
          currItem.price = obj.price;
          currItem.imageUrl = obj.imageUrl;
          currItem.id = obj._id;
        }

        function buildPage(obj){
          const card = document.getElementById('container');

          const name = document.createElement('h2');
          name.innerHTML = obj.name;
          card.appendChild(name);

          const imgUrl = document.createElement('img');
          imgUrl.setAttribute('src', obj.imageUrl);
          imgUrl.setAttribute('alt', obj.name);
          card.appendChild(imgUrl);

          const pullDown = createPullDown(obj.lenses);
          pullDown.addEventListener('change', handleOptionChange);
          card.appendChild(pullDown);

          const description = document.createElement('description');
          description.innerHTML=obj.description;
          card.appendChild(description);

          const price = document.createElement('price');
          price.innerHTML = obj.price;
          card.appendChild(price);


          const options = document.createElement('lenses');
          options.innerHTML=obj.lenses;
          card.appendChild(options);
          // const lenses = document.createElement('lenses');
          // description.innerHTML = obj.lenses;
          // card.appendChild(lenses);

          const addToCartButton = document.createElement('button');
          addToCartButton.innerText = 'Add To Cart';
          addToCartButton.addEventListener('click', addToCart);
          card.appendChild(addToCartButton);
          // addToCartButton.addEventListener('click', addItem);


          const buyNow = document.createElement('a');
          buyNow.innerText = 'Buy Now';
          buyNow.setAttribute('href', './cart.html')
          card.appendChild(buyNow);

          const goToCart = document.createElement('a');
          goToCart.innerText = 'Your Cart';
          goToCart.setAttribute('href', './cart.html');
          card.appendChild(goToCart);

        }

        function createPullDown(options){
          const select = document.createElement('select');

          for (let i=0; i<options.length; i++){
            const option = document.createElement('option');
            option.innerText = options[i];
            option.setAttribute('value', options[i]);
            select.appendChild(option);
          }
          return select;
        }

        function handleOptionChange(ev){
          console.log(ev.target.value);
          currItem.options = ev.target.value

        }

        function addToCart(){
          let cartChange = false;
        // then if nothing in cart
        if (cartArray.length === 0) {
            cartArray.push(currItem);
            cartChange = true;
        } else  {
            // then if same name, same option increase quantity
            for(i=0; i < cartArray.length; i++){
                if (currItem.name === cartArray[i].name && currItem.lenses === cartArray[i].lenses) {
                    cartArray[i].quantity += 1;
                    cartChange = true;
                }
            }
        }
        // if cart has changed above don't do anything
        // if there is a cart and nothing has changed
        if (!cartChange) {
            cartArray.push(currItem);
        }
        // this resyncs the cart
        localStorage.setItem("cart" , JSON.stringify(cartArray));
        cartArray = JSON.parse(localStorage.getItem("cart"));
        // then reset the indicator
        cartChange = false;
        document.getElementById('cartItemCount').innerHTML=cartArray.length;
        // you may not need this.
        // add 1 to current item quantity (if you start with zero)
        //currItem.qty = 1;

          //if (cartArray.)// this is if the currItem name is not in the cartArray then .push
          //this will be the functionality that adds stuff to cart;
          //make conditionals
          //only one sameItem should be in the cart
          //here I should build the conditionals to push or not the item in the cart; using the name and lens options propreties
          // console.log('inTheAddToCartFunction', cartArray);

        }


        //


        // console.log(currItem);
        //
        // function displayCurrItem(data){
        //   const currItem = data;
        //   // console.log(id);
        //   const container = document.getElementById('container');
        // }
        //
        // function createCard(obj){
        //   const card = document.createElement('a');
        //   const name = document.createElement('h2');
        //   name.innerHTML = obj.name;
        //   card.appendChild(name);
        //
        //   console.log(card);
        // }
