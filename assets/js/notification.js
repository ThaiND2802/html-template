/**
 * Notification System JavaScript
 * Hệ thống thông báo với nhiều loại và tùy chọn
 */

class NotificationSystem {
  constructor(options = {}) {
    this.container = null;
    this.notifications = [];
    this.counter = 0;
    this.options = {
      position: options.position || 'top-right', // top-right, top-left, top-center, bottom-right, bottom-left, bottom-center
      maxNotifications: options.maxNotifications || 5,
      defaultDuration: options.defaultDuration || 5000,
      autoRemove: options.autoRemove !== false,
      ...options
    };
    
    this.init();
  }

  init() {
    this.createContainer();
  }

  createContainer() {
    // Remove existing container if any
    const existingContainer = document.getElementById('notificationContainer');
    if (existingContainer) {
      existingContainer.remove();
    }

    // Create new container
    this.container = document.createElement('div');
    this.container.id = 'notificationContainer';
    this.container.className = `notification-container ${this.options.position}`;
    document.body.appendChild(this.container);
  }

  show(type, title, message, duration = null) {
    const actualDuration = duration !== null ? duration : this.options.defaultDuration;
    const id = `notification-${++this.counter}`;
    
    // Check max notifications
    if (this.notifications.length >= this.options.maxNotifications) {
      const oldestNotification = this.notifications[0];
      this.remove(oldestNotification.id);
    }

    const notification = this.createNotification(id, type, title, message, actualDuration);
    
    this.container.appendChild(notification);
    this.notifications.push({ id, element: notification, timer: null });

    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Auto remove
    if (this.options.autoRemove && actualDuration > 0) {
      const timer = setTimeout(() => {
        this.remove(id);
      }, actualDuration);
      
      // Store timer reference
      const notificationData = this.notifications.find(n => n.id === id);
      if (notificationData) {
        notificationData.timer = timer;
      }
    }

    return id;
  }

  createNotification(id, type, title, message, duration) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.id = id;

    const iconMap = {
      success: 'tick-circle',
      error: 'close-circle',
      warning: 'warning-2',
      info: 'info-circle'
    };

    const iconName = iconMap[type] || 'info-circle';

    notification.innerHTML = `
      <div class="notification-icon">
        <i class="iconsax" icon-name="${iconName}"></i>
      </div>
      <div class="notification-content">
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-time">${this.getCurrentTime()}</div>
      </div>
      <button class="notification-close" onclick="notificationSystem.remove('${id}')">
        <i class="iconsax" icon-name="close"></i>
      </button>
      ${duration > 0 ? `
        <div class="notification-progress">
          <div class="notification-progress-bar" style="transition-duration: ${duration}ms;"></div>
        </div>
      ` : ''}
    `;

    // Start progress bar animation
    if (duration > 0) {
      setTimeout(() => {
        const progressBar = notification.querySelector('.notification-progress-bar');
        if (progressBar) {
          progressBar.style.width = '0%';
        }
      }, 10);
    }

    return notification;
  }

  remove(id) {
    const notificationData = this.notifications.find(n => n.id === id);
    if (!notificationData) return;

    const { element, timer } = notificationData;

    // Clear timer if exists
    if (timer) {
      clearTimeout(timer);
    }

    // Add hide animation
    element.classList.add('hide');

    // Remove from DOM after animation
    setTimeout(() => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
      this.notifications = this.notifications.filter(n => n.id !== id);
    }, 300);
  }

  clearAll() {
    this.notifications.forEach(({ id }) => {
      this.remove(id);
    });
  }

  updatePosition(position) {
    this.options.position = position;
    this.container.className = `notification-container ${position}`;
  }

  updateMaxNotifications(max) {
    this.options.maxNotifications = max;
    // Remove excess notifications if needed
    while (this.notifications.length > max) {
      const oldestNotification = this.notifications[0];
      this.remove(oldestNotification.id);
    }
  }

  getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  }

  // Convenience methods
  success(title, message, duration) {
    return this.show('success', title, message, duration);
  }

  error(title, message, duration) {
    return this.show('error', title, message, duration);
  }

  warning(title, message, duration) {
    return this.show('warning', title, message, duration);
  }

  info(title, message, duration) {
    return this.show('info', title, message, duration);
  }
}

// Global notification system instance
let notificationSystem;

// Initialize notification system when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  notificationSystem = new NotificationSystem();
});

// Global functions for easy access
function showNotification(type, title, message, duration = 5000) {
  if (!notificationSystem) {
    notificationSystem = new NotificationSystem();
  }
  return notificationSystem.show(type, title, message, duration);
}

function showSuccess(title, message, duration) {
  if (!notificationSystem) {
    notificationSystem = new NotificationSystem();
  }
  return notificationSystem.success(title, message, duration);
}

function showError(title, message, duration) {
  if (!notificationSystem) {
    notificationSystem = new NotificationSystem();
  }
  return notificationSystem.error(title, message, duration);
}

function showWarning(title, message, duration) {
  if (!notificationSystem) {
    notificationSystem = new NotificationSystem();
  }
  return notificationSystem.warning(title, message, duration);
}

function showInfo(title, message, duration) {
  if (!notificationSystem) {
    notificationSystem = new NotificationSystem();
  }
  return notificationSystem.info(title, message, duration);
}

function clearAllNotifications() {
  if (notificationSystem) {
    notificationSystem.clearAll();
  }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NotificationSystem;
}
