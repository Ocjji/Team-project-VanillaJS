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
let $R_visNext = get('.rentVis .inner .btn .next');
let $R_visPrev = get('.rentVis .inner .btn .prev');
let $R_visPlay = get('.rentVis .inner .btn .play');
let $R_visPause = get('.rentVis .inner .btn .pause');
let $R_visBox = getAll('.rentVis .bgibox');
let R_cnt = 0;
let R_old = 0;
let R_timer = null;
let R_isPlay = true;

// vis popup
let $R_visDateS = get('.rentVis .inner .search .when .start_date')
// let $visDateRS = get('.airportVis .inner .search .round .when .start_date')
let $R_visDateSBox = get('.rentVis .inner .search .popDateBox')
// let $visDateRSBox = get('.airportVis .inner .search .round .popDateBox')
let $R_visDateSBox1 = get('.rentVis .inner .search .popDateBox .popDateBox1')
// let $visDateRSBox1 = get('.airportVis .inner .search .round .popDateBox .popDateBox1')
let $R_visDateSBox1X = get('.rentVis .inner .search .popDateBox .xi-close')
// let $visDateRSBox1X = get('.airportVis .inner .search .round .popDateBox .xi-close')

let $R_visDateR = get('.rentVis .inner .search .when .end_date')
// let $visDateRR = get('.airportVis .inner .search .round .when .end_date')
let $R_visDateRBox = get('.rentVis .inner .search .popDateBoxR')
// let $visDateRSBoxR = get('.airportVis .inner .search .round .popDateBoxR')
let $R_visDateBox1R = get('.rentVis .inner .search .popDateBoxR .popDateBox1')
// let $visDateRSBox1R = get('.airportVis .inner .search .round .popDateBoxR .popDateBox1')
let $R_visDateBox1XR = get('.rentVis .inner .search .popDateBoxR .xi-close')
// let $visDateRSBox1XR = get('.airportVis .inner .search .round .popDateBoxR .xi-close')

let $R_visPer = get('.rentVis .inner .search .when .pers')
// let $visPerR = get('.airportVis .inner .search .round .when .pers')
let $R_visPerPopBox = get('.rentVis .inner .search .popPerBox')
// let $visPerRPopBox = get('.airportVis .inner .search .round .popPerBox')
let $R_visPerPop = get('.rentVis .inner .search .popPer')
// let $visPerRPop = get('.airportVis .inner .search .round .popPer')
let $R_visPerPopX = get('.rentVis .inner .search .popPer .xi-close')
// let $visPerRPopX = get('.airportVis .inner .search .round .popPer .xi-close')

let $R_visPerP = getAll('.rentVis .inner .search .popPer ul li strong')
// let $visPerRP = getAll('.airportVis .inner .search .round .popPer ul li strong')
let $R_visPerPlus = getAll('.rentVis .inner .search .popPer ul li .plus')
// let $visPerRPlus = getAll('.airportVis .inner .search .round .popPer ul li .plus')
let $R_visPerMinus = getAll('.rentVis .inner .search .popPer ul li .min')
// let $visPerRMinus = getAll('.airportVis .inner .search .round .popPer ul li .min')

let $R_visInsu = get('.rentVis .inner .search .insu')
// let $visStaR = get('.airportVis .inner .search .round .insu .start')
let $R_visInsuPopBox = get('.rentVis .inner .search .popInsuBox')
// let $visStaRPopBox = get('.airportVis .inner .search .round .popStaBox')
let $R_visInsuPop = get('.rentVis .inner .search .popInsu')
// let $visStaRPop = get('.airportVis .inner .search .round .popSta')
let $R_visInsuPopX = get('.rentVis .inner .search .popInsu .xi-close')
// let $visStaRPopX = get('.airportVis .inner .search .round .popSta .xi-close')
let $R_visInsuPopA = getAll('.rentVis .inner .search .popInsu li')
// let $visStaRPopA = getAll('.airportVis .inner .search .round .popSta li')

let $R_visTimeS = get('.rentVis .inner .search .popDateBox .popDateBox1 .timeS .time_select')
let $R_visTimeE = get('.rentVis .inner .search .popDateBoxR .popDateBox1 .timeE .time_select')

let R_nowMonth = new Date();
let R_today = new Date();
R_today.setHours(0, 0, 0, 0);

