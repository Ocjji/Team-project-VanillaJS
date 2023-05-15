const get = (target) => {
    return document.querySelector(target);
};
const getAll = (target) => {
    return document.querySelectorAll(target);
};

// vis
let $visNext = get('.airportVis .inner .btn .next');
let $visPrev = get('.airportVis .inner .btn .prev');
let $visPlay = get('.airportVis .inner .btn .play');
let $visPause = get('.airportVis .inner .btn .pause');
let $visBox = getAll('.airportVis .bgibox');
let cnt = 0;
let old = 0;
let timer = null;
let isPlay = true;

// search
let $roundBtn = get('.airportVis .inner .search .way .roundBtn')
let $oneBtn = get('.airportVis .inner .search .way .oneBtn')
let $round = get('.airportVis .inner .search .round')
let $one = get('.airportVis .inner .search .one')

// vis popup
// round
let $visStaR = get('.airportVis .inner .search .round .where .start')
let $visStaRPopBox = get('.airportVis .inner .search .round .popStaBox')
let $visStaRPop = get('.airportVis .inner .search .round .popSta')
let $visStaRPopX = get('.airportVis .inner .search .round .popSta .xi-close')
let $visStaRPopA = getAll('.airportVis .inner .search .round .popSta li')

let $visDesR = get('.airportVis .inner .search .round .where .end')
let $visDesRPopBox = get('.airportVis .inner .search .round .popDesBox')
let $visDesRPop = get('.airportVis .inner .search .round .popDes')
let $visDesRPopX = get('.airportVis .inner .search .round .popDes .xi-close')
let $visDesRPopA = getAll('.airportVis .inner .search .round .popDes li')

let $visPerR = get('.airportVis .inner .search .round .when .pers')
let $visPerRPopBox = get('.airportVis .inner .search .round .popPerBox')
let $visPerRPop = get('.airportVis .inner .search .round .popPer')
let $visPerRPopX = get('.airportVis .inner .search .round .popPer .xi-close')

let $visPerRP = getAll('.airportVis .inner .search .round .popPer ul li strong')
let $visPerRPlus = getAll('.airportVis .inner .search .round .popPer ul li .plus')
let $visPerRMinus = getAll('.airportVis .inner .search .round .popPer ul li .min')

let $visDateRS = get('.airportVis .inner .search .round .when .start_date')
let $visDateRSBox = get('.airportVis .inner .search .round .popDateBox')
let $visDateRSBox1 = get('.airportVis .inner .search .round .popDateBox .popDateBox1')
let $visDateRSBox1X = get('.airportVis .inner .search .round .popDateBox .xi-close')

let $visDateRR = get('.airportVis .inner .search .round .when .end_date')
let $visDateRSBoxR = get('.airportVis .inner .search .round .popDateBoxR')
let $visDateRSBox1R = get('.airportVis .inner .search .round .popDateBoxR .popDateBox1')
let $visDateRSBox1XR = get('.airportVis .inner .search .round .popDateBoxR .xi-close')

// one
let $visStaO = get('.airportVis .inner .search .one .where .start')
let $visStaOPopBox = get('.airportVis .inner .search .one .popStaBox')
let $visStaOPop = get('.airportVis .inner .search .one .popSta')
let $visStaOPopX = get('.airportVis .inner .search .one .popSta .xi-close')
let $visStaOPopA = getAll('.airportVis .inner .search .one .popSta li')

let $visDesO = get('.airportVis .inner .search .one .where .end')
let $visDesOPopBox = get('.airportVis .inner .search .one .popDesBox')
let $visDesOPop = get('.airportVis .inner .search .one .popDes')
let $visDesOPopX = get('.airportVis .inner .search .one .popDes .xi-close')
let $visDesOPopA = getAll('.airportVis .inner .search .one .popDes li')

let $visPerO = get('.airportVis .inner .search .one .when .pers')
let $visPerOPopBox = get('.airportVis .inner .search .one .popPerBox')
let $visPerOPop = get('.airportVis .inner .search .one .popPer')
let $visPerOPopX = get('.airportVis .inner .search .one .popPer .xi-close')

