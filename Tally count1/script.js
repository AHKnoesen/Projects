let count = 0;
const countDisplay = document.querySelector('.count');
const addButton = document.querySelector('#add');
const subtractButton = document.querySelector('#subtract');
const resetButton = document.querySelector('#reset');

addButton.addEventListener('click', () => {
	count++;
	countDisplay.textContent = count;
});

subtractButton.addEventListener('click', () => {
	count--;
	countDisplay.textContent = count;
});

resetButton.addEventListener('click', () => {
	count = 0;
	countDisplay.textContent = count;
});