let $R_prevBtn = get('.rentVis .inner .search .popDateBox .popDate .popDateS .prev')
// let $prevBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateS .prev')
let $R_nextBtn = get('.rentVis .inner .search .popDateBox .popDate .popDateE .next')
// let $nextBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateE .next')
let $R_prevBtnR = get('.rentVis .inner .search .popDateBoxR .popDate .popDateS .prev')
// let $prevBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS .prev')
let $R_nextBtnR = get('.rentVis .inner .search .popDateBoxR .popDate .popDateE .next')
// let $nextBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE .next')
let $R_prevBtnO = get('.rentVis .inner .search .popDateBoxO .popDate .popDateS .prev')
// let $prevBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS .prev')
let $R_nextBtnO = get('.rentVis .inner .search .popDateBoxO .popDate .popDateE .next')
// let $nextBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE .next')
let $R_startDate;
let $R_returnDate;
let $R_selectDate;

let $R_type = getAll('.rentCon .rent_search .inner .rent_searchbox .rent_type li');
let $R_vehiclesUl = get('.rentCon .rent_search .inner .rent_searchbox .vehicles_list');



let vehicles = [
    {type : 'E', model1 : '아이오닉 1세대', model : 'io1', year : '19년~20년식', fuel : '전기', price1 : 14500, price2 : 15000, price3: 16000},
    {type : 'E', model1 : '쏘울 3세대', model : 'soul3', year : '18년~19년식', fuel : '전기', price1 : 14700, price2 : 15500, price3: 16500},
    {type : 'E', model1 : '코나EV', model : 'kona1', year : '22년~23년식', fuel : '전기', price1 : 15700, price2 : 15900, price3: 16200},
    {type : 'E', model1 : 'SM3', model : 'sm32', year : '17년~18년식', fuel : '전기', price1 : 13400, price2 : 14400, price3: 15700},
    {type : 'E', model1 : '니로 1세대', model : 'niro1', year : '19년~20년식', fuel : '전기', price1 : 14300, price2 : 15400, price3: 16000},

    {type : 'L', model1 : '레이 1세대', model : 'ray11', year : '19년~20년식', fuel : '가솔린', price1 : 4300, price2 : 5400, price3: 6000},
    {type : 'L', model1 : '캐스퍼 액티브', model : 'casperac', year : '22년~23년식', fuel : '가솔린', price1 : 4500, price2 : 5600, price3: 6500},
    {type : 'L', model1 : '캐스퍼', model : 'casper', year : '22년~23년식', fuel : '가솔린', price1 : 4300, price2 : 5500, price3: 6500},
    {type : 'L', model1 : '레이 1세대', model : 'ray12', year : '19년~20년식', fuel : '가솔린', price1 : 5600, price2 : 5800, price3: 6200},
    {type : 'L', model1 : '레이', model : 'ray1', year : '17년~18년식', fuel : '가솔린', price1 : 4300, price2 : 5400, price3: 6000},

    {type : 'S', model1 : 'K3 1세대', model : 'k31', year : '19년~20년식', fuel : '가솔린', price1 : 10200, price2 : 11200, price3: 16000},
    {type : 'S', model1 : 'K3 2세대', model : 'k32', year : '20년~20년식', fuel : '가솔린', price1 : 14300, price2 : 15400, price3: 16200},
    {type : 'S', model1 : 'K3 3세대', model : 'k322', year : '21년~22년식', fuel : '가솔린', price1 : 12200, price2 : 15400, price3: 16300},
    {type : 'S', model1 : '아반떼 CN7', model : 'cn7', year : '22년~23년식', fuel : '가솔린', price1 : 14300, price2 : 15400, price3: 16200},
    {type : 'S', model1 : '아반떼 AD', model : 'ad', year : '17년~18년식', fuel : '가솔린', price1 : 14700, price2 : 14900, price3: 15800},

    {type : 'M', model1 : '소나타', model : 'so1', year : '18년~19년식', fuel : '가솔린', price1 : 15700, price2 : 16200, price3: 16800},
    {type : 'M', model1 : '말리부', model : 'ma', year : '17년~18년식', fuel : '가솔린', price1 : 15700, price2 : 15900, price3: 16800},
    {type : 'M', model1 : 'SM6', model : 'sm6', year : '16년~17년식', fuel : '가솔린', price1 : 16700, price2 : 17000, price3: 17200},
    {type : 'M', model1 : 'SM6', model : 'sm61', year : '18년~19년식', fuel : '가솔린', price1 : 16500, price2 : 17100, price3: 17300},
    {type : 'M', model1 : 'K5', model : 'k5', year : '17년~18년식', fuel : '가솔린', price1 : 15900, price2 : 16500, price3: 16900},

    {type : 'B', model1 : '그랜저 GN7', model : 'gn7', year : '22년~23년식', fuel : '가솔린', price1 : 18900, price2 : 19600, price3: 19900},
    {type : 'B', model1 : '그랜저 IG', model : 'ig2', year : '18년~19년식', fuel : '가솔린', price1 : 17900, price2 : 18500, price3: 19800},
    {type : 'B', model1 : '그랜저 IG', model : 'ig', year : '17년~18년식', fuel : '가솔린', price1 : 18900, price2 : 19100, price3: 19300},
    {type : 'B', model1 : 'SM7', model : 'sm7', year : '17년~18년식', fuel : '가솔린', price1 : 18900, price2 : 19500, price3: 19900},
    {type : 'B', model1 : 'K8', model : 'k8', year : '22년~23년식', fuel : '가솔린', price1 : 19900, price2 : 20000, price3: 20100},

    {type : 'I', model1 : '미니쿠퍼', model : 'mini', year : '17년~18년식', fuel : '디젤', price1 : 22100, price2 : 23000, price3: 25000},
    {type : 'I', model1 : '미니쿠퍼', model : 'mini2', year : '22년~23년식', fuel : '가솔린', price1 : 21900, price2 : 23000, price3: 23200},
    {type : 'I', model1 : '지프 컴패스', model : 'jeep', year : '20년~21년식', fuel : '디젤', price1 : 23900, price2 : 24200, price3: 25300},
    {type : 'I', model1 : '지프 레니게이드', model : 'jeep2', year : '22년~23년식', fuel : '디젤', price1 : 23900, price2 : 24200, price3: 25100},
    {type : 'I', model1 : '푸조 2008', model : 'pu', year : '19년~20년식', fuel : '가솔린', price1 : 21900, price2 : 22000, price3: 23000},

    {type : 'R', model1 : '카니발', model : 'ca', year : '22년~23년식', fuel : '가솔린', price1 : 22900, price2 : 23000, price3: 24000},
    {type : 'R', model1 : '카니발', model : 'ca2', year : '22년~23년식', fuel : '가솔린', price1 : 22900, price2 : 24000, price3: 26000},
    {type : 'R', model1 : '스타렉스', model : 'sta', year : '21년~22년식', fuel : '디젤', price1 : 23900, price2 : 24000, price3: 25500},
    {type : 'R', model1 : '그랜드 스타렉스', model : 'sta2', year : '17년~19년식', fuel : '디젤', price1 : 22000, price2 : 23300, price3: 24800},
    {type : 'R', model1 : '카니발', model : 'ca3', year : '19년~20년식', fuel : '디젤', price1 : 23200, price2 : 24400, price3: 25700},

    {type : 'V', model1 : '투싼', model : 'tu', year : '19년~20년식', fuel : '디젤', price1 : 24200, price2 : 25500, price3: 25900},
    {type : 'V', model1 : '스포티지', model : 'spo2', year : '19년~20년식', fuel : '디젤', price1 : 25200, price2 : 26000, price3: 26500},
    {type : 'V', model1 : '스포티지', model : 'spo', year : '22년~23년식', fuel : '디젤', price1 : 24200, price2 : 24800, price3: 25000},
    {type : 'V', model1 : '토레스', model : 'tor', year : '20년~21년식', fuel : '가솔린', price1 : 25000, price2 : 25800, price3: 26700},
    {type : 'V', model1 : '투싼', model : 'tu1', year : '19년~20년식', fuel : 'LPI', price1 : 24000, price2 : 25400, price3: 25800}
]