let $visPerOP = getAll('.airportVis .inner .search .one .popPer ul li strong')
let $visPerOPlus = getAll('.airportVis .inner .search .one .popPer ul li .plus')
let $visPerOMinus = getAll('.airportVis .inner .search .one .popPer ul li .min')

let $visDateRO = get('.airportVis .inner .search .one .when .start_date')
let $visDateRSBoxO = get('.airportVis .inner .search .one .popDateBoxO')
let $visDateRSBox1O = get('.airportVis .inner .search .one .popDateBoxO .popDateBox1')
let $visDateRSBox1XO = get('.airportVis .inner .search .one .popDateBoxO .xi-close')

// cal
let nowMonth = new Date();
let today = new Date();
today.setHours(0, 0, 0, 0);
let $prevBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateS .prev')
let $nextBtn = get('.airportVis .inner .search .popDateBox .popDate .popDateE .next')
let $prevBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS .prev')
let $nextBtnR = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE .next')
let $prevBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS .prev')
let $nextBtnO = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE .next')
let startDate;
let returnDate;
let selectDate;

// con
let $mdBtns = getAll('.airportCon .md .inner .md_recomend li');
let $mdUls = getAll('.airportCon .md .inner .md_recomend-box');
let $airBox = get('.airportCon .air .airbox');
let $airBtns = getAll('.airportCon .air .inner .dot li');
let $airUls = getAll('.airportCon .air .inner .air_recomend-box');

// visual
// set
$visBox.forEach(element => {
    element.style.zIndex = '-10';
    element.style.left = '100%';
    $visBox[0].style.zIndex = '1';
    $visBox[0].style.left = '0';
})
// banner
const banner = (start, end) => {
    $visBox[old].style.left = start;
    $visBox[old].style.zIndex = '-10';
    $visBox[cnt].style.left = end;
    $visBox[cnt].style.zIndex = '1';
    old = cnt;
}
// interval
const interval = () => {
    $visBox.forEach(element => {
        // element.style.transitionDuration='0.4s';
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    cnt++;
    if (cnt > $visBox.length - 1) {
        cnt = 0;
    };
    $visBox[cnt].style.left = '0%';
    $visBox[cnt].style.zIndex = '1';
    banner('-100%', '0%');
}
timer = setInterval(interval, 3000);

// pause
$visPause.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $visPlay.style.display = 'block';
    clearInterval(timer);
    isPlay = !isPlay;
})
// play
$visPlay.addEventListener('click', e => {
    e.currentTarget.style.display = 'none';
    $visPause.style.display = 'block';
    timer = setInterval(interval, 3000);
    isPlay = !isPlay;
})

// next
$visNext.addEventListener('click', e => {
    $visBox.forEach(element => {
        element.style.left = '100%';
        element.style.zIndex = '-10';
    })
    $visBox[cnt].style.left = '0%';
    $visBox[cnt].style.zIndex = 1;
    cnt++;
    if (cnt > $visBox.length - 1) {
        cnt = 0;
    };
    banner('-100%', '0%');
    if (isPlay) {
        clearInterval(timer);
        timer = setInterval(interval, 3000);
    }
})
// prev
$visPrev.addEventListener('click', e => {
    $visBox.forEach(element => {
        element.style.left = '-100%';
        element.style.zIndex = '-10';
    })
    $visBox[cnt].style.left = '0%';
    $visBox[cnt].style.zIndex = '1';
    cnt--;
    if (cnt < 0) {
        cnt = $visBox.length - 1;
    };
    banner('100%', '0%');
    if (isPlay) {
        clearInterval(timer);
        timer = setInterval(interval, 3000);
    }
})

