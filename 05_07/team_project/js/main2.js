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
let cnt = 0;
let old = 0;
let timer = null;
let isPlay = true;

// vis popup
let $H_where = get('.hotelVis .inner .search .where .start')
// let $visStaR = get('.airportVis .inner .search .round .where .start')
let $H_wherePopBox = get('.hotelVis .inner .search .popWhereBox')
// let $visStaRPopBox = get('.airportVis .inner .search .round .popStaBox')
let $H_wherePop = get('.hotelVis .inner .search .popWhere')
// let $visStaRPop = get('.airportVis .inner .search .round .popSta')
let $H_wherePopX = get('.hotelVis .inner .search .popWhere .xi-close')
// let $visStaRPopX = get('.airportVis .inner .search .round .popSta .xi-close')
let $H_wherePopA = getAll('.hotelVis .inner .search .popWhere li')
// let $visStaRPopA = getAll('.airportVis .inner .search .round .popSta li')


let $H_visDateS = get('.hotelVis .inner .search .when .start_date')
// let $visDateRS = get('.airportVis .inner .search .round .when .start_date')
let $H_visDateSBox = get('.hotelVis .inner .search .popDateBox')
// let $visDateRSBox = get('.airportVis .inner .search .round .popDateBox')
let $H_visDateSBox1 = get('.hotelVis .inner .search .popDateBox .popDateBox1')
// let $visDateRSBox1 = get('.airportVis .inner .search .round .popDateBox .popDateBox1')
let $H_visDateSBox1X = get('.hotelVis .inner .search .popDateBox .xi-close')
// let $visDateRSBox1X = get('.airportVis .inner .search .round .popDateBox .xi-close')

let $H_visDateR = get('.hotelVis .inner .search .when .end_date')
// let $visDateRR = get('.airportVis .inner .search .round .when .end_date')
let $H_visDateRBox = get('.hotelVis .inner .search .popDateBoxR')
// let $visDateRSBoxR = get('.airportVis .inner .search .round .popDateBoxR')
let $H_visDateBox1R = get('.hotelVis .inner .search .popDateBoxR .popDateBox1')
// let $visDateRSBox1R = get('.airportVis .inner .search .round .popDateBoxR .popDateBox1')
let $H_visDateBox1XR = get('.hotelVis .inner .search .popDateBoxR .xi-close')
// let $visDateRSBox1XR = get('.airportVis .inner .search .round .popDateBoxR .xi-close')

// cal
let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);
let $H_prevBtn = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .prev')
// let $prevBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateS .prev')
let $H_nextBtn = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .next')
// let $nextBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateE .next')
let $H_prevBtnR = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .prev')
// let $prevBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS .prev')
let $H_nextBtnR = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .next')
// let $nextBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE .next')
let $H_prevBtnO = get('.hotelVis .inner .search .popDateBoxO .popDate .popDateS .prev')
// let $prevBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS .prev')
let $H_nextBtnO = get('.hotelVis .inner .search .popDateBoxO .popDate .popDateE .next')
// let $nextBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE .next')
let startDate;
let returnDate;
let selectDate;


// con
let $H_hotelBox = get('.hotelCon .hotel .hotelbox');
// let $airBox = get('.hotelCon .air .airbox');
let $H_hotelBtns = getAll('.hotelCon .hotel .inner .dot li');
// let $airBtns = getAll('.hotelCon .air .inner .dot li');
let $H_hotelairUls = getAll('.hotelCon .hotel .inner .hotel_recomend-box');
// let $airUls = getAll('.hotelCon .air .inner .air_recomend-box');