// visual
// set
$R_visBox.forEach(element => {
    element.style.zIndex = '-10';
    element.style.left = '100%';
    $R_visBox[0].style.zIndex = '1';
    $R_visBox[0].style.left = '0';
})
// banner
const R_banner = (start, end) => {
    $R_visBox[R_old].style.left = start;
    $R_visBox[R_old].style.zIndex = '-10';
    $R_visBox[R_cnt].style.left = end;
    $R_visBox[R_cnt].style.zIndex = '1';
    R_old = R_cnt;
}
// interval
const R_interval = () => {
    $R_visBox.forEach(element => {
        // element.style.transitionDuration='0.4s';
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    R_cnt++;
    if (R_cnt > $R_visBox.length - 1) {
        R_cnt = 0;
    };
    $R_visBox[R_cnt].style.left = '0%';
    $R_visBox[R_cnt].style.zIndex = '1';
    R_banner('-100%', '0%');
}
R_timer = setInterval(R_interval, 3000);

// pause
$R_visPause.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $R_visPlay.style.display = 'block';
    clearInterval(R_timer);
    R_isPlay = !R_isPlay;
})
// play
$R_visPlay.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $R_visPause.style.display = 'block';
    R_timer = setInterval(R_interval, 3000);
    R_isPlay = !R_isPlay;
})