// round close
function visStaRClose() {
    $visStaRPop.style.top = '-300px';
    $visStaRPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visStaRPopBox.style.zIndex = '-1';
    }, 300)
}
function visDesRClose() {
    $visDesRPop.style.top = '-300px';
    $visDesRPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visDesRPopBox.style.zIndex = '-1';
    }, 300)
}
function visPerRClose() {
    $visPerRPop.style.top = '-300px';
    $visPerRPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visPerRPopBox.style.zIndex = '-1';
    }, 300)
}
function visDateRSClose() {
    $visDateRSBox1.style.top = '-480px';
    $visDateRSBox1.style.boxShadow = 'none';
    setTimeout(() => {
        $visDateRSBox.style.zIndex = '-1';
        $visDateRSBox.style.height = '0px';
    }, 300)
}
function visDateRRClose() {
    $visDateRSBox1R.style.top = '-480px';
    $visDateRSBox1R.style.boxShadow = 'none';
    setTimeout(() => {
        $visDateRSBoxR.style.zIndex = '-1';
        $visDateRSBoxR.style.height = '0px';
    }, 300)
}

// one close
function visStaOClose() {
    $visStaOPop.style.top = '-300px';
    $visStaOPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visStaOPopBox.style.zIndex = '-1';
    }, 300)
}
function visDesOClose() {
    $visDesOPop.style.top = '-300px';
    $visDesOPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visDesOPopBox.style.zIndex = '-1';
    }, 300)
}
function visPerOClose() {
    $visPerOPop.style.top = '-300px';
    $visPerOPop.style.boxShadow = 'none';
    setTimeout(() => {
        $visPerOPopBox.style.zIndex = '-1';
    }, 300)
}
function visDateOSClose() {
    $visDateRSBox1O.style.top = '-480px';
    $visDateRSBox1O.style.boxShadow = 'none';
    setTimeout(() => {
        $visDateRSBoxO.style.zIndex = '-1';
        $visDateRSBoxO.style.height = '0px';
    }, 300)
}



// way
$roundBtn.addEventListener('click', e => {
    $round.style.display = 'block';
    $one.style.display = 'none';
    $roundBtn.style.borderBottom = '2px solid gray';
    $oneBtn.style.borderBottom = 'none';
    visDesOClose();
    visPerOClose();
    visDateOSClose();
    visStaOClose();
})
$oneBtn.addEventListener('click', e => {
    $one.style.display = 'block';
    $round.style.display = 'none';
    $oneBtn.style.borderBottom = '2px solid gray';
    $roundBtn.style.borderBottom = 'none';
    visDesRClose();
    visPerRClose();
    visDateRSClose();
    visDateRRClose();
    visStaRClose();
})



// popup

// round
// start
$visStaR.addEventListener('click', e => {
    $visStaRPopBox.style.zIndex = '2';
    $visStaRPop.style.top = 0;
    $visStaRPop.style.boxShadow = '0px 0px 10px';
    //
    visDesRClose();
    visPerRClose();
    visDateRSClose();
    visDateRRClose();
})
$visStaRPopX.addEventListener('click', e => {
    visStaRClose();
    function visStaRClose() {
        $visStaRPop.style.top = '-300px';
        $visStaRPop.style.boxShadow = 'none';
        setTimeout(() => {
            $visStaRPopBox.style.zIndex = '-1';
        }, 300)
    }
})
$visStaRPopA.forEach(item => {
    item.addEventListener('click', e => {
        $visStaRPop.style.top = '-300px';
        $visStaRPop.style.boxShadow = 'none';
        setTimeout(() => {
            $visStaRPopBox.style.zIndex = '-1';
        }, 300)
        let sel = e.currentTarget.innerHTML;
        $visStaR.textContent = sel;
        $visStaR.style.color = 'black';
        if ($visDesR.innerHTML === $visStaR.innerHTML) alert('출발지와 도착지가 같습니다')
    })
})

