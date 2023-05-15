(() => {
    mainInit();
})();

function get(target) {
    return document.querySelector(target);
};
function getAll(target) {
    return document.querySelectorAll(target);
};

function mainInit() {
    console.log('     ██╗██╗   ██╗     ██╗██╗   ██╗████████╗ ██████╗ ██╗   ██╗██████╗ ');
    console.log('     ██║██║   ██║     ██║██║   ██║╚══██╔══╝██╔═══██╗██║   ██║██╔══██╗ ');
    console.log('     ██║██║   ██║     ██║██║   ██║   ██║   ██║   ██║██║   ██║██████╔╝ ');
    console.log('██   ██║██║   ██║██   ██║██║   ██║   ██║   ██║   ██║██║   ██║██╔══██╗ ');
    console.log('╚█████╔╝╚██████╔╝╚█████╔╝╚██████╔╝   ██║   ╚██████╔╝╚██████╔╝██║  ██║');
    if(location.pathname.split('/').pop()=='airport.html'){

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
    } else if(location.pathname.split('/').pop()=='hotel.html'){
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
    } else if(location.pathname.split('/').pop()=='rent.html'){
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
        let $R_visDateSBox = get('.rentVis .inner .search .popDateBox')
        let $R_visDateSBox1 = get('.rentVis .inner .search .popDateBox .popDateBox1')
        let $R_visDateSBox1X = get('.rentVis .inner .search .popDateBox .xi-close')
        
        let $R_visDateR = get('.rentVis .inner .search .when .end_date')
        let $R_visDateRBox = get('.rentVis .inner .search .popDateBoxR')
        let $R_visDateBox1R = get('.rentVis .inner .search .popDateBoxR .popDateBox1')
        let $R_visDateBox1XR = get('.rentVis .inner .search .popDateBoxR .xi-close')
        
        let $R_visPer = get('.rentVis .inner .search .when .pers')
        let $R_visPerPopBox = get('.rentVis .inner .search .popPerBox')
        let $R_visPerPop = get('.rentVis .inner .search .popPer')
        let $R_visPerPopX = get('.rentVis .inner .search .popPer .xi-close')
        
        let $R_visPerP = getAll('.rentVis .inner .search .popPer ul li strong')
        let $R_visPerPlus = getAll('.rentVis .inner .search .popPer ul li .plus')
        let $R_visPerMinus = getAll('.rentVis .inner .search .popPer ul li .min')
        
        let $R_visInsu = get('.rentVis .inner .search .insu')
        let $R_visInsuPopBox = get('.rentVis .inner .search .popInsuBox')
        let $R_visInsuPop = get('.rentVis .inner .search .popInsu')
        let $R_visInsuPopX = get('.rentVis .inner .search .popInsu .xi-close')
        let $R_visInsuPopA = getAll('.rentVis .inner .search .popInsu li')
        let $R_visBirth = get('.rentVis .inner .search .when .age')
        
        let $R_visTimeS = get('.rentVis .inner .search .popDateBox .popDateBox1 .timeS .time_select')
        let $R_visTimeE = get('.rentVis .inner .search .popDateBoxR .popDateBox1 .timeE .time_select')
        
        let R_nowMonth = new Date();
        let R_today = new Date();
        R_today.setHours(0, 0, 0, 0);
        
        let $R_prevBtn = get('.rentVis .inner .search .popDateBox .popDate .popDateS .prev')
        let $R_nextBtn = get('.rentVis .inner .search .popDateBox .popDate .popDateE .next')
        let $R_prevBtnR = get('.rentVis .inner .search .popDateBoxR .popDate .popDateS .prev')
        let $R_nextBtnR = get('.rentVis .inner .search .popDateBoxR .popDate .popDateE .next')
        let $R_prevBtnO = get('.rentVis .inner .search .popDateBoxO .popDate .popDateS .prev')
        let $R_nextBtnO = get('.rentVis .inner .search .popDateBoxO .popDate .popDateE .next')
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
            if (day1 === day2) {
                alert('출발일과 리턴일이 같습니다')
            } else if (day1 > day2) {
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
                $R_visTimeE.addEventListener('change', e=>{
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
                $R_visTimeE.addEventListener('change', e=>{
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
        
        $R_visBirth.addEventListener('focus', e=>{
            R_visInsuClose();
            R_visDateSClose()
            R_visDateRClose()
        
        })
    }
};