// next
$R_visNext.addEventListener('click', e => {
    $R_visBox.forEach(element => {
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    $R_visBox[R_cnt].style.left = '0%';
    $R_visBox[R_cnt].style.zIndex = 1;
    R_cnt++;
    if (R_cnt > $R_visBox.length - 1) {
        R_cnt = 0;
    };
    R_banner('-100%', '0%');
    if (R_isPlay) {
        clearInterval(R_timer);
        R_timer = setInterval(R_interval, 3000);
    }
})
// prev
$R_visPrev.addEventListener('click', e => {
    $R_visBox.forEach(element => {
        element.style.left = '-100%';
        element.style.zIndex = '-10';
    })
    $R_visBox[R_cnt].style.left = '0%';
    $R_visBox[R_cnt].style.zIndex = '1';
    R_cnt--;
    if (R_cnt < 0) {
        R_cnt = $R_visBox.length - 1;
    };
    R_banner('100%', '0%');
    if (R_isPlay) {
        clearInterval(R_timer);
        R_timer = setInterval(R_interval, 3000);
    }
})

vehicles.forEach(ele => {
    let li = document.createElement('li');
    li.innerHTML =
        `
        <div class="pic_model">
            <img src="images/rent/content3/${ele.type}_${ele.model}.png" alt="">
            <span>${ele.year} [${ele.fuel}]</span>
            <strong>${ele.model1}</strong>
        </div>
        <div class="price">
        <a href="">
            <p><i class="xi-shield-checked-o"></i>일반자차 <em>(만 21세 이상)</em><span>${ele.price1.toLocaleString()}원 부터</span></p></a>
            <a href=""><p><i class="xi-shield-checked-o"></i>완전자차 <em>(만 23세 이상)</em><span>${ele.price2.toLocaleString()}원 부터</span></p></a>
            <a href=""><p><i class="xi-shield-checked-o"></i>슈퍼자차 <em>(만 26세 이상)</em><span>${ele.price3.toLocaleString()}원 부터</span></p></a>
        </div>
        `;
    $R_vehiclesUl.append(li);
});

$R_type.forEach(item => {
    item.addEventListener('click', e => {
        let selectedType = item.className; 
        let filteredVehicles = vehicles.filter(vehicle => vehicle.type.includes(selectedType));
        $R_vehiclesUl.innerHTML = '';
        filteredVehicles.forEach(ele => {
            let li = document.createElement('li');
            li.innerHTML =
                `
                <div class="pic_model">
                    <img src="images/rent/content3/${ele.type}_${ele.model}.png" alt="">
                    <span>${ele.year} [${ele.fuel}]</span>
                    <strong>${ele.model1}</strong>
                </div>
                <div class="price">
                <a href="">
                    <p><i class="xi-shield-checked-o"></i>일반자차 <em>(만 21세 이상)</em><span>${ele.price1.toLocaleString()}원 부터</span></p></a>
                    <a href=""><p><i class="xi-shield-checked-o"></i>완전자차 <em>(만 23세 이상)</em><span>${ele.price2.toLocaleString()}원 부터</span></p></a>
                    <a href=""><p><i class="xi-shield-checked-o"></i>슈퍼자차 <em>(만 26세 이상)</em><span>${ele.price3.toLocaleString()}원 부터</span></p></a>
                </div>
                `;
            $R_vehiclesUl.append(li);
        });
        $R_type.forEach(element=>{
            element.style.backgroundColor='white';
        })
        item.style.backgroundColor='lightsalmon';
        item.style.borderRadius='10px';
    });
});

function R_dateCom(day1, day2) {
    if (day1 > day2) {
        console.log($R_startDate);
        console.log($R_returnDate);
        alert('출발일이 리턴일보다 늦습니다')
    }
}
// claendar
function R_calendar() {
    let firstDateS = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth(), 1);
    let lastDateS = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.rentVis .inner .search .popDateBox .popDate .popDateS>tbody');
    let $yearS = get('.rentVis .inner .search .popDateBox .popDate .popDateS .year')
    let $monthS = get('.rentVis .inner .search .popDateBox .popDate .popDateS .month')

    let $tbody_CalendarE = get('.rentVis .inner .search .popDateBox .popDate .popDateE>tbody');
    let $yearE = get('.rentVis .inner .search .popDateBox .popDate .popDateE .year')
    let $monthE = get('.rentVis .inner .search .popDateBox .popDate .popDateE .month')

    $yearS.innerHTML = R_nowMonth.getFullYear();
    $monthS.innerHTML = R_nowMonth.getMonth() + 1;
    $yearE.innerHTML = R_nowMonth.getFullYear();
    $monthE.innerHTML = R_nowMonth.getMonth() + 2;

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
        if (nowDay < R_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == R_today.getFullYear() && nowDay.getMonth() == R_today.getMonth() && nowDay.getDate() == R_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                R_select(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                R_select(e.currentTarget, 'popDateS');
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
        if (nowDay < R_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == R_today.getFullYear() && nowDay.getMonth() == R_today.getMonth() && nowDay.getDate() == R_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                R_select(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                R_select(e.currentTarget, 'popDateE');
            })
        }
    }
}

function R_select(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = R_nowMonth.getFullYear();
    const selectedMonth = R_nowMonth.getMonth();
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
        $R_startDate = dateForm;
        $R_visDateS.style.color = 'black';
        $R_visDateS.innerHTML = `${dateForm} <br> ${$R_visTimeS.value}`;
        $R_visTimeS.addEventListener('change', e=>{
            $R_visDateS.innerHTML = `${dateForm} <br> ${$R_visTimeS.value}`;
        })
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        $R_startDate = dateForm;
        $R_visDateS.style.color = 'black';
        $R_visDateS.innerHTML = `${dateForm} <br> ${$R_visTimeS.value}`;
        $R_visTimeS.addEventListener('change', e=>{
            $R_visDateS.innerHTML = `${dateForm} <br> ${$R_visTimeS.value}`;
        })
    }
}

