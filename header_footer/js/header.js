const gnbLi = document.querySelectorAll('.gnb li');
const topMenu = document.querySelector('.top-menu')
const subMenu = document.querySelectorAll('.sub-menu');
const openDiv = document.querySelector('.openDiv');
const openDivInner = document.querySelector('.openDivInner');
gnbLi.forEach((item, index) => {
    item.addEventListener('mouseenter', e => {
        openDiv.classList.add('on')
        subMenu.forEach(itemLi => {
            itemLi.classList.remove('on')
            subMenu[index].classList.add('on')
        })
    })
})
subMenu.forEach(item => {
    openDiv.addEventListener('mouseleave', e => {
        item.classList.remove('on');
        e.currentTarget.classList.remove('on')
    });
});
let today = new Date();
let year = today.getFullYear(); // 년도
let month = today.getMonth() + 1;  // 월
let date = today.getDate();  // 날짜
let day = today.getDay();  // 요일
let whatDay = document.querySelector('.date');
let workTime = document.querySelector('.openingHours strong:nth-of-type(2)');
console.log(year);
console.log(month);
console.log(date);
console.log(day);
whatDay.textContent = calTodayMonthDate(month, date, day);
function calTodayMonthDate(month, date, day) {
    switch (day) {
        case 1: day = "월"; break;
        case 2: day = "화"; break;
        case 3: day = "수"; break;
        case 4: day = "목"; break;
        case 5: day = "금"; break;
        case 6: day = "토"; break;
        case 7: day = "일"; break;
    }
    if (month < 10) monthDate = `0${month}.${date}(${day})`
    else monthDate = `${month}.${date}(${day})`
    return monthDate;
}
if (day == 6 || day == 7) {
    workTime.textContent = "휴무일입니다.";
    workTime.style.color = "red";
} else {
    workTime.textContent = "09:00 - 18:00";
}
let lastScrollY;
window.addEventListener('scroll', function () {
    let nowScrollY = window.scrollY;
    if (lastScrollY < nowScrollY) {
        console.log('down');
        topMenu.style.display = "none"
    }
    else {
        console.log('up');
        topMenu.style.display = "flex"
    }
    lastScrollY = nowScrollY;
});