// destination
$visDesR.addEventListener('click', e => {
    $visDesRPopBox.style.zIndex = '2';
    $visDesRPop.style.top = 0;
    $visDesRPop.style.boxShadow = '0px 0px 10px';
    // 
    visStaRClose();
    visPerRClose();
    visDateRSClose();
    visDateRRClose();
})
$visDesRPopX.addEventListener('click', e => {
    visDesRClose()
})
$visDesRPopA.forEach(item => {
    item.addEventListener('click', e => {
        $visDesRPop.style.top = '-300px';
        $visDesRPop.style.boxShadow = 'none';
        setTimeout(() => {
            $visDesRPopBox.style.zIndex = '-1';
        }, 300)
        let sel = e.currentTarget.innerHTML;
        $visDesR.textContent = sel;
        $visDesR.style.color = 'black';
        if ($visDesR.innerHTML === $visStaR.innerHTML) alert('출발지와 도착지가 같습니다')
    })
})

// personnel
$visPerR.addEventListener('click', e => {
    $visPerRPopBox.style.zIndex = '1';
    $visPerRPop.style.top = 0;
    $visPerRPop.style.boxShadow = '0px 0px 10px';
    // 
    visStaRClose();
    visDesRClose();
    visDateRSClose();
    visDateRRClose();
})
$visPerRPopX.addEventListener('click', e => {
    visPerRClose()
})

$visPerRPlus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.previousElementSibling;
        let total = 0;
        num.textContent = Number(num.innerHTML) + 1;
        $visPerRP.forEach(item => [
            total += Number(item.innerHTML)
        ])
        if (total > 9) {
            alert('성인/소아/유아 합이 최대 9명까지 가능합니다.');
            $visPerRP.forEach(item => [
                item.textContent = 0,
            ])
            $visPerRP[0].textContent = 1
        }
        if (Number($visPerRP[1].innerHTML) === 0 && Number($visPerRP[2].innerHTML) === 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명`
            $visPerR.style.color='black'
        } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) === 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명`
            $visPerR.style.color='black'
        } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) != 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
            $visPerR.style.color='black'
        } else {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
            $visPerR.style.color='black'
        }
    })
})

$visPerRMinus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.nextElementSibling;
        num.textContent = Number(num.innerHTML) - 1;
        if (Number(num.innerHTML) - 1 < 0) num.textContent = 0;
        if (Number($visPerRP[0].innerHTML) < 1) $visPerRP[0].innerHTML = 1;
        if (Number($visPerRP[1].innerHTML) === 0 && Number($visPerRP[2].innerHTML) === 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명`
            $visPerR.style.color='black'
        } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) === 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명`
            $visPerR.style.color='black'
        } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) != 0) {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
            $visPerR.style.color='black'
        } else {
            $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
            $visPerR.style.color='black'
        }
    })
})

// date
$visDateRS.addEventListener('click', e => {
    $visDateRSBox.style.zIndex = '2';
    $visDateRSBox.style.height = '490px';
    $visDateRSBox1.style.top = 0;
    $visDateRSBox1.style.boxShadow = '0px 0px 10px';
    calendar();
    // 
    visStaRClose();
    visDesRClose();
    visPerRClose();
    visDateRRClose();
})
$visDateRSBox1X.addEventListener('click', e => {
    visDateRSClose();

})

$visDateRR.addEventListener('click', e => {
    $visDateRSBoxR.style.zIndex = '2';
    $visDateRSBoxR.style.height = '490px';
    $visDateRSBox1R.style.top = 0;
    $visDateRSBox1R.style.boxShadow = '0px 0px 10px';
    calendarR();
    // 
    visStaRClose();
    visDesRClose();
    visPerRClose();
    visDateRSClose();
})
$visDateRSBox1XR.addEventListener('click', e => {
    visDateRRClose();
})

