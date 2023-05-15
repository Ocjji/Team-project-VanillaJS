console.log('     ██╗██╗   ██╗     ██╗██╗   ██╗████████╗ ██████╗ ██╗   ██╗██████╗ ');
console.log('     ██║██║   ██║     ██║██║   ██║╚══██╔══╝██╔═══██╗██║   ██║██╔══██╗ ');
console.log('     ██║██║   ██║     ██║██║   ██║   ██║   ██║   ██║██║   ██║██████╔╝ ');
console.log('██   ██║██║   ██║██   ██║██║   ██║   ██║   ██║   ██║██║   ██║██╔══██╗ ');
console.log('╚█████╔╝╚██████╔╝╚█████╔╝╚██████╔╝   ██║   ╚██████╔╝╚██████╔╝██║  ██║');
const get = (target) => {
    return document.querySelector(target);
};
const getAll = (target) => {
    return document.querySelectorAll(target);
};

// vis
let $H_visNext = get('.hotelVis .inner .btn .next');
let $H_visPrev = get('.hotelVis .inner .btn .prev');
let $H_visPlay = get('.hotelVis .inner .btn .play');
let $H_visPause = get('.hotelVis .inner .btn .pause');
let $H_visBox = getAll('.hotelVis .bgibox');
let H_cnt = 0;
let H_old = 0;
let H_timer = null;
let H_isPlay = true;

// vis popup
let $H_where = get('.hotelVis .inner .search .where .start')
let $H_wherePopBox = get('.hotelVis .inner .search .popWhereBox')
let $H_wherePop = get('.hotelVis .inner .search .popWhere')
let $H_wherePopX = get('.hotelVis .inner .search .popWhere .xi-close')
let $H_wherePopA = getAll('.hotelVis .inner .search .popWhere li')


let $H_visDateS = get('.hotelVis .inner .search .when .start_date')
let $H_visDateSBox = get('.hotelVis .inner .search .popDateBox')
let $H_visDateSBox1 = get('.hotelVis .inner .search .popDateBox .popDateBox1')
let $H_visDateSBox1X = get('.hotelVis .inner .search .popDateBox .xi-close')

let $H_visDateR = get('.hotelVis .inner .search .when .end_date')
let $H_visDateRBox = get('.hotelVis .inner .search .popDateBoxR')
let $H_visDateBox1R = get('.hotelVis .inner .search .popDateBoxR .popDateBox1')
let $H_visDateBox1XR = get('.hotelVis .inner .search .popDateBoxR .xi-close')

let $H_visPer = get('.hotelVis .inner .search .when .pers')
let $H_visPerPopBox = get('.hotelVis .inner .search .popPerBox')
let $H_visPerPop = get('.hotelVis .inner .search .popPer')
let $H_visPerPopX = get('.hotelVis .inner .search .popPer .xi-close')

let $H_visPerP = getAll('.hotelVis .inner .search .popPer ul li strong')
let $H_visPerPlus = getAll('.hotelVis .inner .search .popPer ul li .plus')
let $H_visPerMinus = getAll('.hotelVis .inner .search .popPer ul li .min')

// cal
let H_nowMonth = new Date();
let H_today = new Date();
H_today.setHours(0, 0, 0, 0);
let $H_prevBtn = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .prev')
let $H_nextBtn = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .next')
let $H_prevBtnR = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .prev')
let $H_nextBtnR = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .next')
let $H_prevBtnO = get('.hotelVis .inner .search .popDateBoxO .popDate .popDateS .prev')
let $H_nextBtnO = get('.hotelVis .inner .search .popDateBoxO .popDate .popDateE .next')
let H_startDate;
let H_returnDate;
let H_selectDate;


// con
let $H_hotelBox = get('.hotelCon .hotel .hotelbox');
let $H_hotelBtns = getAll('.hotelCon .hotel .inner .dot li');
let $H_hotelairUls = getAll('.hotelCon .hotel .inner .hotel_recomend-box');

// recomend
let $H_recoJMap = getAll('.hotelCon .jeju .inner .jeju_hotel .img .maps img');
let $H_recoSMap = getAll('.hotelCon .jeju .inner .seogwipo_hotel .img .maps img');
let $H_recoJHotels = getAll('.hotelCon .jeju .inner .jeju_hotel .hotel_recomend-box li')
let $H_recoSHotels = getAll('.hotelCon .jeju .inner .seogwipo_hotel .hotel_recomend-box li')
let $H_recoJHotelsBox = get('.hotelCon .jeju .inner .jeju_hotel .jeju_box')
let $H_recoSHotelsBox = get('.hotelCon .jeju .inner .seogwipo_hotel .seogwipo_box')
let $H_recoJHotelsDot = getAll('.hotelCon .jeju .inner .jeju_hotel .dot i')
let $H_recoSHotelsDot = getAll('.hotelCon .jeju .inner .seogwipo_hotel .dot i')


