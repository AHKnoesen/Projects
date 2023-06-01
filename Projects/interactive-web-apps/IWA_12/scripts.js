const STATUS_MAP = {
  shelf: {
      color: 'green',
      canReserve: true,
      canCheckout: true,
      canCheckIn: false,
  },
  reserved: {
      color: 'blue',
      canReserve: false,
      canCheckout: true,
      canCheckIn: false,
  },
  overdue: {
      color: 'red',
      canReserve: false,
      canCheckout: false,
      canCheckIn: true,
  },
  checkedOut: {
      color: 'orange',
      canReserve: false,
      canCheckout: false,
      canCheckIn: true,
  }
};

// Update the buttons and status indicator color based on the status
function updateBookStatus(bookId) {
const bookElement = document.getElementById(bookId);
const statusElement = bookElement.querySelector('.status');
const reserveButton = bookElement.querySelector('.reserve');
const checkoutButton = bookElement.querySelector('.checkout');
const checkinButton = bookElement.querySelector('.checkin');

const status = statusElement.textContent.trim();
const statusInfo = STATUS_MAP[status];

// Update status indicator color
statusElement.style.color = statusInfo.color;

// Update buttons
reserveButton.disabled = !statusInfo.canReserve;
checkoutButton.disabled = !statusInfo.canCheckout;
checkinButton.disabled = !statusInfo.canCheckIn;

// Update button appearance based on status
if (statusInfo.canReserve) {
  reserveButton.classList.remove('disabled');
} else {
  reserveButton.classList.add('disabled');
}

if (statusInfo.canCheckout) {
  checkoutButton.classList.remove('disabled');
} else {
  checkoutButton.classList.add('disabled');
}

if (statusInfo.canCheckIn) {
  checkinButton.classList.remove('disabled');
} else {
  checkinButton.classList.add('disabled');
}
}

// Example usage: updateBookStatus('book1');
