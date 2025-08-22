// Payment Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Khởi tạo các sự kiện
  initializeQuantityControls();
  initializeDeleteButtons();
  updateTotalCost();
  
  // Khởi tạo trạng thái disabled cho nút minus
  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    updateMinusButtonState(input);
  });
});

// Xử lý điều khiển số lượng
function initializeQuantityControls() {
  const quantityBtns = document.querySelectorAll('.quantity-btn');
  
  quantityBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.parentElement.querySelector('.quantity-input');
      const currentValue = parseInt(input.value);
      const productName = this.closest('.product-item').querySelector('.product-name')?.textContent || 'Sản phẩm';
      
      if (this.classList.contains('minus')) {
        if (currentValue > 1) {
          input.value = currentValue - 1;
          // Hiển thị thông báo giảm số lượng
          showInfo('Cập nhật số lượng', `Đã giảm số lượng "${productName}" xuống ${currentValue - 1}.`);
        }
      } else if (this.classList.contains('plus')) {
        input.value = currentValue + 1;
        // Hiển thị thông báo tăng số lượng
        showInfo('Cập nhật số lượng', `Đã tăng số lượng "${productName}" lên ${currentValue + 1}.`);
      }
      
      // Cập nhật trạng thái disabled cho nút minus
      updateMinusButtonState(input);
      
      // Cập nhật thành tiền cho sản phẩm này
      updateProductSubtotal(input);
      // Cập nhật tổng tiền
      updateTotalCost();
    });
  });
  
  // Xử lý khi người dùng nhập trực tiếp vào input
  const quantityInputs = document.querySelectorAll('.quantity-input');
  quantityInputs.forEach(input => {
    input.addEventListener('change', function() {
      const productName = this.closest('.product-item').querySelector('.product-name')?.textContent || 'Sản phẩm';
      
      if (this.value < 1) {
        this.value = 1;
        showWarning('Số lượng không hợp lệ', 'Số lượng tối thiểu là 1.');
      } else {
        showInfo('Cập nhật số lượng', `Đã cập nhật số lượng "${productName}" thành ${this.value}.`);
      }
      
      updateMinusButtonState(this);
      updateProductSubtotal(this);
      updateTotalCost();
    });
  });
}

// Cập nhật trạng thái disabled cho nút minus
function updateMinusButtonState(input) {
  const minusBtn = input.parentElement.querySelector('.minus');
  const currentValue = parseInt(input.value);
  
  if (currentValue <= 1) {
    minusBtn.disabled = true;
  } else {
    minusBtn.disabled = false;
  }
}

// Cập nhật thành tiền cho một sản phẩm
function updateProductSubtotal(quantityInput) {
  const productRow = quantityInput.closest('.product-item');
  const priceElement = productRow.querySelector('.product-price');
  const subtotalElement = productRow.querySelector('.product-subtotal');
  
  const price = parseFloat(priceElement.textContent.replace(/[^\d]/g, ''));
  const quantity = parseInt(quantityInput.value);
  const subtotal = price * quantity;
  
  subtotalElement.textContent = formatCurrency(subtotal);
}

// Xử lý nút xóa sản phẩm
function initializeDeleteButtons() {
  const deleteBtns = document.querySelectorAll('.delete-btn');
  
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const productRow = this.closest('.product-item');
      const productName = productRow.querySelector('.product-name')?.textContent || 'Sản phẩm';
      
      // Hiển thị confirm dialog
      if (confirm(`Bạn có chắc chắn muốn xóa "${productName}" khỏi giỏ hàng?`)) {
        productRow.remove();
        updateTotalCost();
        
        // Hiển thị thông báo xóa thành công
        showSuccess('Đã xóa sản phẩm', `${productName} đã được xóa khỏi giỏ hàng.`);
        
        // Kiểm tra nếu không còn sản phẩm nào
        const remainingProducts = document.querySelectorAll('.product-item');
        if (remainingProducts.length === 0) {
          showEmptyCart();
          showWarning('Giỏ hàng trống', 'Bạn đã xóa tất cả sản phẩm khỏi giỏ hàng.');
        }
      }
    });
  });
}

// Hiển thị thông báo giỏ hàng trống
function showEmptyCart() {
  const productList = document.querySelector('.product-list');
  productList.innerHTML = `
    <div class="empty-cart">
      <div class="empty-cart-icon">
        <i class="iconsax" icon-name="shopping-cart" style="font-size: 48px; color: #ccc;"></i>
      </div>
      <h3>Giỏ hàng trống</h3>
      <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
      <a href="../pages/home.html" class="continue-shopping-btn">Tiếp tục mua sắm</a>
    </div>
  `;
  
  // Ẩn phần thanh toán
  document.querySelector('.payment-bottom').style.display = 'none';
}