// visual
// set
$H_visBox.forEach(element => {
    element.style.zIndex = '-10';
    element.style.left = '100%';
    $H_visBox[0].style.zIndex = '1';
    $H_visBox[0].style.left = '0';
})
// banner
const H_banner = (start, end) => {
    $H_visBox[H_old].style.left = start;
    $H_visBox[H_old].style.zIndex = '-10';
    $H_visBox[H_cnt].style.left = end;
    $H_visBox[H_cnt].style.zIndex = '1';
    H_old = H_cnt;
}
// interval
const H_interval = () => {
    $H_visBox.forEach(element => {
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    H_cnt++;
    if (H_cnt > $H_visBox.length - 1) {
        H_cnt = 0;
    };
    $H_visBox[H_cnt].style.left = '0%';
    $H_visBox[H_cnt].style.zIndex = '1';
    H_banner('-100%', '0%');
}
H_timer = setInterval(H_interval, 3000);

// pause
$H_visPause.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $H_visPlay.style.display = 'block';
    clearInterval(H_timer);
    H_isPlay = !H_isPlay;
})
// play
$H_visPlay.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $H_visPause.style.display = 'block';
    H_timer = setInterval(H_interval, 3000);
    H_isPlay = !H_isPlay;
})

// next
$H_visNext.addEventListener('click', e => {
    $H_visBox.forEach(element => {
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    $H_visBox[H_cnt].style.left = '0%';
    $H_visBox[H_cnt].style.zIndex = 1;
    H_cnt++;
    if (H_cnt > $H_visBox.length - 1) {
        H_cnt = 0;
    };
    H_banner('-100%', '0%');
    if (H_isPlay) {
        clearInterval(H_timer);
        H_timer = setInterval(H_interval, 3000);
    }
})
// prev
$H_visPrev.addEventListener('click', e => {
    $H_visBox.forEach(element => {
        element.style.left = '-100%';
        element.style.zIndex = '-10';
    })
    $H_visBox[H_cnt].style.left = '0%';
    $H_visBox[H_cnt].style.zIndex = '1';
    H_cnt--;
    if (H_cnt < 0) {
        H_cnt = $H_visBox.length - 1;
    };
    H_banner('100%', '0%');
    if (H_isPlay) {
        clearInterval(H_timer);
        H_timer = setInterval(H_interval, 3000);
    }
})

// close
function H_whereClose(){
        $H_wherePop.style.top = '-470px';
        $H_wherePop.style.boxShadow = 'none';
        setTimeout(() => {
            $H_wherePopBox.style.zIndex = '-1';
            $H_wherePopBox.style.height = '0px';
        }, 300)
}
function H_visPerClose() {
    $H_visPerPop.style.top = '-300px';
    $H_visPerPop.style.boxShadow = 'none';
    setTimeout(() => {
        $H_visPerPopBox.style.zIndex = '-1';
    }, 300)
}
function H_visDateSClose() {
    $H_visDateSBox1.style.top = '-480px';
    $H_visDateSBox1.style.boxShadow = 'none';
    setTimeout(() => {
        $H_visDateSBox.style.zIndex = '-1';
        $H_visDateSBox.style.height = '0px';
    }, 300)
}
function H_visDateRClose() {
    $H_visDateBox1R.style.top = '-480px';
    $H_visDateBox1R.style.boxShadow = 'none';
    setTimeout(() => {
        $H_visDateRBox.style.zIndex = '-1';
        $H_visDateRBox.style.height = '0px';
    }, 300)
}
// popup
// where
$H_where.addEventListener('click', e => {
    $H_wherePopBox.style.zIndex = '2';
    $H_wherePopBox.style.height = '480px';
    $H_wherePop.style.top = 0;
    $H_wherePop.style.boxShadow = '0px 0px 10px';
    //
    H_visPerClose()
    H_visDateSClose()
    H_visDateRClose()
})
$H_wherePopX.addEventListener('click', e => {
    H_whereClose();
})
$H_wherePopA.forEach(item => {
    item.addEventListener('click', e => {
        $H_wherePop.style.top = '-470px';
        $H_wherePop.style.boxShadow = 'none';
        setTimeout(() => {
            $H_wherePopBox.style.zIndex = '-1';
            $H_wherePopBox.style.height = '0px';
        }, 300)
        let sel = e.currentTarget.getAttribute("value");
        $H_where.textContent = sel;
        $H_where.style.color = 'black';
    })
})


// date
$H_visDateS.addEventListener('click', e => {
    $H_visDateSBox.style.zIndex = '2';
    $H_visDateSBox.style.height = '490px';
    $H_visDateSBox1.style.top = 0;
    $H_visDateSBox1.style.boxShadow = '0px 0px 10px';
    H_calendar();
    // 
    H_whereClose()
    H_visPerClose()
    H_visDateRClose()
})
$H_visDateSBox1X.addEventListener('click', e => {
    H_visDateSClose()
})

$H_visDateR.addEventListener('click', e => {
    $H_visDateRBox.style.zIndex = '2';
    $H_visDateRBox.style.height = '490px';
    $H_visDateBox1R.style.top = 0;
    $H_visDateBox1R.style.boxShadow = '0px 0px 10px';
    H_calendarR();
    // 
    H_whereClose()
    H_visPerClose()
    H_visDateSClose()
})
$H_visDateBox1XR.addEventListener('click', e => {
    H_visDateRClose()
})

// personnel
$H_visPer.addEventListener('click', e => {
    $H_visPerPopBox.style.zIndex = '1';
    $H_visPerPop.style.top = 0;
    $H_visPerPop.style.boxShadow = '0px 0px 10px';
    // 
    H_whereClose();
    H_visDateSClose();
    H_visDateRClose();
})
$H_visPerPopX.addEventListener('click', e => {
    H_visPerClose()
})

$H_visPerPlus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.previousElementSibling;
        num.textContent = Number(num.innerHTML) + 1;

        if (Number($H_visPerP[2].innerHTML) === 0) {
            $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명`
            $H_visPer.style.color='black'
        } else {
            $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명 | 유아 ${$H_visPerP[2].innerHTML}명`
            $H_visPer.style.color='black'
        }
    })
})

