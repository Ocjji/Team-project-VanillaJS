const promotionBox = document.querySelector('.promotionBox');
const cardBox = document.querySelector('.cardBox');
const eventBtn = document.querySelector('.eventBtn');
const membershipBtn = document.querySelector('.membershipBtn');

eventBtn.addEventListener('click', e => {
    cardBox.classList.remove('on');
    promotionBox.classList.add('on');
    e.currentTarget.classList.add('onBtn');
    membershipBtn.classList.remove('onBtn');
})
membershipBtn.addEventListener('click', e => {
    promotionBox.classList.remove('on');
    cardBox.classList.add('on');
    e.currentTarget.classList.add('onBtn');
    eventBtn.classList.remove('onBtn');
})