// one
// start
$visStaO.addEventListener('click', e => {
    $visStaOPopBox.style.zIndex = '2';
    $visStaOPop.style.top = 0;
    $visStaOPop.style.boxShadow = '0px 0px 10px';
    // 
    visDesOClose();
    visPerOClose();
    visDateOSClose();
})
$visStaOPopX.addEventListener('click', e => {
    visStaOClose();

})
$visStaOPopA.forEach(item => {
    item.addEventListener('click', e => {
        $visStaOPop.style.top = '-300px';
        $visStaOPop.style.boxShadow = 'none';
        setTimeout(() => {
            $visStaOPopBox.style.zIndex = '-1';
        }, 300)
        let sel = e.currentTarget.innerHTML;
        $visStaO.textContent = sel;
        $visStaO.style.color = 'black';
        if ($visDesO.innerHTML === $visStaO.innerHTML) alert('출발지와 도착지가 같습니다')
    })
})

// destination
$visDesO.addEventListener('click', e => {
    $visDesOPopBox.style.zIndex = '2';
    $visDesOPop.style.top = 0;
    $visDesOPop.style.boxShadow = '0px 0px 10px';
    // 
    visPerOClose();
    visDateOSClose();
    visStaOClose();
})
$visDesOPopX.addEventListener('click', e => {
    visDesOClose();

})
$visDesOPopA.forEach(item => {
    item.addEventListener('click', e => {
        $visDesOPop.style.top = '-300px';
        $visDesOPop.style.boxShadow = 'none';
        setTimeout(() => {
            $visDesOPopBox.style.zIndex = '-1';
        }, 300)
        let sel = e.currentTarget.innerHTML;
        $visDesO.textContent = sel;
        $visDesO.style.color = 'black';
        if ($visDesO.innerHTML === $visStaO.innerHTML) alert('출발지와 도착지가 같습니다')
    })
})

// personnel
$visPerO.addEventListener('click', e => {
    $visPerOPopBox.style.zIndex = '1';
    $visPerOPop.style.top = 0;
    $visPerOPop.style.boxShadow = '0px 0px 10px';
    // 
    visDesOClose();
    visDateOSClose();
    visStaOClose();

})
$visPerOPopX.addEventListener('click', e => {
    visPerOClose();
})

$visPerOPlus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.previousElementSibling;
        let total = 0;
        num.textContent = Number(num.innerHTML) + 1;
        $visPerOP.forEach(item => [
            total += Number(item.innerHTML)
        ])
        if (total > 9) {
            alert('성인/소아/유아 합이 최대 9명까지 가능합니다.');
            $visPerOP.forEach(item => [
                item.textContent = 0,
            ])
            $visPerOP[0].textContent = 1
        }
        if (Number($visPerOP[1].innerHTML) === 0 && Number($visPerOP[2].innerHTML) === 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명`
            $visPerO.style.color='black'
        } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) === 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명`
            $visPerO.style.color='black'
        } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) != 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
            $visPerO.style.color='black'
        } else {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
            $visPerO.style.color='black'
        }
    })
})

$visPerOMinus.forEach(element => {
    element.addEventListener('click', e => {
        let num = e.currentTarget.nextElementSibling;
        num.textContent = Number(num.innerHTML) - 1;
        if (Number(num.innerHTML) - 1 < 0) num.textContent = 0;
        if (Number($visPerOP[0].innerHTML) < 1) $visPerOP[0].innerHTML = 1;
        if (Number($visPerOP[1].innerHTML) === 0 && Number($visPerOP[2].innerHTML) === 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명`
            $visPerO.style.color='black'
        } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) === 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명`
            $visPerO.style.color='black'
        } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) != 0) {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
            $visPerO.style.color='black'
        } else {
            $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
            $visPerO.style.color='black'
        }
    })
})