$H_visPerMinus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.nextElementSibling;
        num.textContent = Number(num.innerHTML) - 1;
        if (Number(num.innerHTML) - 1 < 0) num.textContent = 0;
        if (Number($H_visPerP[0].innerHTML) < 1) $H_visPerP[0].innerHTML = 1;
        if (Number($H_visPerP[1].innerHTML) < 1) $H_visPerP[1].innerHTML = 1;
        if (Number($H_visPerP[2].innerHTML) === 0) {
            $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명`
            $H_visPer.style.color='black'
        } else {
            $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명 | 유아 ${$H_visPerP[2].innerHTML}명`
            $H_visPer.style.color='black'
        }
    })
})

// hotel recomend

$H_hotelBtns.forEach((ele, idx) => {
    ele.addEventListener('click', e => {
        if (idx === 1) {
            $H_hotelBox.style.transform = 'translateX(-1200px)';
            $H_hotelBtns.forEach(ele2 => {
                ele2.classList.remove('on');
            });
            ele.classList.add('on');
        } else if(idx === 2) {
            $H_hotelBox.style.transform = 'translateX(-2400px)';
            $H_hotelBtns.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        } else {
            $H_hotelBox.style.transform = 'translateX(0px)';
            $H_hotelBtns.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        }
    });
});

// cal
// date comparison
function H_dateCom(day1, day2) {
    if (day1 === day2) {
        alert('출발일과 리턴일이 같습니다')
    } else if (day1 > day2) {
        console.log(H_startDate);
        console.log(H_returnDate);
        alert('출발일이 리턴일보다 늦습니다')
    }
}