// Cập nhật tổng chi phí
function updateTotalCost() {
  const subtotals = document.querySelectorAll('.product-subtotal');
  let total = 0;
  
  subtotals.forEach(subtotal => {
    const amount = parseFloat(subtotal.textContent.replace(/[^\d]/g, ''));
    total += amount;
  });
  
  // Cập nhật hiển thị tổng tiền
  const merchandiseTotal = document.querySelector('.cost-item:not(.total) .cost-value');
  const totalAmount = document.querySelector('.cost-item.total .cost-value');
  
  if (merchandiseTotal) {
    merchandiseTotal.textContent = formatCurrency(total);
  }
  if (totalAmount) {
    totalAmount.textContent = formatCurrency(total);
  }
}

// Format tiền tệ
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    minimumFractionDigits: 0
  }).format(amount);
}

// Xử lý form đặt hàng
document.addEventListener('DOMContentLoaded', function() {
  const orderForm = document.querySelector('.order-form');
  const confirmBtn = document.querySelector('.confirm-order-btn');
  
  if (confirmBtn) {
    confirmBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateOrderForm()) {
        // Hiển thị loading
        this.textContent = 'Đang xử lý...';
        this.disabled = true;
        
        // Hiển thị thông báo đang xử lý
        showInfo('Đang xử lý đơn hàng...', 'Vui lòng chờ trong giây lát.');
        
        // Simulate API call
        setTimeout(() => {
          // Hiển thị thông báo thành công
          showSuccess(
            'Đặt hàng thành công!', 
            'Đơn hàng của bạn đã được xác nhận. Chúng tôi sẽ liên hệ sớm nhất!'
          );
          
          // Reset form
          if (orderForm) {
            orderForm.reset();
          }
          
          // Reset button
          this.textContent = 'XÁC NHẬN ĐẶT HÀNG';
          this.disabled = false;
          
          // Có thể thêm logic chuyển hướng sau khi đặt hàng thành công
          // setTimeout(function() {
          //   window.location.href = '/order-confirmation.html';
          // }, 3000);
        }, 2000);
      } else {
        // Hiển thị thông báo lỗi validation
        showError('Lỗi thông tin', 'Vui lòng kiểm tra lại thông tin đặt hàng.');
      }
    });
  }
});

// Validate form đặt hàng
function validateOrderForm() {
  const requiredFields = [
    { id: 'customer-name', label: 'Họ tên' },
    { id: 'phone', label: 'Số điện thoại' },
    { id: 'email', label: 'Email' },
    { id: 'address', label: 'Địa chỉ' }
  ];
  
  let isValid = true;
  let errorMessages = [];
  
  requiredFields.forEach(field => {
    const element = document.getElementById(field.id);
    const value = element.value.trim();
    
    if (!value) {
      showFieldError(element, `${field.label} là bắt buộc`);
      errorMessages.push(`${field.label} là bắt buộc`);
      isValid = false;
    } else if (field.id === 'email' && !isValidEmail(value)) {
      showFieldError(element, 'Email không hợp lệ');
      errorMessages.push('Email không hợp lệ');
      isValid = false;
    } else if (field.id === 'phone' && !isValidPhone(value)) {
      showFieldError(element, 'Số điện thoại không hợp lệ');
      errorMessages.push('Số điện thoại không hợp lệ');
      isValid = false;
    } else {
      clearFieldError(element);
    }
  });
  
  // Kiểm tra giỏ hàng có sản phẩm không
  const productItems = document.querySelectorAll('.product-item');
  if (productItems.length === 0) {
    showWarning('Giỏ hàng trống', 'Vui lòng thêm sản phẩm vào giỏ hàng trước khi đặt hàng.');
    isValid = false;
  }
  
  return isValid;
}

// Hiển thị lỗi cho field
function showFieldError(element, message) {
  clearFieldError(element);
  element.style.borderColor = '#dc3545';
  
  const errorDiv = document.createElement('div');
  errorDiv.className = 'field-error';
  errorDiv.textContent = message;
  errorDiv.style.color = '#dc3545';
  errorDiv.style.fontSize = '12px';
  errorDiv.style.marginTop = '5px';
  
  element.parentNode.appendChild(errorDiv);
}

// Xóa lỗi cho field
function clearFieldError(element) {
  element.style.borderColor = '#ddd';
  const existingError = element.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
}

// Validate email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate phone
function isValidPhone(phone) {
  const phoneRegex = /^[0-9]{10,11}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
}

// Thêm CSS cho empty cart
const emptyCartStyles = `
  .empty-cart {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .empty-cart-icon {
    margin-bottom: 20px;
  }
  
  .empty-cart h3 {
    color: #333;
    margin-bottom: 10px;
  }
  
  .empty-cart p {
    color: #666;
    margin-bottom: 30px;
  }
  
  .continue-shopping-btn {
    display: inline-block;
    padding: 12px 24px;
    background: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 500;
    transition: background 0.2s;
  }
  
  .continue-shopping-btn:hover {
    background: #0056b3;
  }
`;

// Thêm styles vào head
const styleSheet = document.createElement('style');
styleSheet.textContent = emptyCartStyles;
document.head.appendChild(styleSheet);
