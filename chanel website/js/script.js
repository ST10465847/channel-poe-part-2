// ----- Cart Variables -----
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close-btn');
const cartItems = document.getElementById('cart-items');
const checkoutBtn = document.getElementById('checkout-btn');
const addToCartButtons = document.querySelectorAll('.add-to-cart');

let cart = [];
let total = 0;

// Format numbers as Rands
function formatRands(amount) {
  return `R${amount.toLocaleString()}`;
}

// ----- Cart Functions -----
function updateCart() {
  cartItems.innerHTML = '';
  if(cart.length === 0) {
    cartItems.innerHTML = '<li>Your cart is empty</li>';
    return;
  }

  total = 0;
  cart.forEach((item, index) => {
    const li = document.createElement('li');
    li.innerHTML = `${item.name} x ${item.qty} - ${formatRands(item.price * item.qty)}
      <button class="remove-btn" data-index="${index}">Remove</button>`;
    cartItems.appendChild(li);
    total += item.price * item.qty;
  });

  const totalLi = document.createElement('li');
  totalLi.style.fontWeight = 'bold';
  totalLi.textContent = `Total: ${formatRands(total)}`;
  cartItems.appendChild(totalLi);

  // Remove button functionality
  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index');
      cart.splice(index, 1);
      updateCart();
    });
  });
}

// Add to Cart click
addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const card = e.target.closest('.card');
    const name = card.querySelector('p').innerText;
    const priceText = card.querySelector('.price').innerText;
    const price = parseInt(priceText.replace(/R|,/g, ''));

    // Check if item exists
    const existing = cart.find(item => item.name === name);
    if(existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }

    updateCart();

    // Animation
    let anim = document.createElement('div');
    anim.classList.add('added-animation');
    anim.innerText = 'Added!';
    card.appendChild(anim);
    setTimeout(() => anim.classList.add('show'), 10);
    setTimeout(() => anim.remove(), 1000);
  });
});

// Open/Close Cart Modal
cartBtn.addEventListener('click', () => cartModal.style.display = 'block');
closeBtn.addEventListener('click', () => cartModal.style.display = 'none');
window.addEventListener('click', (e) => {
  if(e.target === cartModal) cartModal.style.display = 'none';
});

// Checkout
if(checkoutBtn) {
  checkoutBtn.addEventListener('click', () => {
    if(cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    alert(`Thank you for your purchase! Total: ${formatRands(total)}`);
    cart = [];
    updateCart();
  });
}

// ----- Look of the Day -----
const lookOfTheDayContainer = document.querySelector('.look-of-the-day');
const products = [
  { name: "Luxury Dress", image: "images/women outfit 1.jpg", price: 4500 },
  { name: "Handbag", image: "images/women outfit 2.jpg", price: 6000 },
  { name: "Accessories", image: "images/women outfit 3.jpg", price: 2200 },
  { name: "Tailored Suits", image: "images/men outfit 2.jpg", price: 7500 },
  { name: "Luxury Perfume", image: "images/products fragrance1..jpg", price: 3500 }
];

function getLookOfTheDay() {
  if(!lookOfTheDayContainer) return;
  const day = new Date().getDate();
  const product = products[day % products.length];

  lookOfTheDayContainer.innerHTML = `
    <div class="card">
      <img src="${product.image}" alt="${product.name}">
      <p>${product.name}</p>
      <p class="price">R${product.price}</p>
      <button class="add-to-cart">Add to Cart</button>
    </div>
  `;

  // Rebind Add to Cart for Look of the Day
  lookOfTheDayContainer.querySelector('.add-to-cart').addEventListener('click', () => {
    const existing = cart.find(item => item.name === product.name);
    if(existing) existing.qty++;
    else cart.push({ name: product.name, price: product.price, qty: 1 });
    updateCart();
    alert(`${product.name} added to cart!`);
  });
}
getLookOfTheDay();

// ----- Contact Form Validation -----
const contactForm = document.querySelector('form');
if(contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if(!name || !email || !message){
      alert("Please fill out all fields.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(email)){
      alert("Please enter a valid email address.");
      return;
    }

    alert("Thank you for your message! We'll get back to you soon.");
    contactForm.reset();
  });
}

// ----- Interactive Timeline -----
document.querySelectorAll('.timeline .year h3').forEach(year => {
  year.addEventListener('click', () => {
    const details = year.nextElementSibling;
    details.style.display = details.style.display === 'block' ? 'none' : 'block';
  });
});