// claendar
function H_calendar() {
    let firstDateS = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth(), 1);
    let lastDateS = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS>tbody');
    let $yearS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .year')
    let $monthS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .month')

    let $tbody_CalendarE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE>tbody');
    let $yearE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .year')
    let $monthE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .month')

    $yearS.innerHTML = H_nowMonth.getFullYear();
    $monthS.innerHTML = H_nowMonth.getMonth() + 1;
    $yearE.innerHTML = H_nowMonth.getFullYear();
    $monthE.innerHTML = H_nowMonth.getMonth() + 2;

    while ($tbody_CalendarS.rows.length > 0) {
        $tbody_CalendarS.deleteRow($tbody_CalendarS.rows.length - 1);
    }
    while ($tbody_CalendarE.rows.length > 0) {
        $tbody_CalendarE.deleteRow($tbody_CalendarE.rows.length - 1);
    }
    let nowRowS = $tbody_CalendarS.insertRow();
    let nowRowE = $tbody_CalendarE.insertRow();

    for (let i = 0; i < firstDateS.getDay(); i++) {
        let nowColumn = nowRowS.insertCell();
    }
    for (let j = 0; j < firstDateE.getDay(); j++) {
        let nowColumn = nowRowE.insertCell();
    }

    for (let nowDay = firstDateS; nowDay <= lastDateS; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRowS.insertCell();

        let newDIV = document.createElement('p');
        newDIV.innerHTML = nowDay.getDate();
        nowColumn.appendChild(newDIV);


        if (nowDay.getDay() == 0) {
            nowColumn.style.color = 'red';
        }
        if (nowDay.getDay() == 6) {
            nowColumn.style.color = 'blue';
            nowRowS = $tbody_CalendarS.insertRow();
        }
        if (nowDay < H_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == H_today.getFullYear() && nowDay.getMonth() == H_today.getMonth() && nowDay.getDate() == H_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                H_select(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                H_select(e.currentTarget, 'popDateS');
            })
        }
    }
    for (let nowDay = firstDateE; nowDay <= lastDateE; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRowE.insertCell();

        let newDIV = document.createElement('p');
        newDIV.innerHTML = nowDay.getDate();
        nowColumn.appendChild(newDIV);
        if (nowDay.getDay() == 0) {
            nowColumn.style.color = 'red';
        }
        if (nowDay.getDay() == 6) {
            nowColumn.style.color = 'blue';
            nowRowE = $tbody_CalendarE.insertRow();
        }
        if (nowDay < H_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == H_today.getFullYear() && nowDay.getMonth() == H_today.getMonth() && nowDay.getDate() == H_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                H_select(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                H_select(e.currentTarget, 'popDateE');
            })
        }
    }
}

function H_select(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = H_nowMonth.getFullYear();
    const selectedMonth = H_nowMonth.getMonth();
    const selectedDay = parseInt(day.innerHTML);


    const selectedDateS = new Date(selectedYear, selectedMonth, selectedDay);
    const selectedDateE = new Date(selectedYear, selectedMonth + 1, selectedDay);

    if (calendarType === 'popDateS') {
        let date = new Date(selectedDateS);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        H_startDate = dateForm;
        $H_visDateS.style.color = 'black';
        $H_visDateS.textContent = dateForm;
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        H_startDate = dateForm;
        $H_visDateS.style.color = 'black';
        $H_visDateS.textContent = dateForm;
    }
}

$H_prevBtn.addEventListener('click', e => {
    H_nowMonth = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() - 1, H_nowMonth.getDate());
    H_calendar();
})

$H_nextBtn.addEventListener('click', e => {
    H_nowMonth = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, H_nowMonth.getDate());
    H_calendar();
})

// calendarR
function H_calendarR() {
    let firstDateS = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth(), 1);
    let lastDateS = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS>tbody');
    let $yearS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .year')
    let $monthS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .month')

    let $tbody_CalendarE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE>tbody');
    let $yearE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .year')
    let $monthE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .month')

    $yearS.innerHTML = H_nowMonth.getFullYear();
    $monthS.innerHTML = H_nowMonth.getMonth() + 1;
    $yearE.innerHTML = H_nowMonth.getFullYear();
    $monthE.innerHTML = H_nowMonth.getMonth() + 2;

    while ($tbody_CalendarS.rows.length > 0) {
        $tbody_CalendarS.deleteRow($tbody_CalendarS.rows.length - 1);
    }
    while ($tbody_CalendarE.rows.length > 0) {
        $tbody_CalendarE.deleteRow($tbody_CalendarE.rows.length - 1);
    }
    let nowRowS = $tbody_CalendarS.insertRow();
    let nowRowE = $tbody_CalendarE.insertRow();

    for (let i = 0; i < firstDateS.getDay(); i++) {
        let nowColumn = nowRowS.insertCell();
    }
    for (let j = 0; j < firstDateE.getDay(); j++) {
        let nowColumn = nowRowE.insertCell();
    }

    for (let nowDay = firstDateS; nowDay <= lastDateS; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRowS.insertCell();

        let newDIV = document.createElement('p');
        newDIV.innerHTML = nowDay.getDate();
        nowColumn.appendChild(newDIV);


        if (nowDay.getDay() == 0) {
            nowColumn.style.color = 'red';
        }
        if (nowDay.getDay() == 6) {
            nowColumn.style.color = 'blue';
            nowRowS = $tbody_CalendarS.insertRow();
        }
        if (nowDay < H_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == H_today.getFullYear() && nowDay.getMonth() == H_today.getMonth() && nowDay.getDate() == H_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                H_selectR(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                H_selectR(e.currentTarget, 'popDateS');
            })
        }
    }
    for (let nowDay = firstDateE; nowDay <= lastDateE; nowDay.setDate(nowDay.getDate() + 1)) {
        let nowColumn = nowRowE.insertCell();

        let newDIV = document.createElement('p');
        newDIV.innerHTML = nowDay.getDate();
        nowColumn.appendChild(newDIV);
        if (nowDay.getDay() == 0) {
            nowColumn.style.color = 'red';
        }
        if (nowDay.getDay() == 6) {
            nowColumn.style.color = 'blue';
            nowRowE = $tbody_CalendarE.insertRow();
        }
        if (nowDay < H_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == H_today.getFullYear() && nowDay.getMonth() == H_today.getMonth() && nowDay.getDate() == H_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                H_selectR(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                H_selectR(e.currentTarget, 'popDateE');
            })
        }
    }
}

