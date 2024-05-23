const contatosList = document.querySelector('#contatos');
const addProductForm = document.querySelector('#add-contatos-form');

// Function to fetch all products from the server
async function fetchProducts() {
  const response = await fetch('http://localhost:3000/contatos');
  const contatos = await response.json();
 // location.reload()
  // Clear product list
  contatosList.innerHTML = '';

  // Add each product to the list
  contatos.forEach(contato => {
    const li = document.createElement('li');
    li.innerHTML = `${contato.nome} - ${contato.numero} - ${contato.endereco}`;

    // Add delete button for each product
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.addEventListener('click', async () => {
      await deleteProduct(contato.id);
      await fetchProducts();
    });
    li.appendChild(deleteButton);

    // Add update button for each product
    const updateButton = document.createElement('button');
    updateButton.innerHTML = 'Update';
    updateButton.addEventListener('click', async () => {
      const nome = addProductForm.elements['nome'].value
      const numero = addProductForm.elements['numero'].value
      const endereco = addProductForm.elements['endereco'].value
      await updateProduct(contato.id,nome,numero,endereco)
      await fetchProducts()
    });
    li.appendChild(updateButton);

    contatosList.appendChild(li);
  });
}


// Event listener for Add Product form submit button
addProductForm.addEventListener('submit', async event => {
  event.preventDefault();
  const nome = addProductForm.elements['nome'].value;
  const numero = addProductForm.elements['numero'].value;
  const endereco = addProductForm.elements['endereco'].value;
  addProduct(nome, numero,endereco);
  addProductForm.reset();
  location.reload()
});

// Function to add a new product
async function addProduct(nome, numero,endereco) {
  const response = await fetch('http://localhost:3000/contatos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, numero,endereco })
  });
  return response.json();
}

// Function to delete a new product
async function deleteProduct(id) {
  const response = await fetch('http://localhost:3000/contatos/' + id, {
    method: 'DELETE'
  });
  //return response.json();
}

// Function to delete a new product
async function updateProduct(id,nome,numero,endereco) {
  const response = await fetch('http://localhost:3000/contatos/' + id, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: nome,
      numero:numero,
      endereco:endereco,
    }),
  });
  //return response.json();
}


// Fetch all products on page load
fetchProducts();