// close
function H_whereClose(){
        $H_wherePop.style.top = '-470px';
        $H_wherePop.style.boxShadow = 'none';
        setTimeout(() => {
            $H_wherePopBox.style.zIndex = '-1';
            $H_wherePopBox.style.height = '0px';
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
    // visDesRClose();
    // visPerRClose();
    // visDateRSClose();
    // visDateRRClose();
})
$H_wherePopX.addEventListener('click', e => {
    H_whereClose();
    // visStaRClose();
})
$H_wherePopA.forEach(item => {
    item.addEventListener('click', e => {
        $H_wherePop.style.top = '-470px';
        $H_wherePop.style.boxShadow = 'none';
        setTimeout(() => {
            $H_wherePopBox.style.zIndex = '-1';
            $H_wherePopBox.style.height = '0px';
        }, 300)
        let sel = e.currentTarget.innerHTML;
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
    calendar();
    // 
    // visStaRClose();
    // visDesRClose();
    // visPerRClose();
    // visDateRRClose();
})
$H_visDateSBox1X.addEventListener('click', e => {
    // visDateRSClose();

})

$H_visDateR.addEventListener('click', e => {
    $H_visDateRBox.style.zIndex = '2';
    $H_visDateRBox.style.height = '490px';
    $H_visDateBox1R.style.top = 0;
    $H_visDateBox1R.style.boxShadow = '0px 0px 10px';
    calendarR();
    // 
    // visStaRClose();
    // visDesRClose();
    // visPerRClose();
    // visDateRSClose();
})
$H_visDateBox1XR.addEventListener('click', e => {
    // visDateRRClose();
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
function dateCom(day1, day2) {
    if (day1 === day2) {
        alert('출발일과 리턴일이 같습니다')
    } else if (day1 > day2) {
        console.log(startDate);
        console.log(returnDate);
        alert('출발일이 리턴일보다 늦습니다')
    }
}

// claendar
function calendar() {
    let firstDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS>tbody');
    let $yearS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .year')
    let $monthS = get('.hotelVis .inner .search .popDateBox .popDate .popDateS .month')

    let $tbody_CalendarE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE>tbody');
    let $yearE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .year')
    let $monthE = get('.hotelVis .inner .search .popDateBox .popDate .popDateE .month')

    $yearS.innerHTML = nowMonth.getFullYear();
    $monthS.innerHTML = nowMonth.getMonth() + 1;
    $yearE.innerHTML = nowMonth.getFullYear();
    $monthE.innerHTML = nowMonth.getMonth() + 2;

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
        if (nowDay < today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                select(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                select(e.currentTarget, 'popDateS');
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
        if (nowDay < today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                select(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                select(e.currentTarget, 'popDateE');
            })
        }
    }
}

function select(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = nowMonth.getFullYear();
    const selectedMonth = nowMonth.getMonth();
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
        startDate = dateForm;
        $H_visDateS.style.color = 'black';
        $H_visDateS.textContent = dateForm;
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        startDate = dateForm;
        $H_visDateS.style.color = 'black';
        $H_visDateS.textContent = dateForm;
    }
}

$H_prevBtn.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    calendar();
})

$H_nextBtn.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    calendar();
})

// calendarR
function calendarR() {
    let firstDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS>tbody');
    let $yearS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .year')
    let $monthS = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateS .month')

    let $tbody_CalendarE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE>tbody');
    let $yearE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .year')
    let $monthE = get('.hotelVis .inner .search .popDateBoxR .popDate .popDateE .month')

    $yearS.innerHTML = nowMonth.getFullYear();
    $monthS.innerHTML = nowMonth.getMonth() + 1;
    $yearE.innerHTML = nowMonth.getFullYear();
    $monthE.innerHTML = nowMonth.getMonth() + 2;

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
        if (nowDay < today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                selectR(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                selectR(e.currentTarget, 'popDateS');
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
        if (nowDay < today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                selectR(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                selectR(e.currentTarget, 'popDateE');
            })
        }
    }
}

function selectR(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = nowMonth.getFullYear();
    const selectedMonth = nowMonth.getMonth();
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
        returnDate = dateForm;
        $H_visDateR.style.color = 'black';
        $H_visDateR.textContent = dateForm;
        dateCom(startDate, returnDate);
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        returnDate = dateForm;
        $H_visDateR.style.color = 'black';
        $H_visDateR.textContent = dateForm;
        dateCom(startDate, returnDate);
    }
}

$H_prevBtnR.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    calendarR();
})

$H_nextBtnR.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    calendarR();
})