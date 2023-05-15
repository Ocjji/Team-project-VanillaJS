
if (window.location.pathname.includes("promotion.html")) {
    // promotion.js
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
    console.log("a.html 파일을 찾았습니다.");
}


//header.js
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


if (window.location.pathname.includes("join.html")) {
    // login.js
    // 생년월일
    const birthYear = document.querySelector('.birthYear')
    const birthMonth = document.querySelector('.birthMonth');
    const birthDate = document.querySelector('.birthDate');
    const startYear = 1930;
    let endDate = 0
    let index = 0;
    for (let y = 2023; y >= startYear; y--) {
        birthYear.options[index] = new Option(y, y);
        index++;
    }
    index = 0;
    for (let m = 1; m <= 12; m++) {
        birthMonth.options[index] = new Option(m, m);
        index++;
    }
    lastday()
    function lastday() {
        let Year = birthYear.value;
        let Month = birthMonth.value;
        let day = new Date(new Date(Year, Month, 1) - 86400000).getDate();
        if (day > birthDate.length) {
            for (let i = (birthDate.length + 1); i <= day; i++) {
                birthDate.options[i - 1] = new Option(i, i);
            }
        }
        else if (day < birthDate.length) {
            for (let i = birthDate.length; i >= day; i--) {
                birthDate.options[i] = null;
            }
        }
    }
    //패스워드 확인
    const userPassword = document.querySelector('.userPassword');
    const userRePassword = document.querySelector('.userRePassword');
    const NotCollectPassword = document.querySelector('.NotCollectPassword');
    checkPassword();
    function checkPassword() {
        if (userPassword.value != userRePassword.value) {
            NotCollectPassword.textContent = "비밀번호가 일치하지 않습니다.";
        } else {
            NotCollectPassword.textContent = "비밀번호가 일치합니다.";
        }
    }
    // 우편번호
    function sample4_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function (data) {
                var roadAddr = data.roadAddress;
                var extraRoadAddr = '';
                if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== '' && data.apartment === 'Y') {
                    extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                }
                if (extraRoadAddr !== '') {
                    extraRoadAddr = ' (' + extraRoadAddr + ')';
                }
                document.getElementById('sample4_postcode').value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value = data.jibunAddress;
                if (roadAddr !== '') {
                    document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("sample4_extraAddress").value = '';
                }

                var guideTextBox = document.getElementById("guide");
                if (data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                    guideTextBox.style.display = 'block';

                } else if (data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
                    guideTextBox.style.display = 'block';
                } else {
                    guideTextBox.innerHTML = '';
                    guideTextBox.style.display = 'none';
                }
            }
        }).open();
    }
}
