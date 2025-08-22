# Notification System - Hệ thống thông báo

Một hệ thống thông báo hiện đại, đẹp mắt và dễ sử dụng cho các ứng dụng web.

## 🚀 Tính năng

- ✅ **4 loại thông báo**: Success, Error, Warning, Info
- ✅ **Tự động ẩn**: Có thể cấu hình thời gian hiển thị
- ✅ **Thanh tiến trình**: Hiển thị thời gian còn lại
- ✅ **Nút đóng thủ công**: Người dùng có thể đóng thủ công
- ✅ **Hiệu ứng mượt mà**: Slide in/out với animation đẹp mắt
- ✅ **Responsive design**: Tương thích với mọi thiết bị
- ✅ **Gradient background**: Thiết kế hiện đại với gradient
- ✅ **Icon tương ứng**: Icon phù hợp với từng loại thông báo
- ✅ **Nhiều vị trí**: Có thể đặt ở các vị trí khác nhau
- ✅ **Giới hạn số lượng**: Tự động xóa thông báo cũ khi vượt quá giới hạn

## 📁 Cấu trúc file

```
assets/
├── css/
│   └── notification.css      # CSS cho notification system
└── js/
    └── notification.js       # JavaScript cho notification system

components/
└── notifycation.html         # Demo và test notification system
```

## 🛠️ Cách sử dụng

### 1. Thêm CSS và JavaScript

```html
<!-- Thêm vào <head> -->
<link rel="stylesheet" href="assets/css/notification.css" />

<!-- Thêm vào cuối <body> -->
<script src="assets/js/notification.js"></script>
```

### 2. Sử dụng cơ bản

```javascript
// Hiển thị thông báo thành công
showSuccess("Thành công!", "Thao tác đã được thực hiện thành công.");

// Hiển thị thông báo lỗi
showError("Lỗi!", "Đã xảy ra lỗi trong quá trình xử lý.");

// Hiển thị thông báo cảnh báo
showWarning("Cảnh báo!", "Vui lòng kiểm tra lại thông tin.");

// Hiển thị thông báo thông tin
showInfo("Thông tin", "Đây là một thông báo quan trọng.");
```

### 3. Sử dụng nâng cao

```javascript
// Hiển thị với thời gian tùy chỉnh (10 giây)
showNotification("success", "Thành công!", "Thao tác hoàn tất.", 10000);

// Hiển thị không tự động ẩn
showNotification("info", "Thông báo quan trọng", "Vui lòng đọc kỹ.", 0);

// Xóa tất cả thông báo
clearAllNotifications();
```

### 4. Tùy chỉnh cấu hình

```javascript
// Khởi tạo với tùy chọn tùy chỉnh
const customNotification = new NotificationSystem({
  position: "top-center", // Vị trí: top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
  maxNotifications: 3, // Số lượng thông báo tối đa
  defaultDuration: 3000, // Thời gian hiển thị mặc định (ms)
  autoRemove: true, // Tự động ẩn
});

// Sử dụng instance tùy chỉnh
customNotification.success("Thành công!", "Thao tác hoàn tất.");
```

## 🎨 Tùy chỉnh giao diện

### Vị trí hiển thị

Thêm class vào container để thay đổi vị trí:

```css
.notification-container.top-left      /* Góc trên bên trái */
/* Góc trên bên trái */
/* Góc trên bên trái */
/* Góc trên bên trái */
.notification-container.top-center    /* Giữa trên */
.notification-container.top-right     /* Góc trên bên phải (mặc định) */
.notification-container.bottom-left   /* Góc dưới bên trái */
.notification-container.bottom-center /* Giữa dưới */
.notification-container.bottom-right; /* Góc dưới bên phải */
```

### Kích thước

```css
.notification-container.small  /* Kích thước nhỏ */
/* Kích thước nhỏ */
/* Kích thước nhỏ */
/* Kích thước nhỏ */
.notification-container.large; /* Kích thước lớn */
```

## 📱 Responsive

Hệ thống tự động điều chỉnh trên thiết bị di động:

- Thông báo sẽ chiếm toàn bộ chiều rộng màn hình
- Padding và font-size được điều chỉnh phù hợp
- Các nút demo được sắp xếp theo chiều dọc

