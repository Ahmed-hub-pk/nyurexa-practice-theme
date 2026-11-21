document.querySelectorAll('.add-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var li = btn.closest('li');
      var select = li.querySelector('.variant-select');
      var variantId = select ? select.value : btn.dataset.variantId;

      fetch('/cart/add.js', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(variantId), quantity: 1 }] })
      })
      .then(function (response) {
        if (!response.ok) { throw new Error('Add failed: ' + response.status); }
        return response.json();
      })
      .then(function () {
        return fetch('/cart.js');
      })
      .then(function (response) { return response.json(); })
      .then(function (cart) {
  document.getElementById('cart-count').textContent = cart.item_count;
  document.getElementById('cart-msg').textContent = 'Added to cart!';

  var list = document.getElementById('cart-list');
  list.innerHTML = '';
  cart.items.forEach(function (item) {
    var li = document.createElement('li');
    li.textContent = item.product_title + ' (' + item.variant_title + ') x ' + item.quantity;
    list.appendChild(li);
  });
  document.getElementById('cart-total').textContent = '$' + (cart.total_price / 100).toFixed(2);
})
      .catch(function (error) {
        document.getElementById('cart-msg').textContent = 'Error: ' + error.message;
      });
    });
  });
