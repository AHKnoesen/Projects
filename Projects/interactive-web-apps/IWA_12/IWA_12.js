// scripts.js

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
    },
  };
  
  // Book 1
  const book1Status = document.querySelector('#book1 .status');
  const book1Reserve = document.querySelector('#book1 .reserve');
  const book1Checkout = document.querySelector('#book1 .checkout');
  const book1Checkin = document.querySelector('#book1 .checkin');
  
  const book1StatusValue = book1Status.textContent.trim().toLowerCase();
  book1Status.style.color = STATUS_MAP[book1StatusValue].color;
  book1Reserve.disabled = !STATUS_MAP[book1StatusValue].canReserve;
  book1Checkout.disabled = !STATUS_MAP[book1StatusValue].canCheckout;
  book1Checkin.disabled = !STATUS_MAP[book1StatusValue].canCheckIn;
  
  // Book 2
  const book2Status = document.querySelector('#book2 .status');
  const book2Reserve = document.querySelector('#book2 .reserve');
  const book2Checkout = document.querySelector('#book2 .checkout');
  const book2Checkin = document.querySelector('#book2 .checkin');
  
  const book2StatusValue = book2Status.textContent.trim().toLowerCase();
  book2Status.style.color = STATUS_MAP[book2StatusValue].color;
  book2Reserve.disabled = !STATUS_MAP[book2StatusValue].canReserve;
  book2Checkout.disabled = !STATUS_MAP[book2StatusValue].canCheckout;
  book2Checkin.disabled = !STATUS_MAP[book2StatusValue].canCheckIn;
  
  // Book 3
  const book3Status = document.querySelector('#book3 .status');
  const book3Reserve = document.querySelector('#book3 .reserve');
  const book3Checkout = document.querySelector('#book3 .checkout');
  const book3Checkin = document.querySelector('#book3 .checkin');
  
  const book3StatusValue = book3Status.textContent.trim().toLowerCase();
  book3Status.style.color = STATUS_MAP[book3StatusValue].color;
  book3Reserve.disabled = !STATUS_MAP[book3StatusValue].canReserve;
  book3Checkout.disabled = !STATUS_MAP[book3StatusValue].canCheckout;
  book3Checkin.disabled = !STATUS_MAP[book3StatusValue].canCheckIn;
  