## 🔧 API Reference

### NotificationSystem Class

#### Constructor

```javascript
new NotificationSystem(options);
```

**Options:**

- `position` (string): Vị trí hiển thị
- `maxNotifications` (number): Số lượng thông báo tối đa
- `defaultDuration` (number): Thời gian hiển thị mặc định (ms)
- `autoRemove` (boolean): Tự động ẩn

#### Methods

##### show(type, title, message, duration)

Hiển thị thông báo với loại tùy chỉnh.

**Parameters:**

- `type` (string): Loại thông báo ('success', 'error', 'warning', 'info')
- `title` (string): Tiêu đề thông báo
- `message` (string): Nội dung thông báo
- `duration` (number): Thời gian hiển thị (ms, 0 = không tự động ẩn)

**Returns:** ID của thông báo

##### success(title, message, duration)

Hiển thị thông báo thành công.

##### error(title, message, duration)

Hiển thị thông báo lỗi.

##### warning(title, message, duration)

Hiển thị thông báo cảnh báo.

##### info(title, message, duration)

Hiển thị thông báo thông tin.

##### remove(id)

Xóa thông báo theo ID.

##### clearAll()

Xóa tất cả thông báo.

##### updatePosition(position)

Cập nhật vị trí hiển thị.

##### updateMaxNotifications(max)

Cập nhật số lượng thông báo tối đa.

### Global Functions

#### showNotification(type, title, message, duration)

Hiển thị thông báo với loại tùy chỉnh.

#### showSuccess(title, message, duration)

Hiển thị thông báo thành công.

#### showError(title, message, duration)

Hiển thị thông báo lỗi.

#### showWarning(title, message, duration)

Hiển thị thông báo cảnh báo.

#### showInfo(title, message, duration)

Hiển thị thông báo thông tin.

#### clearAllNotifications()

Xóa tất cả thông báo.

## 🎯 Ví dụ sử dụng thực tế

### Trong form đăng nhập

```javascript
// Khi đăng nhập thành công
showSuccess("Đăng nhập thành công!", "Chào mừng bạn quay trở lại.");

// Khi đăng nhập thất bại
showError("Lỗi đăng nhập", "Email hoặc mật khẩu không đúng.");

// Khi tài khoản bị khóa
showWarning("Tài khoản bị khóa", "Vui lòng liên hệ admin để mở khóa.");
```

### Trong thao tác CRUD

```javascript
// Khi thêm dữ liệu thành công
showSuccess("Thêm thành công!", "Dữ liệu đã được lưu vào hệ thống.");

// Khi cập nhật thành công
showSuccess("Cập nhật thành công!", "Thông tin đã được cập nhật.");

// Khi xóa thành công
showSuccess("Xóa thành công!", "Dữ liệu đã được xóa khỏi hệ thống.");

// Khi có lỗi
showError("Lỗi hệ thống", "Không thể thực hiện thao tác. Vui lòng thử lại.");
```

### Thông báo hệ thống

```javascript
// Thông báo bảo trì
showInfo("Bảo trì hệ thống", "Hệ thống sẽ được bảo trì từ 2:00 - 4:00 sáng.");

// Thông báo cập nhật
showInfo("Cập nhật mới", "Phiên bản mới đã sẵn sàng. Vui lòng refresh trang.");
```

## 🐛 Troubleshooting

### Thông báo không hiển thị

1. Kiểm tra console để xem có lỗi JavaScript không
2. Đảm bảo đã include đúng file CSS và JavaScript
3. Kiểm tra z-index của các element khác

### Thông báo hiển thị sai vị trí

1. Kiểm tra CSS position của container
2. Đảm bảo không có CSS khác ghi đè

### Thông báo không tự động ẩn

1. Kiểm tra tham số duration
2. Đảm bảo autoRemove = true trong cấu hình

## 📄 License

MIT License - Sử dụng tự do cho mục đích thương mại và cá nhân.

## 🤝 Đóng góp

Mọi đóng góp đều được chào đón! Vui lòng tạo issue hoặc pull request.

---

**Tác giả:** HTML Template Team  
**Phiên bản:** 1.0.0  
**Cập nhật:** 2024
