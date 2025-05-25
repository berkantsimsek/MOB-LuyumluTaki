document.addEventListener("DOMContentLoaded", function () {
  let totalPrice = 0;
  let cartItems = [];

  const cartToggle = document.getElementById("cart-toggle");
  const cartSidebar = document.getElementById("cart");
  const closeCartButton = document.getElementById("close-cart");

  // Sepet yan panelini aç/kapat kısmı burada oldu
  cartToggle.addEventListener("click", function () {
    cartSidebar.classList.toggle("active");
  });

  // Sepet yan panelini kapat tıklayınca kapanıyor
  closeCartButton.addEventListener("click", function () {
    cartSidebar.classList.remove("active");
  });

  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", function () {
      let price = parseFloat(this.getAttribute("data-price"));
      let productName = this.previousElementSibling.previousElementSibling.textContent;

      totalPrice += price;
      cartItems.push({ name: productName, price: price });

      // Sepete ürün eklemediğimiz kısım
      let cartItemsElement = document.getElementById("cart-items");
      let newItem = document.createElement("li");
      newItem.innerHTML = `${productName} - ₺${price.toFixed(2)} 
        <button class="delete-item">X</button>`;

      cartItemsElement.appendChild(newItem);

      // Toplam fiyatı güncelle totalden fiyat düşüyor
      document.getElementById("total-price").textContent = totalPrice.toFixed(2);

      // Sepet sayısını güncelle sonra sepet burada güncelleniyor
      document.getElementById("cart-count").textContent = cartItems.length;

      // Silme işlemi buradan yapılıyor
      newItem.querySelector(".delete-item").addEventListener("click", function () {
        totalPrice -= price;
        document.getElementById("total-price").textContent = totalPrice.toFixed(2);
        cartItems = cartItems.filter(item => item.name !== productName || item.price !== price);
        document.getElementById("cart-count").textContent = cartItems.length;
        newItem.remove();
      });
    });
  });
});
