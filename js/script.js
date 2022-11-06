// dummy products
const dummyProducts = [
	{
		id: 1,
		title: 'Smartphone Oneplus CE2 Lite 5G 128GB',
		price: 349990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/16474100_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 2,
		title: 'HP 14-cf2529la Intel i3-10110U 8GB RAM 256GB',
		price: 499990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/16259203_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 3,
		title: 'Audifono Inalambrico HiFi Rolling Stone Latitude Blancophone',
		price: 1200,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/gsc_112919227_459188_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 4,
		title: 'Ventilador Pedestal Ventilador Indoor',
		price: 44990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/gsc_114377088_987723_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 5,
		title: 'Pantalon ecocuero negro elasticado tiro alto',
		price: 25990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/115250107_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 6,
		title: 'Tableta Digitalizadora Huion Kamvas 13 ',
		price: 259990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/gsc_113277639_601510_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 7,
		title: 'Bebeglo Silla De Auto Convertible Azul Bxs-213',
		price: 99990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/6549933_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 8,
		title: 'Mesa de Comedor Empoli',
		price: 399990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/881999730_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 9,
		title: 'Parlante Bluetooth Soundflow',
		price: 59990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/15961503_1?wid=1500&hei=1500&qlt=70',
	},
	{
		id: 10,
		title: 'Parrilla Eléctrica con Vidrio TH-224',
		price: 59990,
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut quis.',
		thumbnail:
			'https://falabella.scene7.com/is/image/Falabella/14399853_1?wid=1500&hei=1500&qlt=70',
	},
];

// cart state
let cartState = [];

// products
let products;

// contentDiv
const contentDiv = document.getElementById('content');

// modal body
const modalBody = document.getElementById('modal-body');

// cart button
const cartButton = document.getElementById('cart-btn');

// setState
const setCartState = state => {
	cartState = state;
};

// get cart state
const getCartState = () => [...cartState];

// add to product to cartState
const addItemToCart = id => {
	const prevState = getCartState();
	const productId = id;
	const productToAdd = products.find(product => product.id === productId);
	prevState.push(productToAdd);
	setCartState(prevState);
};

// Remove item from cart
const removeItemFromCart = id => {
	const cartState = getCartState();
	const newState = cartState.filter(item => item.id !== id);
	setCartState(newState);
	renderModal();
};

// fetch notebooks from mercadolibre
const fetchNotebooks = async () => {
	const response = await axios.get(
		'https://api.mercadolibre.com/sites/MLC/search?q=notebook'
	);
	const { results: notebooks } = response.data;
	return notebooks;
};

// create delete button for cart item
const createDeleteButton = id => {
	const delButton = document.createElement('button');
	delButton.addEventListener('click', () => removeItemFromCart(id));
	delButton.innerHTML = 'Delete Item';
	return delButton;
};

// create cart item
const createCartItem = item => {
	const cartItem = document.createElement('p');
	cartItem.innerHTML = item.title;
	return cartItem;
};

// fill modal body with items if cart has any
const fillModal = items => {
	items.forEach(item => {
		const itemDiv = document.createElement('div');
		const cartItem = createCartItem(item);
		const delButton = createDeleteButton(item.id);
		itemDiv.appendChild(cartItem);
		itemDiv.appendChild(delButton);
		modalBody.appendChild(itemDiv);
	});
};

// render items inside modal
const renderModal = () => {
	const cartItems = getCartState();
	modalBody.innerHTML = '';
	if (cartItems.length === 0) {
		modalBody.innerHTML = '<p>You have no items in your cart</p>';
	} else {
		fillModal(cartItems);
	}
};

// randomize items inside an array
const randomizeItems = array => {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

// create product card
const createProductCard = product => {
	const { title, price, thumbnail, id } = product;
	const card = document.createElement('div');
	card.className = 'card';
	card.style.width = '18rem';
	card.innerHTML = `
    <img src="${thumbnail}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <p class="card-text">lorem ipsum</p>
    </div>
    <div class="card-body">
        <a href="#" class="card-link">${price}</a>
        <button id="button-${id}" class="card-link"> Add to Cart</button>
    </div>
    `;
	return card;
};

// show products
const showProducts = async () => {
	contentDiv.innerHTML = '';
	notebooks = await fetchNotebooks();
	products = [...notebooks, ...dummyProducts];
	const toDisplayProducts = randomizeItems(products);
	toDisplayProducts.map(product => {
		contentDiv.appendChild(createProductCard(product));
		const productButton = document.getElementById(`button-${product.id}`);
		productButton.addEventListener('click', () => addItemToCart(product.id));
	});
};

// add eventlistener to window
window.addEventListener('load', showProducts);

// add eventListener to cart button
cartButton.addEventListener('click', renderModal);