$R_prevBtn.addEventListener('click', e => {
    R_nowMonth = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() - 1, R_nowMonth.getDate());
    R_calendar();
})

$R_nextBtn.addEventListener('click', e => {
    R_nowMonth = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, R_nowMonth.getDate());
    R_calendar();
})

// calendarR
function R_calendarR() {
    let firstDateS = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth(), 1);
    let lastDateS = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.rentVis .inner .search .popDateBoxR .popDate .popDateS>tbody');
    let $yearS = get('.rentVis .inner .search .popDateBoxR .popDate .popDateS .year')
    let $monthS = get('.rentVis .inner .search .popDateBoxR .popDate .popDateS .month')

    let $tbody_CalendarE = get('.rentVis .inner .search .popDateBoxR .popDate .popDateE>tbody');
    let $yearE = get('.rentVis .inner .search .popDateBoxR .popDate .popDateE .year')
    let $monthE = get('.rentVis .inner .search .popDateBoxR .popDate .popDateE .month')

    $yearS.innerHTML = R_nowMonth.getFullYear();
    $monthS.innerHTML = R_nowMonth.getMonth() + 1;
    $yearE.innerHTML = R_nowMonth.getFullYear();
    $monthE.innerHTML = R_nowMonth.getMonth() + 2;

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
        if (nowDay < R_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == R_today.getFullYear() && nowDay.getMonth() == R_today.getMonth() && nowDay.getDate() == R_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                R_selectR(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                R_selectR(e.currentTarget, 'popDateS');
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
        if (nowDay < R_today) {
            newDIV.className = 'pastDay';
        } else if (nowDay.getFullYear() == R_today.getFullYear() && nowDay.getMonth() == R_today.getMonth() && nowDay.getDate() == R_today.getDate()) {
            newDIV.className = "today";
            newDIV.addEventListener('click', e => {
                R_selectR(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                R_selectR(e.currentTarget, 'popDateE');
            })
        }
    }
}

function R_selectR(day, calendarType) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove('choiceDay');
    }
    day.classList.add('choiceDay');


    const selectedYear = R_nowMonth.getFullYear();
    const selectedMonth = R_nowMonth.getMonth();
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
        $R_returnDate = dateForm;
        $R_visDateR.style.color = 'black';
        $R_visDateR.innerHTML = `${dateForm} <br> ${$R_visTimeE.value}`;
        $R_visDateR.addEventListener('change', e=>{
            $R_visDateR.innerHTML = `${dateForm} <br> ${$R_visTimeE.value}`;
        })
        R_dateCom($R_startDate, $R_returnDate);
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        $R_returnDate = dateForm;
        $R_visDateR.style.color = 'black';
        $R_visDateR.innerHTML = `${dateForm} <br> ${$R_visTimeE.value}`;
        $R_visDateR.addEventListener('change', e=>{
            $R_visDateR.innerHTML = `${dateForm} <br> ${$R_visTimeE.value}`;
        })
        R_dateCom($R_startDate, $R_returnDate);
    }
}

