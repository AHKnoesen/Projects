// Get HTML elements
const html = {
  orders: document.querySelector('.orders'),
  other: {
    grid: document.querySelector('.other.grid'),
    help: {
      button: document.querySelector('.help.button'),
      overlay: document.querySelector('.help.overlay'),
      close: document.querySelector('.help.close'),
    },
    add: {
      button: document.querySelector('.add.button'),
      overlay: document.querySelector('.add.overlay'),
      form: document.querySelector('.add.overlay form'),
      text: document.querySelector('.add.overlay input[name="text"]'),
      table: document.querySelector('.add.overlay input[name="table"]'),
      submit: document.querySelector('.add.overlay button[type="submit"]'),
    },
    edit: {
      overlay: document.querySelector('.edit.overlay'),
      form: document.querySelector('.edit.overlay form'),
      text: document.querySelector('.edit.overlay input[name="text"]'),
      table: document.querySelector('.edit.overlay input[name="table"]'),
      status: document.querySelector('.edit.overlay select[name="status"]'),
      orderId: document.querySelector('.edit.overlay input[name="orderId"]'),
      submit: document.querySelector('.edit.overlay button[type="submit"]'),
      delete: document.querySelector('.edit.overlay button[type="button"]'),
    },
  },
};

// Dragging state
const dragging = {
  id: null,
  over: null,
};

// Toggle overlay
const toggleOverlay = (overlay) => {
  const isOpen = overlay.getAttribute('open') === 'true';
  overlay.setAttribute('open', !isOpen);
};

// Update dragging state
const updateDragging = ({ id = dragging.id, over = dragging.over }) => {
  dragging.id = id;
  dragging.over = over;
};

// Update dragging element's HTML
const updateDraggingHtml = ({ over }) => {
  const orderElements = Array.from(document.querySelectorAll('.order'));
  orderElements.forEach((element) => {
    element.classList.remove('dragging-over');
  });

  if (over) {
    const orderElement = document.querySelector(`[data-id="${dragging.id}"]`);
    if (orderElement) {
      orderElement.classList.add('dragging-over');
    }
  }
};

// Handle drag events
const handleDragStart = (event) => {
  const orderId = event.currentTarget.dataset.id;
  event.dataTransfer.setData('text/plain', orderId);
  updateDragging({ id: orderId });
};

const handleDragEnd = () => {
  updateDragging({ id: null, over: null });
  updateDraggingHtml({ over: null });
};

const handleDragOver = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const column = event.currentTarget.dataset.column;
  const orderElement = document.querySelector(`[data-id="${id}"]`);

  if (orderElement && column) {
    updateDragging({ over: column });
    updateDraggingHtml({ over: orderElement });
  }
};

const handleDragEnter = (event) => {
  event.preventDefault();
  const column = event.currentTarget.dataset.column;
  const orderElement = document.querySelector('.order.dragging-over');

  if (column && orderElement) {
    orderElement.dataset.column = column;
  }
};

const handleDragLeave = (event) => {
  event.preventDefault();
  const orderElement = document.querySelector('.order.dragging-over');

  if (orderElement) {
    orderElement.removeAttribute('data-column');
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const id = event.dataTransfer.getData('text/plain');
  const column = event.currentTarget.dataset.column;
  const orderElement = document.querySelector(`[data-id="${id}"]`);

  if (id && column && orderElement) {
    const orderId = parseInt(id, 10);
    const newColumn = column.toUpperCase();
    const orderStatus = orderElement.querySelector('.status');

    if (orderStatus) {
      orderStatus.textContent = newColumn;
    }

    orderElement.dataset.column = newColumn;
    orderElement.removeAttribute('data-id');
    orderElement.removeAttribute('draggable');

    event.currentTarget.appendChild(orderElement);
    updateDragging({ id: null, over: null });
    updateDraggingHtml({ over: null });
  }
};

// Add event listeners
html.orders.addEventListener('dragstart', handleDragStart);
html.orders.addEventListener('dragend', handleDragEnd);
html.other.grid.addEventListener('dragover', handleDragOver);
html.other.grid.addEventListener('dragenter', handleDragEnter);
html.other.grid.addEventListener('dragleave', handleDragLeave);
html.other.grid.addEventListener('drop', handleDrop);
html.other.help.button.addEventListener('click', () => toggleOverlay(html.other.help.overlay));
html.other.help.close.addEventListener('click', () => toggleOverlay(html.other.help.overlay));
html.other.add.button.addEventListener('click', () => toggleOverlay(html.other.add.overlay));
html.other.add.overlay.addEventListener('click', () => toggleOverlay(html.other.add.overlay));
html.other.add.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = html.other.add.text.value.trim();
  const table = html.other.add.table.value.trim();

  if (text && table) {
    const newOrder = document.createElement('div');
    newOrder.classList.add('order');
    newOrder.draggable = true;
    newOrder.dataset.id = Date.now();
    newOrder.dataset.column = 'PENDING';
    newOrder.innerHTML = `
      <div class="text">${text}</div>
      <div class="table">${table}</div>
      <div class="status">PENDING</div>
    `;

    html.orders.appendChild(newOrder);
    toggleOverlay(html.other.add.overlay);
    html.other.add.form.reset();
  }
});

html.other.edit.overlay.addEventListener('click', () => toggleOverlay(html.other.edit.overlay));
html.other.edit.form.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = html.other.edit.text.value.trim();
  const table = html.other.edit.table.value.trim();
  const status = html.other.edit.status.value;
  const orderId = html.other.edit.orderId.value;

  if (text && table && status && orderId) {
    const orderElement = document.querySelector(`[data-id="${orderId}"]`);

    if (orderElement) {
      const orderText = orderElement.querySelector('.text');
      const orderTable = orderElement.querySelector('.table');
      const orderStatus = orderElement.querySelector('.status');

      if (orderText && orderTable && orderStatus) {
        orderText.textContent = text;
        orderTable.textContent = table;
        orderStatus.textContent = status;
        orderElement.removeAttribute('data-column');
        orderElement.dataset.column = status.toUpperCase();
      }
    }

    toggleOverlay(html.other.edit.overlay);
    html.other.edit.form.reset();
  }
});

html.other.edit.delete.addEventListener('click', () => {
  const orderId = html.other.edit.orderId.value;
  const orderElement = document.querySelector(`[data-id="${orderId}"]`);

  if (orderElement) {
    orderElement.remove();
    toggleOverlay(html.other.edit.overlay);
    html.other.edit.form.reset();
  }
});
