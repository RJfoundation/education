import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// ১. আপনার Firebase Config এখানে দিন
const firebaseConfig = {
    apiKey: "AIzaSyDFmc_fjGRw_0bqj2ZLjUom-6VQvZtAwSQ",
    authDomain: "muslim-pro-eb32d.firebaseapp.com",
    projectId: "muslim-pro-eb32d",
    storageBucket: "muslim-pro-eb32d.firebasestorage.app",
    messagingSenderId: "701400663540",
    appId: "1:701400663540:web:ce595923530df62bde65a1"
};

// Initialize
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Variables
let cart = [];
let user = null;

// Selectors
const productGrid = document.getElementById('product-grid');
const loginBtn = document.getElementById('login-btn');
const logoutBtn = document.getElementById('logout-btn');
const userProfile = document.getElementById('user-profile');
const cartBtn = document.getElementById('cart-btn');
const cartOverlay = document.getElementById('cart-overlay');
const closeCart = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartBadge = document.querySelector('.cart-badge');

// --- Auth Functions ---
onAuthStateChanged(auth, (u) => {
    if (u) {
        user = u;
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        document.getElementById('user-pic').src = u.photoURL;
        document.getElementById('user-name').innerText = u.displayName.split(' ')[0];
    } else {
        user = null;
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
});

loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

// --- Product Logic ---
async function fetchProducts() {
    // ডামি ডাটা (আপনি ফায়ারবেস কানেক্ট করলে এখান থেকে ডাটা আসবে)
    const products = [
        { id: 1, title: "iPhone 15 Pro", price: 125000, img: "https://diamu.com.bd/wp-content/uploads/2023/09/iPhone-15-Pro-Blue-Titanium.jpg" },
        { id: 2, title: "Sony WH-1000XM5", price: 35000, img: "https://m.media-amazon.com/images/I/61+79vK9VjL._AC_SL1500_.jpg" },
        { id: 3, title: "MacBook Air M2", price: 115000, img: "https://p-bd.com/wp-content/uploads/2022/07/mly33.jpg" }
    ];
    renderProducts(products);
}

function renderProducts(products) {
    productGrid.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.title}">
            <h3>${p.title}</h3>
            <p class="price">৳ ${p.price}</p>
            <button class="add-btn" onclick="addToCart('${p.id}', '${p.title}', ${p.price}, '${p.img}')">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// --- Cart Logic ---
window.addToCart = (id, title, price, img) => {
    if (!user) {
        alert("আগে লগইন করুন!");
        signInWithPopup(auth, provider);
        return;
    }
    const exists = cart.find(i => i.id === id);
    if (exists) {
        exists.qty++;
    } else {
        cart.push({ id, title, price, img, qty: 1 });
    }
    updateCartUI();
};

function updateCartUI() {
    cartBadge.innerText = cart.reduce((acc, i) => acc + i.qty, 0);
    cartTotal.innerText = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.img}">
            <div>
                <h4>${item.title}</h4>
                <p>৳ ${item.price} x ${item.qty}</p>
            </div>
            <button onclick="removeFromCart('${item.id}')" style="border:none; background:none; cursor:pointer; color:red;">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

window.removeFromCart = (id) => {
    cart = cart.filter(i => i.id !== id);
    updateCartUI();
};

// --- Sidebar Toggles ---
cartBtn.onclick = () => cartOverlay.classList.add('active');
closeCart.onclick = () => cartOverlay.classList.remove('active');

// Start
fetchProducts();