$R_prevBtnR.addEventListener('click', e => {
    R_nowMonth = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() - 1, R_nowMonth.getDate());
    R_calendarR();
})

$R_nextBtnR.addEventListener('click', e => {
    R_nowMonth = new Date(R_nowMonth.getFullYear(), R_nowMonth.getMonth() + 1, R_nowMonth.getDate());
    R_calendarR();
})

R_calendar();
R_calendarR();

// popup



// close
function R_visDateSClose(){
    $R_visDateSBox1.style.top = '-540px';
    $R_visDateSBox1.style.boxShadow = 'none';
    setTimeout(() => {
        $R_visDateSBox.style.zIndex = '-1';
        $R_visDateSBox.style.height = '0px';
    }, 300)
}
function R_visDateRClose(){
    $R_visDateBox1R.style.top = '-540px';
    $R_visDateBox1R.style.boxShadow = 'none';
    setTimeout(() => {
        $R_visDateRBox.style.zIndex = '-1';
        $R_visDateRBox.style.height = '0px';
    }, 300)
}

function R_visInsuClose(){
    $R_visInsuPop.style.top = '-470px';
    $R_visInsuPop.style.boxShadow = 'none';
    setTimeout(() => {
        $R_visInsuPopBox.style.zIndex = '-1';
        $R_visInsuPopBox.style.height = '0px';
    }, 300)
}


$R_visDateS.addEventListener('click', e => {
    $R_visDateSBox.style.zIndex = '2';
    $R_visDateSBox.style.height = '550px';
    $R_visDateSBox1.style.top = 0;
    $R_visDateSBox1.style.boxShadow = '0px 0px 10px';
    R_calendar();
    // 
    R_visInsuClose();
    R_visDateRClose();

})
$R_visDateSBox1X.addEventListener('click', e => {
    R_visDateSClose()
})

$R_visDateR.addEventListener('click', e => {
    $R_visDateRBox.style.zIndex = '2';
    $R_visDateRBox.style.height = '550px';
    $R_visDateBox1R.style.top = 0;
    $R_visDateBox1R.style.boxShadow = '0px 0px 10px';
    R_calendarR();
    // 
    R_visDateSClose()
    R_visInsuClose();
})
$R_visDateBox1XR.addEventListener('click', e => {
    R_visDateRClose();
})



$R_visInsu.addEventListener('click', e => {
    $R_visInsuPopBox.style.zIndex = '2';
    $R_visInsuPopBox.style.height = '170px';
    $R_visInsuPop.style.top = 0;
    $R_visInsuPop.style.boxShadow = '0px 0px 10px';
    //
    R_visDateSClose()
    R_visDateRClose()
})
$R_visInsuPopX.addEventListener('click', e => {
    R_visInsuClose();
})
$R_visInsuPopA.forEach(item => {
    item.addEventListener('click', e => {
        $R_visInsuPop.style.top = '-470px';
        $R_visInsuPop.style.boxShadow = 'none';
        setTimeout(() => {
            $R_visInsuPopBox.style.zIndex = '-1';
            $R_visInsuPopBox.style.height = '0px';
        }, 300)
        let sel = e.currentTarget.innerHTML;
        $R_visInsu.textContent = sel;
        $R_visInsu.style.color = 'black';
    })
})