function H_selectR(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = H_nowMonth.getFullYear();
    const selectedMonth = H_nowMonth.getMonth();
    const selectedDay = parseInt(day.innerHTML);


    const selectedDateS = new Date(selectedYear, selectedMonth, selectedDay);
    const selectedDateE = new Date(selectedYear, selectedMonth + 1, selectedDay);

    if (calendarType === 'popDateS') {
        let date = new Date(selectedDateS);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        H_returnDate = dateForm;
        $H_visDateR.style.color = 'black';
        $H_visDateR.textContent = dateForm;
        H_dateCom(H_startDate, H_returnDate);
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        H_returnDate = dateForm;
        $H_visDateR.style.color = 'black';
        $H_visDateR.textContent = dateForm;
        H_dateCom(H_startDate, H_returnDate);
    }
}

$H_prevBtnR.addEventListener('click', e => {
    H_nowMonth = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() - 1, H_nowMonth.getDate());
    H_calendarR();
})

$H_nextBtnR.addEventListener('click', e => {
    H_nowMonth = new Date(H_nowMonth.getFullYear(), H_nowMonth.getMonth() + 1, H_nowMonth.getDate());
    H_calendarR();
})


// recomend
$H_recoJHotels.forEach((item, idx)=>{
    item.addEventListener('mouseover',e=>{
        $H_recoJMap.forEach(element => {
            element.style.display = 'none'
        });
        if(idx===5) {
            $H_recoJMap[1].style.display = 'block';
        } else if(idx===6){
            $H_recoJMap[2].style.display = 'block';
        } else if(idx===7){
            $H_recoJMap[4].style.display = 'block';
        } else if(idx===8){
            $H_recoJMap[5].style.display = 'block';
        } else {
            $H_recoJMap[idx].style.display = 'block';
        }
    });
})

$H_recoSHotels.forEach((item, idx)=>{
    item.addEventListener('mouseover',e=>{
        $H_recoSMap.forEach(element => {
            element.style.display = 'none'
        });
        if(idx===7) {
            $H_recoSMap[2].style.display = 'block';
        } else if(idx===8){
            $H_recoSMap[3].style.display = 'block';
        } else {
            $H_recoSMap[idx].style.display = 'block';
        }
    });
})

// dot
$H_recoJHotelsDot.forEach((ele, idx)=>{
    ele.addEventListener('click', e=>{
        if (idx === 1) {
            $H_recoJHotelsBox.style.transform = 'translateX(-690px)';
            $H_recoJHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            });
            ele.classList.add('on');
        } else if(idx === 2) {
            $H_recoJHotelsBox.style.transform = 'translateX(-1380px)';
            $H_recoJHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        } else if(idx === 3) {
            $H_recoJHotelsBox.style.transform = 'translateX(-2760px)';
            $H_recoJHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        } else {
            $H_recoJHotelsBox.style.transform = 'translateX(0px)';
            $H_recoJHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        }
    })
})
$H_recoSHotelsDot.forEach((ele, idx)=>{
    ele.addEventListener('click', e=>{
        if (idx === 1) {
            $H_recoSHotelsBox.style.transform = 'translateX(-690px)';
            $H_recoSHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            });
            ele.classList.add('on');
        } else if(idx === 2) {
            $H_recoSHotelsBox.style.transform = 'translateX(-1380px)';
            $H_recoSHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        } else if(idx === 3) {
            $H_recoSHotelsBox.style.transform = 'translateX(-2760px)';
            $H_recoSHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        } else {
            $H_recoSHotelsBox.style.transform = 'translateX(0px)';
            $H_recoSHotelsDot.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        }
    })
})