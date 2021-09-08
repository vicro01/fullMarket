fetch('http://localhost:3000/api/cameras')
  .then(response => {
  return  response.json();
   })
  .then(data => {
    console.log(data);
    displayData(data);
  })
  .catch(error => console.log(error));


function displayData(data){

  const dataArray = data;

  const container = document.getElementById('container');
  for(let i=0; i<dataArray.length; i++){
    createCard(dataArray[i]);
  }
}

function createCard(obj){
  const card = document.createElement('a');
  let path = `./singleproduct.html?id=${obj._id}`;
  // let path = 'singleproduct.html' + '/?=' + obj._id;
  card.setAttribute('href', path);
  // cardName
  const name = document.createElement('h2');
  name.innerHTML = obj.name;
  // name.classList.add(put classes here);
  card.appendChild(name);

  // const productId = document.getElementById('container');

  const imgUrl = document.createElement('img');
  imgUrl.setAttribute('src', obj.imageUrl);
  imgUrl.setAttribute('alt', obj.name);
  card.appendChild(imgUrl);

  const description = document.createElement('p');
  description.innerHTML = obj.description;
  card.appendChild(description);

  const price = document.createElement('p');
  name.innerHTML = obj.name;
  card.appendChild(price);
  container.appendChild(card);
}