// date
$visDateRO.addEventListener('click', e => {
    $visDateRSBoxO.style.zIndex = '2';
    $visDateRSBoxO.style.height = '490px';
    $visDateRSBox1O.style.top = 0;
    $visDateRSBox1O.style.boxShadow = '0px 0px 10px';
    calendarO();
    // 
    visDesOClose();
    visPerOClose();
    visStaOClose();

})
$visDateRSBox1XO.addEventListener('click', e => {
    visDateOSClose();
})


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

    let $tbody_CalendarS = get('.airportVis .inner .search .popDateBox .popDate .popDateS>tbody');
    let $yearS = get('.airportVis .inner .search .popDateBox .popDate .popDateS .year')
    let $monthS = get('.airportVis .inner .search .popDateBox .popDate .popDateS .month')

    let $tbody_CalendarE = get('.airportVis .inner .search .popDateBox .popDate .popDateE>tbody');
    let $yearE = get('.airportVis .inner .search .popDateBox .popDate .popDateE .year')
    let $monthE = get('.airportVis .inner .search .popDateBox .popDate .popDateE .month')

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
        $visDateRS.style.color = 'black';
        $visDateRS.textContent = dateForm;
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        startDate = dateForm;
        $visDateRS.style.color = 'black';
        $visDateRS.textContent = dateForm;
    }
}

$prevBtn.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    calendar();
})

$nextBtn.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    calendar();
})

// calendarR
function calendarR() {
    let firstDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS>tbody');
    let $yearS = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS .year')
    let $monthS = get('.airportVis .inner .search .popDateBoxR .popDate .popDateS .month')

    let $tbody_CalendarE = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE>tbody');
    let $yearE = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE .year')
    let $monthE = get('.airportVis .inner .search .popDateBoxR .popDate .popDateE .month')

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
        $visDateRR.style.color = 'black';
        $visDateRR.textContent = dateForm;
        dateCom(startDate, returnDate);
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        returnDate = dateForm;
        $visDateRR.style.color = 'black';
        $visDateRR.textContent = dateForm;
        dateCom(startDate, returnDate);
    }
}

$prevBtnR.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    calendarR();
})

$nextBtnR.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    calendarR();
})

// calendar0
function calendarO() {
    let firstDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDateS = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);
    let firstDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 1);
    let lastDateE = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 2, 0);

    let $tbody_CalendarS = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS>tbody');
    let $yearS = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS .year')
    let $monthS = get('.airportVis .inner .search .popDateBoxO .popDate .popDateS .month')

    let $tbody_CalendarE = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE>tbody');
    let $yearE = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE .year')
    let $monthE = get('.airportVis .inner .search .popDateBoxO .popDate .popDateE .month')

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
                selectO(e.currentTarget, 'popDateS');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                selectO(e.currentTarget, 'popDateS');
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
                selectO(e.currentTarget, 'popDateE');
            })
        } else {
            newDIV.className = 'futureDay';
            newDIV.addEventListener('click', e => {
                selectO(e.currentTarget, 'popDateE');
            })
        }
    }
}

function selectO(day, calendarType) {
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
        $visDateRO.style.color = 'black';
        $visDateRO.textContent = dateForm;
    } else if (calendarType === 'popDateE') {
        let date = new Date(selectedDateE);
        let dateForm = date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        returnDate = dateForm;
        $visDateRO.style.color = 'black';
        $visDateRO.textContent = dateForm;
    }
}

$prevBtnO.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());
    calendarO();
})

$nextBtnO.addEventListener('click', e => {
    nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());
    calendarO();
})

// calendar call
calendar();
calendarR();
calendarO();

// md
$mdBtns.forEach((ele, idx) => {
    ele.addEventListener('click', e => {
        $mdBtns.forEach(ele2 => {
            ele2.classList.remove('on');
        });
        ele.classList.add('on');
        $mdUls.forEach(ele => {
            ele.classList.remove('on');
        });
        $mdUls[idx].classList.add('on');
    });
});

// air
$airBtns.forEach((ele, idx) => {
    ele.addEventListener('click', e => {
        if (idx === 1) {
            $airBox.style.transform = 'translateX(-100%)';
            $airBtns.forEach(ele2 => {
                ele2.classList.remove('on');
            });
            ele.classList.add('on');
        } else {
            $airBox.style.transform = 'translateX(0)';
            $airBtns.forEach(ele2 => {
                ele2.classList.remove('on');
            })
            ele.classList.add('on');
        };
    });
});