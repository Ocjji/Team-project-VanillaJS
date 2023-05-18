const get = (target) => document.querySelector(target);
const getAll = (target) => document.querySelectorAll(target);

console.log("███████╗     ██╗████████╗ ██████╗ ██╗   ██╗██████╗ ");
console.log("██╔════╝     ██║╚══██╔══╝██╔═══██╗██║   ██║██╔══██╗");
console.log("█████╗       ██║   ██║   ██║   ██║██║   ██║██████╔╝");
console.log("██╔══╝  ██   ██║   ██║   ██║   ██║██║   ██║██╔══██╗");
console.log("███████╗╚█████╔╝   ██║   ╚██████╔╝╚██████╔╝██║  ██║");
console.log("╚══════╝ ╚════╝    ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝");
console.log("◈ 제주도 가고 싶어연 ◈");

function header() {
    const gnbLi = document.querySelectorAll(".gnb li");
    const topMenu = document.querySelector(".top-menu");
    const subMenu = document.querySelectorAll(".sub-menu");
    const openDiv = document.querySelector(".openDiv");
    gnbLi.forEach((item, index) => {
        item.addEventListener("mouseenter", (e) => {
            openDiv.classList.add("on");
            subMenu.forEach((itemLi) => {
                itemLi.classList.remove("on");
                subMenu[index].classList.add("on");
            });
        });
    });
    subMenu.forEach((item) => {
        openDiv.addEventListener("mouseleave", (e) => {
            item.classList.remove("on");
            e.currentTarget.classList.remove("on");
        });
    });
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜
    let day = today.getDay(); // 요일
    let whatDay = document.querySelector(".date");
    let workTime = document.querySelector(".openingHours strong:nth-of-type(2)");

    whatDay.textContent = calTodayMonthDate(month, date, day);
    function calTodayMonthDate(month, date, day) {
        switch (day) {
            case 1:
                day = "월";
                break;
            case 2:
                day = "화";
                break;
            case 3:
                day = "수";
                break;
            case 4:
                day = "목";
                break;
            case 5:
                day = "금";
                break;
            case 6:
                day = "토";
                break;
            case 7:
                day = "일";
                break;
        }
        if (month < 10) monthDate = `0${month}.${date}(${day})`;
        else monthDate = `${month}.${date}(${day})`;
        return monthDate;
    }
    if (day == 6 || day == 7) {
        workTime.textContent = "휴무일입니다.";
        workTime.style.color = "red";
    } else {
        workTime.textContent = "09:00 - 18:00";
    }
    let lastScrollY;
    window.addEventListener("scroll", function () {
        let nowScrollY = window.scrollY;
        if (lastScrollY < nowScrollY) {
            topMenu.style.display = "none";
        } else {
            topMenu.style.display = "flex";
        }
        lastScrollY = nowScrollY;
    });
}
const tour = () => {
    //====================================================tour_tour

    const $tourVis_banner = getAll(".tourVis .tour_banner li");
    const $tourVis_paging = getAll(".tourVis .tour_paging li");
    const $tourCon_more = get(".tour .tourCon .more");
    const $tour_info = get(".tour .tour_info");
    let tour_cnt = 0,
        tour_old = 0,
        tour_timer = null,
        tour_interval = 3000;

    //tour_banner 공통함수
    function tour_bn(start, end) {
        $tourVis_banner[tour_old].style.left = start;
        $tourVis_banner[tour_old].style.zIndex = "1";
        $tourVis_banner[tour_cnt].style.left = end;
        $tourVis_banner[tour_cnt].style.zIndex = "10";
        tour_pagCol(tour_cnt); // rolling에 맞춰서 paging색변경
        tour_old = tour_cnt;
    }
    //배너 paging 컬러변경 함수
    function tour_pagCol(num) {
        $tourVis_paging.forEach((ele) => {
            ele.classList.remove("on");
        });
        $tourVis_paging[num].classList.add("on");
    }

    //more 버튼
    let tour_more_H = 1050;
    $tourCon_more.addEventListener("click", (e) => {
        if (tour_more_H >= 3000) {
            tour_more_H = 4250;
            $tourCon_more.style.display = "none";
        } else {
            tour_more_H += 1050;
        }
        $tour_info.style.height = tour_more_H + "px";
    });

    //배너 paging버튼
    $tourVis_paging.forEach((ele, idx) => {
        ele.addEventListener("click", (e) => {
            if (idx > tour_cnt) {
                while (idx > tour_cnt) {
                    $tourVis_banner.forEach((item) => {
                        item.style.left = "100%";
                        item.style.zIndex = "1";
                    });
                    $tourVis_banner[tour_cnt].style.left = "0%";
                    $tourVis_banner[tour_cnt].style.zIndex = "10";
                    tour_cnt++;
                    if (tour_cnt > $tourVis_banner.length - 1) {
                        tour_cnt = 0;
                    }
                    tour_bn("-100%", "0%");
                    clearInterval(tour_timer);
                    tour_timer = setInterval(tour_bn_roll, tour_interval);
                }
            } else {
                while (idx < tour_cnt) {
                    $tourVis_banner.forEach((item) => {
                        item.style.left = "-100%";
                        item.style.zIndex = "1";
                    });
                    $tourVis_banner[tour_cnt].style.left = "0%";
                    $tourVis_banner[tour_cnt].style.zIndex = "10";
                    tour_cnt--;
                    if (tour_cnt < 0) {
                        tour_cnt = $tourVis_banner.length - 1;
                    }
                    tour_bn("100%", "0%");
                    clearInterval(tour_timer);
                    tour_timer = setInterval(tour_bn_roll, tour_interval);
                }
            }
            tour_pagCol(idx);
            clearInterval(tour_timer);
            tour_timer = setInterval(tour_bn_roll, tour_interval);
        });
    });

    //tour_banner_rolling 롤링
    function tour_bn_roll() {
        $tourVis_banner.forEach((ele) => {
            ele.style.transitionDuration = "0.3s";
            ele.style.left = "100%";
            ele.style.zIndex = "1";
        });
        tour_cnt++;
        if (tour_cnt > $tourVis_banner.length - 1) {
            tour_cnt = 0;
        }
        $tourVis_banner[tour_cnt].style.left = "0%";
        $tourVis_banner[tour_cnt].style.zIndex = "10";
        tour_bn("-100%", "0%");
    }
    tour_timer = setInterval(tour_bn_roll, tour_interval);
};

// ======================================================pack()
const pack = () => {
    const $pack_menu_li = getAll(".packCon .packCon_main_menu li");
    const $packmain_con_li = getAll(".packCon .packCon_main_con li a");
    const $city_jeju_li = getAll(".packCon .city_jeju li");
    const $city_seo_li = getAll(".packCon .city_seo li");
    const $packCon_main_con = get(".packCon .packCon_main_con");
    const $packCon_main_icon_li = getAll(".packCon .packCon_main_con li");
    const $pack_pop_bg = get(".packCon .pack_pop_bg");
    const $pack_pop_bg_li = getAll(".packCon .pop_bg li");
    const $pack_popup = get(".packCon .pack_popup");
    const $pack_close = getAll(".packCon .close");
    const $pack_popin_li = getAll(".packCon .txt .pop_in li");
    const $pack_info_li = getAll(".packCon .txt .info li");
    const $pack_more = get(".packCon .more");
    const $pack_pop_btn = getAll(".packCon .pack_popup .txt button");
    //search 출발일
    const $packV_search_go = get(".packVis .packV_search .go");
    const $packV_search_go_txt = get(".packVis .packV_search .go span");
    const $packV_search_go_i = get(".packVis .packV_search .go i");
    const $packV_spop_go = get(".packVis .packV_spop_go");
    //search 여행일수
    const $packV_search_date = get(".packVis .packV_search .date");
    const $packV_search_date_txt = get(".packVis .packV_search .date span");
    const $packV_search_date_i = get(".packVis .packV_search ul li .date i");
    const $packV_spop_date_box = get(".packVis .packV_spop_date");
    const $packV_spop_date_li = getAll(".packVis .packV_spop_date li");
    //search 인원
    const $packV_search_people = get(".packVis .packV_search .people");
    const $packV_search_people_txt = get(".packVis .packV_search .people span");
    const $packV_search_people_i = get(".packVis .packV_search .people i");
    const $packV_search_people_box = get(".packVis .packV_spop_people");
    const $packV_btn_o_prev = get(".packVis .packV_spop_people .packV_btn_o_prev");
    const $packV_spop_btn_ol = get(".packVis .packV_o .ol");
    const $packV_btn_o_next = get(".packVis .packV_spop_people .packV_btn_o_next");
    const $packV_btn_y_prev = get(".packVis .packV_spop_people .packV_btn_y_prev");
    const $packV_spop_btn_yo = get(".packVis .packV_y .yo");
    const $packV_btn_y_next = get(".packVis .packV_spop_people .packV_btn_y_next");
    //searh_btt
    const $pack_search_btt = get(".packVis .btt");
    const $pack_prevcal = get(".packVis .packV_spop_go .pack_prevCal")
    const $pack_nextcal = get(".packVis .packV_spop_go .pack_nextCal")
    let pack_top, pack_cnt = 0;
    let packV_btn_o_num = 1;
    let packV_btn_y_num = 0;
    let packV_slid_people = true;
    let packV_slid_date = true;
    let packV_slid_go = true;
    let pack_nowMonth = new Date(); //  페이지 로드한 달
    let pack_today = new Date(); // 페이지 로드한 날짜
    pack_today.setHours(0, 0, 0, 0);

    window.onload = function () {
        pack_buildCal();
    };
    city_jeju();
    city_seo();

    function pack_buildCal() {
        let firstDate = new Date(pack_nowMonth.getFullYear(), pack_nowMonth.getMonth(), 1);
        let lastDate = new Date(pack_nowMonth.getFullYear(), pack_nowMonth.getMonth() + 1, 0);
        let tbody_Calendar = document.querySelector(".packV_calendar tbody");
        document.getElementById("calYear").innerText = pack_nowMonth.getFullYear(); // 연도 갱신
        document.getElementById("calMonth").innerText = pack_leftPad(pack_nowMonth.getMonth() + 1); // 월 갱신

        // 이전 출력결과가 남아있는 경우 초기화
        while (tbody_Calendar.rows.length > 0) {
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }
        let nowRow = tbody_Calendar.insertRow(); // 첫번째 행 추가
        for (let j = 0; j < firstDate.getDay(); j++) {
            let nowColumn = nowRow.insertCell(); // 열 추가
        }
        // 날짜 저장 변수 day // 이번달 마지막날까지 날짜 증가
        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {
            let nowColumn = nowRow.insertCell(); // 새 열 추가
            let newDIV = document.createElement("p");
            newDIV.innerHTML = pack_leftPad(nowDay.getDate()); // 삽입된 열에 날짜 입력
            nowColumn.appendChild(newDIV);
            if (nowDay.getDay() == 6) {
                nowRow = tbody_Calendar.insertRow(); // 새 행 추가
            }
            // 과거 // 오늘 // 미래
            if (nowDay < pack_today) {
                newDIV.className = "pastDay";
            } else if (
                nowDay.getFullYear() == pack_today.getFullYear() &&
                nowDay.getMonth() == pack_today.getMonth() &&
                nowDay.getDate() == pack_today.getDate()
            ) {
                newDIV.className = "pack_today";
                newDIV.onclick = function () {
                    pack_choiceDate(this);
                };
            } else {
                newDIV.className = "futureDay";
                newDIV.onclick = function () {
                    pack_choiceDate(this);
                };
            }
        }
    }
    // 날짜 선택
    function pack_choiceDate(newDIV) {
        if (document.getElementsByClassName("pack_choiceDay")[0]) {
            document.getElementsByClassName("pack_choiceDay")[0].classList.remove("pack_choiceDay");
        }
        newDIV.classList.add("pack_choiceDay");

        $packV_search_go_txt.textContent = `${pack_nowMonth.getMonth() + 1}월 ${newDIV.textContent}일`;
        $packV_search_go_txt.style.color = "black";
        $packV_spop_go.style.height = "0px";
        $packV_search_go_i.style.transform = "rotate(0deg)";
        packV_slid_go = !packV_slid_go;
    }

    // 이전달 버튼 클릭
    $pack_prevcal.addEventListener('click', function (e) {
        pack_nowMonth = new Date(
            pack_nowMonth.getFullYear(),
            pack_nowMonth.getMonth() - 1,
            pack_nowMonth.getDate()
        );
        pack_buildCal();
    })
    // 다음달 버튼 클릭
    $pack_nextcal.addEventListener('click', function (e) {
        pack_nowMonth = new Date(
            pack_nowMonth.getFullYear(),
            pack_nowMonth.getMonth() + 1,
            pack_nowMonth.getDate()
        );
        pack_buildCal();
    })

    function pack_leftPad(value) {
        if (value < 10) {
            value = "0" + value;
            return value;
        }
        return value;
    }

    // pack_search_출발일
    $packV_search_go.addEventListener("click", (e) => {
        if (packV_slid_go) {
            if (!packV_slid_date) {
                $packV_spop_date_box.style.height = "0px";
                $packV_search_date_i.style.transform = "rotate(0deg)";
            }
            if (!packV_slid_people) {
                $packV_search_people_box.style.height = `0px`;
                $packV_search_people_i.style.transform = "rotate(0deg)";
            }
            $packV_spop_go.style.height = "440px";
            $packV_search_go_i.style.transform = "rotate(180deg)";
            packV_slid_go = !packV_slid_go;
        } else {
            $packV_spop_go.style.height = "0px";
            $packV_search_go_i.style.transform = "rotate(0deg)";
            packV_slid_go = !packV_slid_go;
        }
    });
    // pack_search_일정
    $packV_search_date.addEventListener("click", (e) => {
        if (packV_slid_date) {
            if (!packV_slid_go) {
                style.height = "0px";
                $packV_search_go_i.style.transform = "rotate(0deg)";
            }
            if (!packV_slid_people) {
                $packV_search_people_box.style.height = `0px`;
                $packV_search_people_i.style.transform = "rotate(0deg)";
            }
            $packV_spop_date_box.style.height = "400px";
            $packV_search_date_i.style.transform = "rotate(180deg)";
            packV_slid_date = !packV_slid_date;
        } else {
            $packV_spop_date_box.style.height = "0px";
            $packV_search_date_i.style.transform = "rotate(0deg)";
            packV_slid_date = !packV_slid_date;
        }
    });
    $packV_spop_date_li.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            $packV_search_date_txt.textContent = ele.textContent;
            $packV_search_date.style.color = "black";
            $packV_spop_date_box.style.height = "0px";
            packV_slid_date = !packV_slid_date;
            $packV_search_date_i.style.transform = "rotate(0deg)";
        });
    });

    // pack_search_인원
    $packV_search_people.addEventListener("click", (e) => {
        if (packV_slid_people) {
            if (!packV_slid_go) {
                $packV_spop_go.style.height = "0px";
                $packV_search_go_i.style.transform = "rotate(0deg)";
            }
            if (!packV_slid_date) {
                $packV_spop_date_box.style.height = "0px";
                $packV_search_date_i.style.transform = "rotate(0deg)";
            }
            $packV_search_people_box.style.height = `100px`;
            $packV_search_people_i.style.transform = "rotate(180deg)";
            packV_slid_people = !packV_slid_people;
        } else {
            $packV_search_people_box.style.height = `0px`;
            $packV_search_people_i.style.transform = "rotate(0deg)";
            packV_slid_people = !packV_slid_people;
        }
    });
    $packV_btn_o_prev.addEventListener("click", (e) => {
        packV_btn_o_num++;
        $packV_spop_btn_ol.textContent = packV_btn_o_num;
        $packV_search_people.style.color = "black";
        $packV_search_people_txt.textContent = `성인 ${packV_btn_o_num} 명 , 아동 ${packV_btn_y_num} 명`;
    });
    $packV_btn_o_next.addEventListener("click", (e) => {
        packV_btn_o_num--;
        if (packV_btn_o_num < 1) packV_btn_o_num = 1;
        $packV_search_people.style.color = "black";
        $packV_spop_btn_ol.textContent = packV_btn_o_num;
        $packV_search_people_txt.textContent = `성인 ${packV_btn_o_num} 명 , 아동 ${packV_btn_y_num} 명`;
    });
    $packV_btn_y_prev.addEventListener("click", (e) => {
        packV_btn_y_num++;
        $packV_search_people.style.color = "black";
        $packV_spop_btn_yo.textContent = packV_btn_y_num;
        $packV_search_people_txt.textContent = `성인 ${packV_btn_o_num} 명 , 아동 ${packV_btn_y_num} 명`;
    });
    $packV_btn_y_next.addEventListener("click", (e) => {
        packV_btn_y_num--;
        if (packV_btn_y_num < 0) packV_btn_y_num = 0;
        $packV_search_people.style.color = "black";
        $packV_spop_btn_yo.textContent = packV_btn_y_num;
        $packV_search_people_txt.textContent = `성인 ${packV_btn_o_num} 명 , 아동 ${packV_btn_y_num} 명`;
    });

    $pack_search_btt.addEventListener("click", (e) => {
        if (!packV_slid_date) {
            $packV_spop_date_box.style.height = "0px";
            $packV_search_date_i.style.transform = "rotate(0deg)";
        }
        if (!packV_slid_people) {
            $packV_search_people_box.style.height = `0px`;
            $packV_search_people_i.style.transform = "rotate(0deg)";
        }
        if (!packV_slid_go) {
            $packV_spop_go.style.height = "0px";
            $packV_search_go_i.style.transform = "rotate(0deg)";
        }
    });

    // 상세보기&검색아이콘 띄우기
    $packmain_con_li.forEach((ele, idx) => {
        let pac_div = document.createElement("div");
        let pac_i = document.createElement("i");
        let pac_p = document.createElement("p");
        ele.addEventListener("mouseenter", (e) => {
            $packmain_con_li[idx].append(pac_div);
            pac_div.classList.add("ho");
            pac_div.append(pac_i);
            pac_div.append(pac_p);
            pac_i.classList.add("xi-zoom-in");
            pac_p.textContent = "상세보기";
        });
        ele.addEventListener("mouseleave", (e) => {
            pac_div.remove();
            pac_i.remove();
            pac_p.remove();
        });
    });
    let list_H = 760;

    $pack_more.addEventListener("click", (e) => {
        if ($pack_menu_li[0].classList.contains("on")) {
            list_H += 760;
            if (list_H >= 3040) {
                list_H = 3040;
                e.currentTarget.classList.add("off");
            }
            $packCon_main_con.style.height = list_H + "px";
        } else {
            list_H += 760;
            if (list_H >= 1520) {
                list_H = 1520;
                e.currentTarget.classList.add("off");
            }
            $packCon_main_con.style.height = list_H + "px";
        }
    });

    //전체 버튼 누르기
    $pack_menu_li[0].addEventListener("click", (e) => {
        list_H = 760;
        $packCon_main_con.style.height = "760px";

        $pack_menu_li.forEach((item) => {
            item.classList.remove("on");
        });
        $pack_more.classList.remove("off");
        e.currentTarget.classList.add("on");
        city_jeju();
        city_seo();
    });
    //제주시 클래스명 붙
    function city_jeju() {
        $city_jeju_li.forEach((item, idx) => {
            item.classList.remove("on");
            item.classList.add("on");
        });
    }
    //서귀포시 클래스명 붙
    function city_seo() {
        $city_seo_li.forEach((item, idx) => {
            item.classList.remove("on");
            item.classList.add("on");
        });
    }

    //제주시 버튼 누르기
    $pack_menu_li[1].addEventListener("click", (e) => {
        list_H = 760;
        $pack_menu_li.forEach((item) => {
            item.classList.remove("on");
        });
        e.currentTarget.classList.add("on");
        city_jeju();
        $city_seo_li.forEach((item, idx) => {
            item.classList.remove("on");
        });
        $pack_more.classList.remove("off");
        $packCon_main_con.style.height = "760px";
    });
    //서귀포시 버튼누르기
    $pack_menu_li[2].addEventListener("click", (e) => {
        list_H = 760;
        $pack_menu_li.forEach((item) => {
            item.classList.remove("on");
        });
        e.currentTarget.classList.add("on");
        city_seo();
        $city_jeju_li.forEach((item, idx) => {
            item.classList.remove("on");
        });
        $pack_more.classList.remove("off");
        $packCon_main_con.style.height = "760px";
    });

    // pack_popup창 열기
    window.addEventListener("scroll", (e) => {
        pack_top = document.documentElement.scrollTop;
    });
    $packCon_main_icon_li.forEach((ele, idx) => {
        ele.addEventListener("click", (e) => {
            $pack_popup.style.top = `${pack_top - 400}px`;
            //링크막기
            e.preventDefault();
            $pack_pop_bg.classList.add("on");
            $pack_popup.classList.add("on");
            //클릭한 content와 동일한 popup-content 띄우기
            // - 제목
            $pack_pop_bg_li.forEach((item) => {
                item.classList.remove("on");
            });
            $pack_pop_bg_li[idx].classList.add("on");
            // - 사진
            $pack_popin_li.forEach((item) => {
                item.classList.remove("on");
            });
            $pack_popin_li[idx].classList.add("on");
            // - 소개내용
            $pack_info_li.forEach((item) => {
                item.classList.remove("on");
            });
            $pack_info_li[idx].classList.add("on");
        });
    });

    // pack_popup창 닫기
    $pack_close.forEach((ele) => {
        ele.addEventListener("click", (e) => {
            $pack_pop_bg.classList.remove("on");
            $pack_popup.classList.remove("on");
        });
    });
    $pack_pop_bg.addEventListener("click", (e) => {
        $pack_pop_bg.classList.remove("on");
        $pack_popup.classList.remove("on");
    });

    //popup버튼 깜빡이기
    setInterval(function () {
        pack_cnt++;
        if (pack_cnt > $pack_pop_btn.length - 1) {
            pack_cnt = 0;
        }
        $pack_pop_btn.forEach((ele) => {
            ele.style.display = "none";
        });
        $pack_pop_btn[pack_cnt].style.display = "block";
    }, 500);
};
function prom() {
    // promotion.js
    const promotionBox = document.querySelector(".promotionBox");
    const cardBox = document.querySelector(".cardBox");
    const eventBtn = document.querySelector(".eventBtn");
    const membershipBtn = document.querySelector(".membershipBtn");

    eventBtn.addEventListener("click", (e) => {
        cardBox.classList.remove("on");
        promotionBox.classList.add("on");
        e.currentTarget.classList.add("onBtn");
        membershipBtn.classList.remove("onBtn");
    });
    membershipBtn.addEventListener("click", (e) => {
        promotionBox.classList.remove("on");
        cardBox.classList.add("on");
        e.currentTarget.classList.add("onBtn");
        eventBtn.classList.remove("onBtn");
    });
}
function join() {
    // login.js
    // 생년월일
    const birthYear = document.querySelector(".birthYear");
    const birthMonth = document.querySelector(".birthMonth");
    const birthDate = document.querySelector(".birthDate");
    const startYear = 1930;
    let endDate = 0;
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
    last_day();

    birthYear.addEventListener('change', e => {
        console.log('year')
        last_day();
    })
    birthMonth.addEventListener('change', e => {
        console.log('month')
        last_day();
    })
    function last_day() {
        let Year = birthYear.value;
        let Month = birthMonth.value;
        let day = new Date(new Date(Year, Month, 1) - 86400000).getDate();
        if (day > birthDate.length) {
            for (let i = birthDate.length + 1; i <= day; i++) {
                birthDate.options[i - 1] = new Option(i, i);
            }
        } else if (day < birthDate.length) {
            for (let i = birthDate.length; i >= day; i--) {
                birthDate.options[i] = null;
            }
        }
    }
    //패스워드 확인
    const userPassword = document.querySelector(".userPassword");
    const userRePassword = document.querySelector(".userRePassword");
    const NotCollectPassword = document.querySelector(".NotCollectPassword");
    // checkPassword();
    userRePassword.addEventListener('keyup', e => {
        if (userPassword.value != userRePassword.value) {
            NotCollectPassword.textContent = "비밀번호가 일치하지 않습니다.";
        } else {
            NotCollectPassword.textContent = "비밀번호가 일치합니다.";
        }
    })
    /* function checkPassword() {
        if (userPassword.value != userRePassword.value) {
            NotCollectPassword.textContent = "비밀번호가 일치하지 않습니다.";
        } else {
            NotCollectPassword.textContent = "비밀번호가 일치합니다.";
        }
    } */

    // 우편번호
    const findAddrbtn = document.querySelector('.zipCode td input[type=button]');
    console.log(findAddrbtn);
    findAddrbtn.addEventListener('click', e => { sample4_execDaumPostcode(); })

    function sample4_execDaumPostcode() {
        new daum.Postcode({
            oncomplete: function (data) {
                var roadAddr = data.roadAddress;
                var extraRoadAddr = "";
                if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
                    extraRoadAddr += data.bname;
                }
                if (data.buildingName !== "" && data.apartment === "Y") {
                    extraRoadAddr +=
                        extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
                }
                if (extraRoadAddr !== "") {
                    extraRoadAddr = " (" + extraRoadAddr + ")";
                }
                document.getElementById("sample4_postcode").value = data.zonecode;
                document.getElementById("sample4_roadAddress").value = roadAddr;
                document.getElementById("sample4_jibunAddress").value =
                    data.jibunAddress;
                if (roadAddr !== "") {
                    document.getElementById("sample4_extraAddress").value = extraRoadAddr;
                } else {
                    document.getElementById("sample4_extraAddress").value = "";
                }

                var guideTextBox = document.getElementById("guide");
                if (data.autoRoadAddress) {
                    var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                    guideTextBox.innerHTML = "(예상 도로명 주소 : " + expRoadAddr + ")";
                    guideTextBox.style.display = "block";
                } else if (data.autoJibunAddress) {
                    var expJibunAddr = data.autoJibunAddress;
                    guideTextBox.innerHTML = "(예상 지번 주소 : " + expJibunAddr + ")";
                    guideTextBox.style.display = "block";
                } else {
                    guideTextBox.innerHTML = "";
                    guideTextBox.style.display = "none";
                }
            },
        }).open();
    }
}

function air() {
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
                $visPerR.style.color = 'black'
            } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) === 0) {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명`
                $visPerR.style.color = 'black'
            } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) != 0) {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
                $visPerR.style.color = 'black'
            } else {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
                $visPerR.style.color = 'black'
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
                $visPerR.style.color = 'black'
            } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) === 0) {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명`
                $visPerR.style.color = 'black'
            } else if (Number($visPerRP[1].innerHTML) != 0 && Number($visPerRP[2].innerHTML) != 0) {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 소아 ${$visPerRP[1].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
                $visPerR.style.color = 'black'
            } else {
                $visPerR.textContent = `성인 ${$visPerRP[0].innerHTML}명 | 유아 ${$visPerRP[2].innerHTML}명`
                $visPerR.style.color = 'black'
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
                $visPerO.style.color = 'black'
            } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) === 0) {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명`
                $visPerO.style.color = 'black'
            } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) != 0) {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
                $visPerO.style.color = 'black'
            } else {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
                $visPerO.style.color = 'black'
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
                $visPerO.style.color = 'black'
            } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) === 0) {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명`
                $visPerO.style.color = 'black'
            } else if (Number($visPerOP[1].innerHTML) != 0 && Number($visPerOP[2].innerHTML) != 0) {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 소아 ${$visPerOP[1].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
                $visPerO.style.color = 'black'
            } else {
                $visPerO.textContent = `성인 ${$visPerOP[0].innerHTML}명 | 유아 ${$visPerOP[2].innerHTML}명`
                $visPerO.style.color = 'black'
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
}
function hotel() {
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
    function H_whereClose() {
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
                $H_visPer.style.color = 'black'
            } else {
                $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명 | 유아 ${$H_visPerP[2].innerHTML}명`
                $H_visPer.style.color = 'black'
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
                $H_visPer.style.color = 'black'
            } else {
                $H_visPer.textContent = `객실 ${$H_visPerP[0].innerHTML} | 성인 ${$H_visPerP[1].innerHTML}명 | 유아 ${$H_visPerP[2].innerHTML}명`
                $H_visPer.style.color = 'black'
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
            } else if (idx === 2) {
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
    $H_recoJHotels.forEach((item, idx) => {
        item.addEventListener('mouseover', e => {
            $H_recoJMap.forEach(element => {
                element.style.display = 'none'
            });
            if (idx === 5) {
                $H_recoJMap[1].style.display = 'block';
            } else if (idx === 6) {
                $H_recoJMap[2].style.display = 'block';
            } else if (idx === 7) {
                $H_recoJMap[4].style.display = 'block';
            } else if (idx === 8) {
                $H_recoJMap[5].style.display = 'block';
            } else {
                $H_recoJMap[idx].style.display = 'block';
            }
        });
    })

    $H_recoSHotels.forEach((item, idx) => {
        item.addEventListener('mouseover', e => {
            $H_recoSMap.forEach(element => {
                element.style.display = 'none'
            });
            if (idx === 7) {
                $H_recoSMap[2].style.display = 'block';
            } else if (idx === 8) {
                $H_recoSMap[3].style.display = 'block';
            } else {
                $H_recoSMap[idx].style.display = 'block';
            }
        });
    })

    // dot
    $H_recoJHotelsDot.forEach((ele, idx) => {
        ele.addEventListener('click', e => {
            if (idx === 1) {
                $H_recoJHotelsBox.style.transform = 'translateX(-690px)';
                $H_recoJHotelsDot.forEach(ele2 => {
                    ele2.classList.remove('on');
                });
                ele.classList.add('on');
            } else if (idx === 2) {
                $H_recoJHotelsBox.style.transform = 'translateX(-1380px)';
                $H_recoJHotelsDot.forEach(ele2 => {
                    ele2.classList.remove('on');
                })
                ele.classList.add('on');
            } else if (idx === 3) {
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
    $H_recoSHotelsDot.forEach((ele, idx) => {
        ele.addEventListener('click', e => {
            if (idx === 1) {
                $H_recoSHotelsBox.style.transform = 'translateX(-690px)';
                $H_recoSHotelsDot.forEach(ele2 => {
                    ele2.classList.remove('on');
                });
                ele.classList.add('on');
            } else if (idx === 2) {
                $H_recoSHotelsBox.style.transform = 'translateX(-1380px)';
                $H_recoSHotelsDot.forEach(ele2 => {
                    ele2.classList.remove('on');
                })
                ele.classList.add('on');
            } else if (idx === 3) {
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
}
function rent() {
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
        { type: 'E', model1: '아이오닉 1세대', model: 'io1', year: '19년~20년식', fuel: '전기', price1: 14500, price2: 15000, price3: 16000 },
        { type: 'E', model1: '쏘울 3세대', model: 'soul3', year: '18년~19년식', fuel: '전기', price1: 14700, price2: 15500, price3: 16500 },
        { type: 'E', model1: '코나EV', model: 'kona1', year: '22년~23년식', fuel: '전기', price1: 15700, price2: 15900, price3: 16200 },
        { type: 'E', model1: 'SM3', model: 'sm32', year: '17년~18년식', fuel: '전기', price1: 13400, price2: 14400, price3: 15700 },
        { type: 'E', model1: '니로 1세대', model: 'niro1', year: '19년~20년식', fuel: '전기', price1: 14300, price2: 15400, price3: 16000 },

        { type: 'L', model1: '레이 1세대', model: 'ray11', year: '19년~20년식', fuel: '가솔린', price1: 4300, price2: 5400, price3: 6000 },
        { type: 'L', model1: '캐스퍼 액티브', model: 'casperac', year: '22년~23년식', fuel: '가솔린', price1: 4500, price2: 5600, price3: 6500 },
        { type: 'L', model1: '캐스퍼', model: 'casper', year: '22년~23년식', fuel: '가솔린', price1: 4300, price2: 5500, price3: 6500 },
        { type: 'L', model1: '레이 1세대', model: 'ray12', year: '19년~20년식', fuel: '가솔린', price1: 5600, price2: 5800, price3: 6200 },
        { type: 'L', model1: '레이', model: 'ray1', year: '17년~18년식', fuel: '가솔린', price1: 4300, price2: 5400, price3: 6000 },

        { type: 'S', model1: 'K3 1세대', model: 'k31', year: '19년~20년식', fuel: '가솔린', price1: 10200, price2: 11200, price3: 16000 },
        { type: 'S', model1: 'K3 2세대', model: 'k32', year: '20년~20년식', fuel: '가솔린', price1: 14300, price2: 15400, price3: 16200 },
        { type: 'S', model1: 'K3 3세대', model: 'k322', year: '21년~22년식', fuel: '가솔린', price1: 12200, price2: 15400, price3: 16300 },
        { type: 'S', model1: '아반떼 CN7', model: 'cn7', year: '22년~23년식', fuel: '가솔린', price1: 14300, price2: 15400, price3: 16200 },
        { type: 'S', model1: '아반떼 AD', model: 'ad', year: '17년~18년식', fuel: '가솔린', price1: 14700, price2: 14900, price3: 15800 },

        { type: 'M', model1: '소나타', model: 'so1', year: '18년~19년식', fuel: '가솔린', price1: 15700, price2: 16200, price3: 16800 },
        { type: 'M', model1: '말리부', model: 'ma', year: '17년~18년식', fuel: '가솔린', price1: 15700, price2: 15900, price3: 16800 },
        { type: 'M', model1: 'SM6', model: 'sm6', year: '16년~17년식', fuel: '가솔린', price1: 16700, price2: 17000, price3: 17200 },
        { type: 'M', model1: 'SM6', model: 'sm61', year: '18년~19년식', fuel: '가솔린', price1: 16500, price2: 17100, price3: 17300 },
        { type: 'M', model1: 'K5', model: 'k5', year: '17년~18년식', fuel: '가솔린', price1: 15900, price2: 16500, price3: 16900 },

        { type: 'B', model1: '그랜저 GN7', model: 'gn7', year: '22년~23년식', fuel: '가솔린', price1: 18900, price2: 19600, price3: 19900 },
        { type: 'B', model1: '그랜저 IG', model: 'ig2', year: '18년~19년식', fuel: '가솔린', price1: 17900, price2: 18500, price3: 19800 },
        { type: 'B', model1: '그랜저 IG', model: 'ig', year: '17년~18년식', fuel: '가솔린', price1: 18900, price2: 19100, price3: 19300 },
        { type: 'B', model1: 'SM7', model: 'sm7', year: '17년~18년식', fuel: '가솔린', price1: 18900, price2: 19500, price3: 19900 },
        { type: 'B', model1: 'K8', model: 'k8', year: '22년~23년식', fuel: '가솔린', price1: 19900, price2: 20000, price3: 20100 },

        { type: 'I', model1: '미니쿠퍼', model: 'mini', year: '17년~18년식', fuel: '디젤', price1: 22100, price2: 23000, price3: 25000 },
        { type: 'I', model1: '미니쿠퍼', model: 'mini2', year: '22년~23년식', fuel: '가솔린', price1: 21900, price2: 23000, price3: 23200 },
        { type: 'I', model1: '지프 컴패스', model: 'jeep', year: '20년~21년식', fuel: '디젤', price1: 23900, price2: 24200, price3: 25300 },
        { type: 'I', model1: '지프 레니게이드', model: 'jeep2', year: '22년~23년식', fuel: '디젤', price1: 23900, price2: 24200, price3: 25100 },
        { type: 'I', model1: '푸조 2008', model: 'pu', year: '19년~20년식', fuel: '가솔린', price1: 21900, price2: 22000, price3: 23000 },

        { type: 'R', model1: '카니발', model: 'ca', year: '22년~23년식', fuel: '가솔린', price1: 22900, price2: 23000, price3: 24000 },
        { type: 'R', model1: '카니발', model: 'ca2', year: '22년~23년식', fuel: '가솔린', price1: 22900, price2: 24000, price3: 26000 },
        { type: 'R', model1: '스타렉스', model: 'sta', year: '21년~22년식', fuel: '디젤', price1: 23900, price2: 24000, price3: 25500 },
        { type: 'R', model1: '그랜드 스타렉스', model: 'sta2', year: '17년~19년식', fuel: '디젤', price1: 22000, price2: 23300, price3: 24800 },
        { type: 'R', model1: '카니발', model: 'ca3', year: '19년~20년식', fuel: '디젤', price1: 23200, price2: 24400, price3: 25700 },

        { type: 'V', model1: '투싼', model: 'tu', year: '19년~20년식', fuel: '디젤', price1: 24200, price2: 25500, price3: 25900 },
        { type: 'V', model1: '스포티지', model: 'spo2', year: '19년~20년식', fuel: '디젤', price1: 25200, price2: 26000, price3: 26500 },
        { type: 'V', model1: '스포티지', model: 'spo', year: '22년~23년식', fuel: '디젤', price1: 24200, price2: 24800, price3: 25000 },
        { type: 'V', model1: '토레스', model: 'tor', year: '20년~21년식', fuel: '가솔린', price1: 25000, price2: 25800, price3: 26700 },
        { type: 'V', model1: '투싼', model: 'tu1', year: '19년~20년식', fuel: 'LPI', price1: 24000, price2: 25400, price3: 25800 }
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
            $R_type.forEach(element => {
                element.style.backgroundColor = 'white';
            })
            item.style.backgroundColor = 'lightsalmon';
            item.style.borderRadius = '10px';
        });
    });

    function R_dateCom(day1, day2) {
        if (day1 === day2) {
            alert('출발일과 리턴일이 같습니다')
        } else if (day1 > day2) {
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
            $R_visTimeS.addEventListener('change', e => {
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
            $R_visTimeS.addEventListener('change', e => {
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
            $R_visTimeE.addEventListener('change', e => {
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
            $R_visTimeE.addEventListener('change', e => {
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
    function R_visDateSClose() {
        $R_visDateSBox1.style.top = '-540px';
        $R_visDateSBox1.style.boxShadow = 'none';
        setTimeout(() => {
            $R_visDateSBox.style.zIndex = '-1';
            $R_visDateSBox.style.height = '0px';
        }, 300)
    }
    function R_visDateRClose() {
        $R_visDateBox1R.style.top = '-540px';
        $R_visDateBox1R.style.boxShadow = 'none';
        setTimeout(() => {
            $R_visDateRBox.style.zIndex = '-1';
            $R_visDateRBox.style.height = '0px';
        }, 300)
    }

    function R_visInsuClose() {
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

    $R_visBirth.addEventListener('focus', e => {
        R_visInsuClose();
        R_visDateSClose()
        R_visDateRClose()

    })
}
function notice() {
    const boardPost = [
        { id: 0, category: '당첨자발표', title: '<하나LIVE> 23년 03월 29일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2015.06.25' },
        { id: 1, category: '서비스', title: '하나투어 서비스 이용약관 개정고지', date: '2018.03.09' },
        { id: 2, category: '당첨자발표', title: '<하나LIVE> 23년 02월 20일 구매자 대상 추첨 이벤트 당첨자 안내', date: '2018.11.28' },
        { id: 3, category: '서비스', title: '하나투어 [위치기반 서비스 이용약관] 변경사항을 사전 안내 드립니다.', date: '2019.01.08' },
        { id: 4, category: '당첨자발표', title: '<하나투어> H-Collection 구매 이벤트 당첨 1차 안내 (롯데모바일교환권 3만 원권)', date: '2019.01.09' },
        { id: 5, category: '일반', title: '[공지] [해외항공] 아에로멕시코(AM) 미 파산 법원 청구 증명 신청 건 및 EMD바우처 발행 안내 건', date: '2019.01.24' },
        { id: 6, category: '당첨자발표', title: '<퇴근길LIVE> 23년 03월 20일 방송 소통 이벤트 당첨자 안내 (투썸플레이스 기프티콘)', date: '2020.01.06' },
        { id: 7, category: '서비스', title: '투어/입장권 시스템 점검에 따른 이용제한 안내', date: '2020.01.15' },
        { id: 8, category: '당첨자발표', title: '<하나LIVE> 23년 02월 20일 방송 소통 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2020.02.05' },
        { id: 9, category: '일반', title: '[공지] [해외 항공] 서버 전환 작업에 따른 일부 서비스 일시 중단 안내', date: '2020.03.11' },
        { id: 10, category: '일반', title: '시스템 점검에 따른 이용제한 안내', date: '2020.03.17' },
        { id: 11, category: '당첨자발표', title: '<하나LIVE> 22년 12월 22일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2020.03.30' },
        { id: 12, category: '서비스', title: '이용약관 개정에 따른 사전 안내', date: '2020.08.05' },
        { id: 13, category: '서비스', title: '하나투어 마일리지 사용가맹점 제휴 종료에 따른 안내 드립니다.', date: '2020.12.15' },
        { id: 14, category: '일반', title: '시스템 변경에 따른 이용제한 안내', date: '2021.10.06' },
        { id: 15, category: '일반', title: '[공지] 하나투어 마일리지 & 상품권 유효기간 연장', date: '2021.10.14' },
        { id: 16, category: '당첨자발표', title: '<하나LIVE> 23년 04월 26일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2021.10.18' },
        { id: 17, category: '일반', title: '[공지] 오미크론 변이 관련 취소료 규정 변경 공지', date: '2021.10.21' },
        { id: 18, category: '당첨자발표', title: '<하나LIVE> 23년 03월 02일 방송 선착순 이벤트 당첨자 안내 (고급 어메니티 세트)', date: '2021.11.04' },
        { id: 19, category: '일반', title: '[공지] [해외항공] 오미크론 변이 관련 공지', date: '2021.11.09' },
        { id: 20, category: '당첨자발표', title: '<하나LIVE> 23년 03월 02일 방송 소통 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2021.11.09' },
        { id: 21, category: '일반', title: '추석 연휴 항공 문의 온라인 접수 & 일본 여행 예약 응대 안내', date: '2021.11.30' },
        { id: 22, category: '당첨자발표', title: '<하나LIVE> H-Collection 구매자 대상 추첨 이벤트 당첨 안내 (LG 스탠바이미 TV)', date: '2021.11.30' },
        { id: 23, category: '당첨자발표', title: '<하나LIVE> 23년 03월 15일 방송 이벤트 당첨자 안내 (쉐라톤 룸 업그레이드)', date: '2021.11.30' },
        { id: 24, category: '일반', title: '<공지> 새로워진 하나투어의 얼굴과 신규 서비스를 소개합니다.', date: '2021.12.02' },
        { id: 25, category: '서비스', title: 'KT CLiP 앱서비스 종료 안내', date: '2021.12.02' },
        { id: 26, category: '당첨자발표', title: '<하나LIVE> 23년 04월 19일 방송 선착순 이벤트 당첨자 안내', date: '2021.12.08' },
        { id: 27, category: '당첨자발표', title: '<하나LIVE> 23년 04월 26일 방송 구매인증 이벤트 당첨자 안내 (렌터카 24시간 이용)', date: '2021.12.16' },
        { id: 28, category: '안전정보', title: '[공지] 입국 전 코로나19 PCR/RAT 의무 검사 중단 안내', date: '2021.12.20' },
        { id: 29, category: '당첨자발표', title: '<하나LIVE> 23년 04월 05일 방송 구매자 대상 추첨 이벤트 당첨자 안내(파타야 호텔 룸 업그레이드)', date: '2021.12.20' },
        { id: 30, category: '서비스', title: '하나투어 서비스 이용약관 개정고지', date: '2022.01.27' },
        { id: 31, category: '서비스', title: '투어/입장권 시스템 점검에 따른 이용제한 안내', date: '2022.02.10' },
        { id: 32, category: '당첨자발표', title: '<하나LIVE> 22년 12월 21일 방송 이벤트 당첨자 안내 (스위트 룸 업그레이드)', date: '2022.02.17' },
        { id: 33, category: '당첨자발표', title: '<하나LIVE> 23년 04월 26일 방송 추첨 이벤트 당첨자 안내 (타워 스탠다드 룸 업그레이드)', date: '2022.03.25' },
        { id: 34, category: '일반', title: '[해외항공] 상담 지연 안내', date: '2022.05.30' },
        { id: 35, category: '당첨자발표', title: '<하나LIVE> H-Collection 구매인증 이벤트 당첨 안내 (하나투어 마일리지)', date: '2022.06.24' },
        { id: 36, category: '당첨자발표', title: '<하나투어> H-Collection 구매 이벤트 당첨 2차 안내 (롯데모바일교환권 3만 원권)', date: '2022.08.19' },
        { id: 37, category: '서비스', title: '[개인정보보호] 위치정보이용약관 변경 안내', date: '2022.09.01' },
        { id: 38, category: '당첨자발표', title: '<하나LIVE> 23년 01월 16일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2022.09.08' },
        { id: 39, category: '서비스', title: '국내 실시간 골프 예약 서비스 종료 안내', date: '2022.09.30' },
        { id: 40, category: '일반', title: '[공지] 하나투어 상품권으로 해외 항공권 결제 가능 전환 안내', date: '2022.10.05' },
        { id: 41, category: '당첨자발표', title: '<하나LIVE> H-Collection 구매 이벤트 당첨 안내 (롯데모바일교환권 5만 원권)', date: '2022.10.24' },
        { id: 42, category: '당첨자발표', title: '<하나LIVE> 23년 04월 12일 방송 선착순 혜택 당첨자 안내(석식 BBQ+별빛고운카드+주유권)', date: '2022.10.27' },
        { id: 43, category: '당첨자발표', title: '<하나LIVE> 23년 03월 15일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2022.10.27' },
        { id: 44, category: '일반', title: '시스템 점검에 따른 이용제한 안내', date: '2022.10.31' },
        { id: 45, category: '일반', title: '시스템 점검에 따른 이용제한 안내', date: '2022.10.31' },
        { id: 46, category: '당첨자발표', title: '<하나LIVE> 23년 01월 04일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2022.11.08' },
        { id: 47, category: '일반', title: '[공지] 오미크론 변이 관련 격리 조건 변경 공지', date: '2022.11.28' },
        { id: 48, category: '서비스', title: '[공지] 하나투어 항공 앱 & 호텔 앱 서비스 통합 안내', date: '2022.11.29' },
        { id: 49, category: '당첨자발표', title: '<하나LIVE> 22년 12월 21일 방송 이벤트 당첨자 안내 (롯데모바일교환권 1만 원권)', date: '2022.12.05' },
        { id: 50, category: '일반', title: '하나LIVE, 타임세일 임시 연기 안내 (10/31~11/06)', date: '2022.12.22' },
        { id: 51, category: '당첨자발표', title: '<하나LIVE> 23년 03월 08일 구매자 대상 이벤트 당첨자 안내', date: '2022.12.22' },
        { id: 52, category: '서비스', title: '하나투어 국내숙박 앱 서비스 종료 안내', date: '2022.12.23' },
        { id: 53, category: '서비스', title: '시스템 점검에 따른 이용제한 안내', date: '2022.12.26' },
        { id: 54, category: '서비스', title: '하나투어 고객센터 개편 안내 (11/16)', date: '2022.12.29' },
        { id: 55, category: '당첨자발표', title: '<하나LIVE> 23년 04월 12일 방송 이벤트 당첨자 안내', date: '2023.01.05' },
        { id: 56, category: '당첨자발표', title: '<하나LIVE> 23년 01월 18일 구매인증 이벤트 당첨자 안내 (무스텔라 어메니티)', date: '2023.01.12' },
        { id: 57, category: '당첨자발표', title: '<하나LIVE> 23년 03월 22일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.01.16' },
        { id: 58, category: '당첨자발표', title: '<퇴근길LIVE> 23년 04월 17일 방송 소통 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.01.17' },
        { id: 59, category: '일반', title: '<하나LIVE> 22년 10월 31일, 11월 2일 방송 연기 안내', date: '2023.01.19' },
        { id: 60, category: '서비스', title: '[ 장기 휴면회원 개인정보 파기 안내 ]', date: '2023.01.19' },
        { id: 61, category: '서비스', title: '하나투어 서비스 이용약관 개정고지', date: '2023.01.20' },
        { id: 62, category: '서비스', title: '개인정보 처리방침 개정관련 사전안내', date: '2023.01.20' },
        { id: 63, category: '당첨자발표', title: '<하나LIVE> 23년 03월 08일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.01.20' },
        { id: 64, category: '일반', title: '설 연휴 국내/해외 항공 업무 안내', date: '2023.01.31' },
        { id: 65, category: '일반', title: '[공지] 제주항공 시스템 교체로 인한 서비스 이용 중단 안내', date: '2023.02.22' },
        { id: 66, category: '서비스', title: '하나프리앱 서비스 종료 안내', date: '2023.02.22' },
        { id: 67, category: '일반', title: '[공지] 설 연휴 국내/해외 항공 업무 안내', date: '2023.02.23' },
        { id: 68, category: '서비스', title: 'ARS 시스템 점검에 따른 이용제한 안내', date: '2023.02.23' },
        { id: 69, category: '일반', title: '[해외공항 위탁 수하물 관련 안내]', date: '2023.03.03' },
        { id: 70, category: '당첨자발표', title: '<퇴근길LIVE> 23년 04월 03일 방송 소통 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.03.10' },
        { id: 71, category: '당첨자발표', title: '<하나LIVE> 22년 12월 28일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.03.10' },
        { id: 72, category: '일반', title: '[해외공항 위탁 수하물 관련 안내]', date: '2023.03.16' },
        { id: 73, category: '일반', title: '[개인정보보호] 개인정보 처리방침 변경 안내', date: '2023.03.17' },
        { id: 74, category: '서비스', title: '[개인정보보호] 개인정보 처리방침 변경 안내', date: '2023.03.17' },
        { id: 75, category: '일반', title: '시스템 점검에 따른 이용제한 안내', date: '2023.03.21' },
        { id: 76, category: '일반', title: '[공지] 오미크론 변이 관련 취소료 규정 변경 공지', date: '2023.03.23' },
        { id: 77, category: '일반', title: '[공지] [해외항공] 타이항공(TG) 환불 및 바우처발행 관련 안내', date: '2023.03.27' },
        { id: 78, category: '당첨자발표', title: '<하나LIVE> 23년 04월 19일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.03.27' },
        { id: 79, category: '당첨자발표', title: '<하나LIVE> 23년 02월 22일 구매인증 이벤트 당첨자 안내 (카야토스트+커피 쿠폰)', date: '2023.03.27' },
        { id: 80, category: '당첨자발표', title: '<하나LIVE> 23년 01월 11일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.03.27' },
        { id: 81, category: '서비스', title: '[개인정보보호] 개인정보 처리방침 변경', date: '2023.03.29' },
        { id: 82, category: '일반', title: '[공지] [해외항공] 부정기편 탑승 제한조건 안내', date: '2023.04.04' },
        { id: 83, category: '당첨자발표', title: '<하나LIVE> 23년 04월 26일 방송 선착순 이벤트 당첨자 안내 (돌핀크루즈)', date: '2023.04.05' },
        { id: 84, category: '서비스', title: '하나투어 고객센터 앱 서비스 이용 안내', date: '2023.04.06' },
        { id: 85, category: '서비스', title: '하나투어 모바일 메인 및 하나프리 항공 서비스 개편하였습니다.', date: '2023.04.07' },
        { id: 86, category: '서비스', title: '회원정보 정제 고지', date: '2023.04.13' },
        { id: 87, category: '당첨자발표', title: '<하나LIVE> 23년 01월 18일 선착순 이벤트 당첨자 안내 (GS/이마트 모바일 상품권)', date: '2023.04.13' },
        { id: 88, category: '당첨자발표', title: '<하나LIVE> 23년 04월 05일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.04.18' },
        { id: 89, category: '일반', title: '하나투어 [개인정보처리방침] 변경사항을 사전 안내 드립니다.', date: '2023.04.20' },
        { id: 90, category: '서비스', title: '[개인정보보호] 개인정보 처리방침 변경 안내', date: '2023.04.21' },
        { id: 91, category: '일반', title: '[공지] [해외항공] 대한민국 전자여행 허가제 (K-ETA) 시행', date: '2023.04.27' },
        { id: 92, category: '서비스', title: '시스템 점검에 따른 이용제한 안내', date: '2023.04.27' },
        { id: 93, category: '당첨자발표', title: '<하나LIVE> 23년 02월 22일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.04.27' },
        { id: 94, category: '당첨자발표', title: '<하나LIVE> 23년 01월 18일 방송 이벤트 당첨자 안내 (스타벅스 기프티콘)', date: '2023.04.27' },
        { id: 95, category: '일반', title: '하나투어 [개인정보 처리방침] 변경사항을 사전 안내 드립니다', date: '2023.05.03' },
        { id: 96, category: '서비스', title: '전자금융거래 이용약관 개정안내(시행일자: 2022. 10. 14)', date: '2023.05.04' },
        { id: 97, category: '일반', title: '5월 연휴 국내/해외 항공 업무 안내', date: '2023.05.04' },
    ];
    const boardNormal = [];
    const boardSafety = [];
    const boardSurvice = [];
    const boardEvent = [];
    boardPost.forEach(obj => {
        if (obj.category === '일반') {
            boardNormal.push(obj);
        } else if (obj.category === '안전정보') {
            boardSafety.push(obj);
        } else if (obj.category === '서비스') {
            boardSurvice.push(obj);
        } else if (obj.category === '당첨자발표') {
            boardEvent.push(obj);
        }
    })
    const boardTotal = [];
    boardTotal.push(boardPost);
    boardTotal.push(boardNormal);
    boardTotal.push(boardSafety);
    boardTotal.push(boardSurvice);
    boardTotal.push(boardEvent);

    const noticeBoardLi = document.querySelectorAll('.notice-list li');
    const noticeBoardTable = document.querySelectorAll('.notice-board-content div');
    const noticeBoardTableAll = document.querySelector('.notice-board-content .notice-table-all');
    const noticeBoardPaging = document.querySelector('.notice-paging');
    const searchSelect = document.querySelector('.notice-search select');
    let noticeBoardPagingBtn = document.querySelectorAll('.notice-paging button');

    let page = 1;
    let categorynum = 0;
    let totalPostNum = boardPost.length;
    let totalPostpagingMax = 0;

    makeBoard(categorynum, boardPost, page);
    makePaging(boardPost);

    searchSelect.addEventListener('change', e => {
        let seletedCurrent = e.currentTarget;
        categorynum = seletedCurrent.value;
        makeBoard(seletedCurrent.value, boardTotal[seletedCurrent.value], 1);
        makePaging(boardTotal[seletedCurrent.value]);

        noticeBoardLi.forEach(element => {
            element.classList.remove('on');
        });
        noticeBoardTable.forEach(element => {
            element.classList.remove('on');
        });

        noticeBoardLi[seletedCurrent.value].classList.add('on');
        noticeBoardTable[seletedCurrent.value].classList.add('on');
    })

    noticeBoardLi.forEach((element, idx) => {
        element.addEventListener('click', e => {
            noticeBoardLi.forEach(element => {
                element.classList.remove('on');
            });
            noticeBoardTable.forEach(element => {
                element.classList.remove('on');
            });
            e.currentTarget.classList.add('on');
            noticeBoardTable[idx].classList.add('on');

            categorynum = e.currentTarget.dataset.categorynum;
            if (categorynum == 0) {
                makeBoard(categorynum, boardPost, 1);
                makePaging(boardPost);
            } else if (categorynum == 1) {
                makeBoard(categorynum, boardNormal, 1);
                makePaging(boardNormal);
            } else if (categorynum == 2) {
                makeBoard(categorynum, boardSafety, 1);
                makePaging(boardSafety);
            } else if (categorynum == 3) {
                makeBoard(categorynum, boardSurvice, 1);
                makePaging(boardSurvice);
            } else if (categorynum == 4) {
                makeBoard(categorynum, boardEvent, 1);
                makePaging(boardEvent);
            }
        })
    })

    // 버튼 동적 생성
    function makePaging(boardArr) {
        let pagingMax = Math.ceil(boardArr.length / 10); // 버튼 개수 게시물 / 10
        noticeBoardPaging.innerHTML = null;
        for (let i = 1; i <= pagingMax; i++) {
            noticeBoardPaging.innerHTML += `<button data-page=${i}>${i}</button>`;
        }
        noticeBoardPagingBtn = document.querySelectorAll('.notice-paging button');
        noticeBoardPagingBtn[0].classList.add('on');
        noticeBoardPagingBtn.forEach(button => {
            button.addEventListener('click', e => {
                noticeBoardPagingBtn.forEach(element => {
                    element.classList.remove('on');
                })
                e.currentTarget.classList.add('on');

                let button_page = e.currentTarget.dataset.page;
                makeBoard(categorynum, boardTotal[categorynum], button_page);
            });
        })
    }

    // 게시글 동적 생성
    function makeBoard(categorynum, boardArr, page) {
        noticeBoardTable.forEach(board => {
            board.children[0].children[3].innerHTML = null;
        })
        for (let i = boardArr.length - ((page - 1) * 10) - 1; i >= Math.max(boardArr.length - (page * 10), 0); i--) {
            let tr = document.createElement('tr');
            tr.innerHTML =
                `<td>${boardArr[i].id + 1}</td>
          <td>${boardArr[i].category}</td>
          <td>${boardArr[i].title}</td>
          <td>${boardArr[i].date}</td>`;
            noticeBoardTable[categorynum].children[0].children[3].append(tr);
            // tbody 내용 append
        }
    }
}
function qna() {
    const qnaArrListTitle = [
        '여권의 유효기간은 반드시 6개월 이상 남아있어야 하나요?',
        '여행계약서는 꼭 동의해야 하나요?',
        '여행계약서란 무엇인가요?',
        '여행계약서를 이미 동의했는데 여행계약서 알림톡(메일)을 또 받았습니다.',
        '여행계약서는 어떻게 확인할 수 있나요?',
        '여행계약서를 확인하고 동의하라는 메일을 받았습니다. 어디에서 확인하고 동의하는 건가요?',
        '여행계약서를 미동의했다고 나옵니다. 어떻게 동의하는 건가요?',
        '다른 사람의 예약을 대신 해주었습니다. 여행계약서를 동의하려고 비회원 예약확인을 했는데 아무것도 나오지 않아요.',
        '저는 여행계약서가 왔는데 동행자는 문자나 이메일 등 아무것도 받지 못했습니다. 어떻게 확인할 수 있나요?',
        '저는 확정이라 여행계약서를 동의했는데 동행자는 대기입니다. 여행계약서를 어떻게 확인할 수 있나요?'
    ];
    const qnaArrListAns = [
        '<p>대부분의 여행 지역은 탑승일 기준으로 여권의 유효기간이 6개월 이상 남아있도록 하는 것을 권장하고 있습니다.&nbsp;</p><p><br></p><p>여권의 유효기간이 여유 있지 않은 경우 현지 공항의 출입국 사무소 직원의 판단 하에 입국에 문제가 생길 수 있는 등,</p><p>예상치 못한 문제들이 발생될 수 있으므로 문제의 소지 없도록 당사에서는 6개월 이상으로 안내 드리고 있는 점 참고 부탁드리겠습니다.</p>',
        '<p><span style="color: rgb(184, 49, 47);">여행계약서는 여행 출발전까지 동의해야 합니다.</span></p><p><br></p><p>또한 예약한 여행 상품에 변경 사항이 발생할 경우 재발송 되며 수신한 여행계약서는 모두 여행자 본인의 확인 및 동의가 필요합니다.</p><p><br></p><p>동의한 여행계약서는 여행이 종료되는 귀국일까지 언제든지 확인이 가능합니다.</p>',
        '<p>"여행계약서"란 여행사를 통해 여행 상품을 예약/결제한 경우 이에 필요한 여러가지 제반 사항 및 의무 사항을 규정한 내용을 적은 계약 문서입니다.</p><p><br></p><p>하나투어는 고객님과의 여행 계약이 이루어졌을 때 이와 관련하여 제공되는 내용을 적은 문서 즉, 여행계약서를 교부하고 있으며 교부 시 여행 일정표 및 여행 약관 등도 함께 포함하고 있습니다. 해당내용을 확인하시고 동의를 해주시면 됩니다.</p>',
        '<p>여행계약서는 예약한 여행 상품에 변경 사항이 발생하면 추가로 발송 될 수 있습니다.</p><p><span style="color: rgb(184, 49, 47);">이미 여행계약서를 동의했더라도 재발송될 수 있으므로 수신한 여행계약서의 내용을 꼭 확인하고 다시 동의해주시기 바랍니다.</span></p>',
        '<p>여행계약서는 카카오 알림톡, SMS, 이메일 등을 통해 받으실 수 있습니다.</p><p><br></p><p>카카오 알림톡: 알림톡 내에 바로가기 링크 주소 클릭</p><p>SMS: 문자로 발송되는 링크 주소 클릭</p><p>이메일: 이메일 내에 여행계약서 바로가기 버튼 클릭</p><p><br></p><p>이후 이동하는 페이지에서 로그인 또는 비회원 예약조회를 진행하시면 여행계약서가 바로 확인되거나 예약 내역 상세 페이지에서 여행계약서를 수동으로 확인할 수 있습니다.</p>',
        '<p>받으신 메일 내용 중 여행계약서 동의하기 를 클릭하시면 예약 내역 상세 페이지로 이동합니다.</p><p><br></p><p>회원일 경우 로그인, 비회원일 경우 비회원 예약조회를 진행하시면 여행계약서가 바로 확인되며 계약서 내용을 확인하시고 하단의 여행계약서 동의하기를 클릭하시면 됩니다.</p><p>로그인 절차를 진행하였음에도 바로 여행계약서가 확인되지 않을 경우, 다음의 경로에서 여행계약서를 확인하고 동의할 수 있습니다.</p>',
        '<p>여행계약서는 다음의 경로를 통해 확인할 수 있습니다.</p><p><br></p><p>회원일 경우 로그인, 비회원일 경우 비회원 예약 조회로 진행할 수 있으며 <span style="color: rgb(184, 49, 47);">로그인을 하였음에도 예약 내역이 확인되지 않을 경우 비회원 예약 조회를 통해 확인</span>할 수 있습니다.</p>',
        '<p><span style="color: rgb(184, 49, 47);">여행계약서는 여행을 가는 여행자 본인이 확인하고 동의해야 합니다.</span></p><p><br></p><p>실제 여행을 가지 않는 제 3자가 비회원 예약 조회를 할 경우 여행자와 정보가 일치하지 않기 때문에 예약 내역 및 여행계약서를 확인할 수 없습니다.</p><p>반드시 여행자 본인의 정보로 비회원 예약 조회로 진행하여야 합니다.</p>',
        '<p>대표적으로 다음의 2가지 경우에 해당합니다.</p><p><br></p><p><span style="font-weight: 600;">1) 예약이 확정 되지 않은 경우</span></p><p><span style="color: rgb(184, 49, 47);">예약 대기 상태일 경우 여행계약서가 발송되지 않습니다.</span> 예약이 확정되면 확정 후 익일에 카카오 알림톡으로 여행계약서가 발송됩니다.</p><p><br></p><p><span style="font-weight: 600;">2) 정확한 고객 정보가 입력되지 않은 경우</span></p><p><span style="color: rgb(184, 49, 47);">예약 시 고객의 정확한 휴대폰 번호 또는 이메일 주소가 입력되지 않았을 경우</span>여행계약서를 수신할 수 없습니다.&nbsp;</p><p><br></p><p><span style="font-weight: 600;">하나투어 홈페이지 또는 앱을 통해 예약 상태 및 여행자 정보를 확인하여 주시고 고객 정보 변경 등 예약 관련 각종 문의 사항은 예약 담당자를 통해 확인해 주시기 바랍니다.</span></p>',
        '<p>여행계약서는 예약상태가 [예약확정]일 때만 발송됩니다.&nbsp;</p><p><span style="color: rgb(184, 49, 47);">[대기예약]인 경우 예약 상태가 [예약확정]이 변경되면 해당 여행자의 입력된 휴대폰 번호로 여행계약서 알림톡이 발송</span>되며, 받으신 알림톡 내 링크 주소로 접속하면 여행계약서 내용 확인 및 동의를 하실 수 있습니다.</p>'
    ];

    const qnaList = document.querySelector('.qna-list'); // 질문 리스트
    const qnaPaging = document.querySelectorAll('.qna-paging span');

    let qnaLi = null;
    let old = 0;
    let qnaTitleList = qnaArrListTitle;
    let qnaAnsList = qnaArrListAns;
    let qnaCurrentPage = 0;

    qnaPaging.forEach(page => {
        page.addEventListener('click', e => {
            qnaPaging.forEach(element => {
                element.classList.remove('on');
            });
            e.currentTarget.classList.add('on');
        })
    })

    function makeqnalist() {
        qnaList.innerHTML = null;
        qnaAnsList.forEach((answer, idx) => {
            qnaList.innerHTML += `<li><strong>${qnaArrListTitle[idx]}</strong><div>${answer}</div></li>`;
        })
        qnaLi = document.querySelectorAll('.qna-list li');
        qnaLi.forEach((element, idx) => {
            element.addEventListener('click', e => {
                if (e.currentTarget.classList.contains('on')) {
                    e.currentTarget.classList.remove('on');
                } else {
                    qnaLi.forEach(element => {
                        element.classList.remove('on');
                    })
                    e.currentTarget.classList.add('on');
                }
            })
        })

    }

    makeqnalist();
}

function index() {
    // 비주얼 배너
    const body = document.querySelector('body');
    const mainVisual = document.querySelector('.main-visual');
    const mainVisualBanner = document.querySelector('.mainVisualBanner');
    const mainVisualBannerLi = document.querySelectorAll('.mainVisualBanner li');
    const btnVisualPrev = document.querySelector('.visualPrev');
    const btnVisualNext = document.querySelector('.visualNext');
    const currentPage = document.querySelector('.currentPage');
    const mainBannerRollingBtn = document.querySelector('.visualNavPlay button');
    const freeTravelList = document.querySelector('.free-travel-list');
    const btnFreeTravelPrev = document.querySelector('.free-travel-prev');
    const btnFreeTravelNext = document.querySelector('.free-travel-next');
    const bestGoodsNavLi = document.querySelectorAll('.best-goods .goods-nav li');
    const bestGoodsViewLi = document.querySelectorAll('.best-goods .goods-view li');
    const recommendLeftLi = document.querySelectorAll('.left-side-nav-list li');
    const recommendRightUl = document.querySelectorAll('.right-side-content ul');

    const mainVisualSelectTabLi = document.querySelectorAll('.main-visual .visual-sel-tab li');
    const mainVisualSelectTabViewLi = document.querySelectorAll('.main-visual .visual-res-tab>li');

    const whereToGo = document.querySelector('.res-tab-pack input');
    const whereToTravel = document.querySelector('.res-tab-pack .where-to-travel');
    const whereToTravelulLi = document.querySelectorAll('.res-tab-pack .where-to-travel li');

    const howToGo = document.querySelector('.res-tab-air input');
    const howToGoAir = document.querySelector('.res-tab-air .how-to-go');
    const howToGoAirUlLi = document.querySelectorAll('.res-tab-air .how-to-go li');

    const startTravelDepart = document.querySelector('.res-tab-pack .start-travel-depart');
    const startTravelDepartSpan = document.querySelector('.res-tab-pack .start-travel-depart span');
    const startSelectDepartUl = document.querySelector('.res-tab-pack .select-depart');
    const startSelectDepartList = document.querySelectorAll('.res-tab-pack .select-depart li');

    const startTravelDepart_air = document.querySelector('.res-tab-air .start-travel-depart');
    const startTravelDepartSpan_air = document.querySelector('.res-tab-air .start-travel-depart span');
    const startSelectDepartUl_air = document.querySelector('.res-tab-air .select-depart');
    const startSelectDepartList_air = document.querySelectorAll('.res-tab-air .select-depart li');

    // const startTravelDepart_hotel = document.querySelector('.res-tab-hotel .start-travel-depart');
    // const startTravelDepartSpan_hotel = document.querySelector('.res-tab-hotel .start-travel-depart span');
    // const startSelectDepartUl_hotel = document.querySelector('.res-tab-hotel .select-depart');
    // const startSelectDepartList_hotel = document.querySelectorAll('.res-tab-hotel .select-depart li');

    const startTravelDate = document.querySelector('.res-tab-pack .start-travel-date');
    const startTravelDateAir = document.querySelector('.res-tab-air .start-travel-date');
    const startTravelDateHotel = document.querySelector('.res-tab-hotel .start-travel-date');
    const endTravelDateHotel = document.querySelector('.res-tab-hotel .end-travel-date');

    const startTravelDateSpan = document.querySelector('.res-tab-pack .start-travel-date span');
    const startTravelDateSpanAir = document.querySelector('.res-tab-air .start-travel-date span');
    const startTravelDateSpanHotel = document.querySelector('.res-tab-hotel .start-travel-date span');
    const endTravelDateSpanHotel = document.querySelector('.res-tab-hotel .end-travel-date span');

    const startTravelCalendar = document.querySelector('.res-tab-pack .startTravelCalendar');
    const startTravelCalendarAir = document.querySelector('.res-tab-air .startTravelCalendarAir');
    const startTravelCalendarHotel = document.querySelector('.res-tab-hotel .startTravelCalendarStart');
    const endTravelCalendarHotel = document.querySelector('.res-tab-hotel .startTravelCalendarEnd');

    const btnHaveAir = document.querySelector('.res-tab-pack .btnHaveAir');
    const btnHaveAir_air = document.querySelector('.res-tab-air .btnHaveAir');
    const btnHaveAir_hotel = document.querySelector('.res-tab-hotel .btnHaveAir');

    const btnOnlyTeam = document.querySelector('.res-tab-pack .btnOnlyTeam');
    const btnOnlyTeam_air = document.querySelector('.res-tab-air .btnOnlyTeam');
    const btnOnlyTeam_hotel = document.querySelector('.res-tab-hotel .btnOnlyTeam');

    const btnHotelchoose = document.querySelector('.res-tab-hotel .hotel-choose');
    const btnHotelchooseSpan = document.querySelector('.res-tab-hotel .hotel-choose span');
    const btnHotelchooseBox = document.querySelector('.res-tab-hotel .hotel-choose-box');
    const btnHotelchooseClose = document.querySelector('.res-tab-hotel .hotel-choose-box .xi-close');
    const btnHotelchooseRoomSpan = document.querySelector('.res-tab-hotel .hotel-choose-box .roomCount span');
    const btnHotelchooseRoombtn = document.querySelectorAll('.res-tab-hotel .hotel-choose-box .roomCount em');
    const btnHotelchooseAdultSpan = document.querySelector('.res-tab-hotel .hotel-choose-box .adultCount span');
    const btnHotelchooseAdultbtn = document.querySelectorAll('.res-tab-hotel .hotel-choose-box .adultCount em');
    const btnHotelchooseChildSpan = document.querySelector('.res-tab-hotel .hotel-choose-box .childCount span');
    const btnHotelchooseChildbtn = document.querySelectorAll('.res-tab-hotel .hotel-choose-box .childCount em');
    const btnHotelchooseSubmit = document.querySelector('.res-tab-hotel .hotel-choose-box .hotel-option-submit');

    let hotelRoomCount = 1;
    let hotelAdultCount = 2;
    let hotelChildCount = 0;

    btnHotelchoose.addEventListener('click', e => {
        btnHotelchooseBox.classList.add('on');
    })
    btnHotelchooseClose.addEventListener('click', e => {
        btnHotelchooseBox.classList.remove('on');
    })
    btnHotelchooseSubmit.addEventListener('click', e => {
        btnHotelchooseBox.classList.remove('on');
        btnHotelchooseSpan.textContent = `객실 ${hotelRoomCount} / 성인 ${hotelAdultCount}명 / 아동 ${hotelChildCount}명`
    })

    btnHotelchooseRoombtn[0].addEventListener('click', e => {
        hotelRoomCount--;
        if (hotelRoomCount < 1) {
            hotelRoomCount = 1;
        }
        btnHotelchooseRoomSpan.textContent = hotelRoomCount;
    })
    btnHotelchooseRoombtn[1].addEventListener('click', e => {
        hotelRoomCount++;
        if (hotelRoomCount > 8) {
            hotelRoomCount = 8;
        }
        btnHotelchooseRoomSpan.textContent = hotelRoomCount;
    })
    btnHotelchooseAdultbtn[0].addEventListener('click', e => {
        hotelAdultCount--;
        if (hotelAdultCount < 1) {
            hotelAdultCount = 1;
        }
        btnHotelchooseAdultSpan.textContent = hotelAdultCount;
    })
    btnHotelchooseAdultbtn[1].addEventListener('click', e => {
        hotelAdultCount++;
        if (hotelAdultCount > 8) {
            hotelAdultCount = 8;
        }
        btnHotelchooseAdultSpan.textContent = hotelAdultCount;
    })
    btnHotelchooseChildbtn[0].addEventListener('click', e => {
        hotelChildCount--;
        if (hotelChildCount < 0) {
            hotelChildCount = 0;
        }
        btnHotelchooseChildSpan.textContent = hotelChildCount;
    })
    btnHotelchooseChildbtn[1].addEventListener('click', e => {
        hotelChildCount++;
        if (hotelChildCount > 8) {
            hotelChildCount = 8;
        }
        btnHotelchooseChildSpan.textContent = hotelChildCount;
    })


    let visualLeft = -600;
    let mainBannerCurrent = 1;
    let totalBannerImage = mainVisualBannerLi.length;
    let size = 600;
    let mainBannerisPlay = true;
    let mainBannerTimer = null;
    const mainBannerInterval = 3000;

    let FreeTravelListLeft = 0;

    const banner_index = () => {
        currentPage.innerHTML = `${mainBannerCurrent} / 7`;
    }
    const mainBanner_next = () => {
        mainVisualBanner.style.transition = '0.2s';
        mainBannerCurrent++;
        visualLeft -= 600;
        mainVisualBanner.style.left = visualLeft + 'px'
        if (mainBannerCurrent === 8) {
            mainBannerCurrent = 1;
            visualLeft = -600;
            setTimeout(() => {
                mainVisualBanner.style.transition = '0s';
                mainVisualBanner.style.left = visualLeft + 'px';
            }, 100);
        }
        banner_index();
        mainBanner_bg(mainBannerCurrent);
    }
    const mainBanner_prev = () => {
        mainVisualBanner.style.transition = '0.2s';
        mainBannerCurrent--;
        visualLeft += 600;

        mainVisualBanner.style.left = visualLeft + 'px'
        if (mainBannerCurrent === 0) {
            mainBannerCurrent = 7;
            visualLeft = -4200;
            setTimeout(() => {
                mainVisualBanner.style.transition = '0s';
                mainVisualBanner.style.left = visualLeft + 'px';
            }, 100);
        }
        banner_index();
        mainBanner_bg(mainBannerCurrent);
    }
    const mainBanner_bg = (idx) => {
        switch (idx) {
            case 1: mainVisual.style.background = 'skyblue'; break;
            case 2: mainVisual.style.background = '#70c7ca'; break;
            case 3: mainVisual.style.background = '#327ab4'; break;
            case 4: mainVisual.style.background = '#6e87da'; break;
            case 5: mainVisual.style.background = '#e6ec8d'; break;
            case 6: mainVisual.style.background = '#d1d1d1'; break;
            case 7: mainVisual.style.background = '#a75cef'; break;
        }
    }
    mainBannerTimer = setInterval(mainBanner_next, mainBannerInterval);

    mainBannerRollingBtn.addEventListener('click', e => {
        if (mainBannerisPlay) {
            mainBannerRollingBtn.children[0].classList.replace('xi-pause', 'xi-play');
            clearInterval(mainBannerTimer);
        } else {
            mainBannerRollingBtn.children[0].classList.replace('xi-play', 'xi-pause');
            mainBannerTimer = setInterval(mainBanner_next, mainBannerInterval);
        }
        mainBannerisPlay = !mainBannerisPlay;
    })

    btnVisualNext.addEventListener('click', e => {
        mainBanner_next();
        if (mainBannerisPlay) {
            clearInterval(mainBannerTimer);
            mainBannerTimer = setInterval(mainBanner_next, mainBannerInterval);
        }
    })
    btnVisualPrev.addEventListener('click', e => {
        mainBanner_prev();
        if (mainBannerisPlay) {
            clearInterval(mainBannerTimer);
            mainBannerTimer = setInterval(mainBanner_next, mainBannerInterval);
        }
    })

    btnFreeTravelNext.addEventListener('click', e => {
        FreeTravelListLeft -= 305;
        if (FreeTravelListLeft < -2460) { FreeTravelListLeft = -2440; }
        freeTravelList.style.left = FreeTravelListLeft + 'px';
    })

    btnFreeTravelPrev.addEventListener('click', e => {
        FreeTravelListLeft += 305;
        if (FreeTravelListLeft > 0) { FreeTravelListLeft = 0; }
        freeTravelList.style.left = FreeTravelListLeft + 'px';
    })
    ///////////////// 5월 15일 추가분 ///////////////////////

    let bestgoodsTimer = null;
    let bestgoodsidx = 0;
    const bestgoodsinterval = 3000;

    function bestgoodsRolling() {
        bestgoodsidx++;
        bestgoodsidx = bestgoodsidx % 3;
        bestGoodsNavLi.forEach(element => {
            element.classList.remove('on');
        })
        bestGoodsViewLi.forEach(element => {
            element.classList.remove('on');
        })
        bestGoodsNavLi[bestgoodsidx].classList.add('on');
        bestGoodsViewLi[bestgoodsidx].classList.add('on');
    }
    bestgoodsTimer = setInterval(bestgoodsRolling, bestgoodsinterval);


    bestGoodsNavLi.forEach((element, idx) => {
        element.addEventListener('click', e => {
            bestGoodsNavLi.forEach(element => {
                element.classList.remove('on');
            })
            bestGoodsViewLi.forEach(element => {
                element.classList.remove('on');
            })
            e.currentTarget.classList.add('on');
            bestGoodsViewLi[idx].classList.add('on');
            bestgoodsidx = idx;
            clearInterval(bestgoodsTimer);
            bestgoodsTimer = setInterval(bestgoodsRolling, bestgoodsinterval);
        })
    });

    //////////////////////////////////////////////////////////

    ///////////////// 5월 15일 추가분 ///////////////////////

    let recomendLeftTimer = null;
    let recomendLeftidx = 0;
    const recomendLeftinterval = 3000;

    function recomendLeftRolling() {
        recomendLeftidx++;
        recomendLeftidx = recomendLeftidx % 4;
        recommendLeftLi.forEach(element => {
            element.classList.remove('on');
        })
        recommendRightUl.forEach(element => {
            element.classList.remove('on');
        })
        recommendLeftLi[recomendLeftidx].classList.add('on');
        recommendRightUl[recomendLeftidx].classList.add('on');
    }
    recomendLeftTimer = setInterval(recomendLeftRolling, recomendLeftinterval);

    recommendLeftLi.forEach((element, idx) => {
        element.addEventListener('click', e => {
            recommendLeftLi.forEach(element => {
                element.classList.remove('on');
            })
            recommendRightUl.forEach(element => {
                element.classList.remove('on');
            })
            e.currentTarget.classList.add('on');
            recommendRightUl[idx].classList.add('on');
            recomendLeftidx = idx;
            clearInterval(recomendLeftTimer);
            recomendLeftTimer = setInterval(recomendLeftRolling, recomendLeftinterval);
        })
    });
    //////////////////////////////////////////////////////////
    // 비주얼 추천 예약 nav
    mainVisualSelectTabLi.forEach((element, idx) => {
        element.addEventListener('click', e => {
            mainVisualSelectTabLi.forEach(li => {
                li.classList.remove('on');
            })
            mainVisualSelectTabViewLi.forEach(li => {
                li.classList.remove('on');
            })
            e.currentTarget.classList.add('on');
            mainVisualSelectTabViewLi[idx].classList.add('on');
        })
    })

    let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
    let today = new Date();     // 페이지를 로드한 날짜를 저장
    today.setHours(0, 0, 0, 0);    // 비교 편의를 위해 today의 시간을 초기화

    buildCalendar();
    buildCalendar_Air();
    buildCalendar_Start();
    buildCalendar_End();

    function buildCalendar() {
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

        let tbody_Calendar = document.querySelector(".Calendar > tbody");
        document.getElementById("calYear").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
        document.getElementById("calMonth").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

        while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }

        let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

        for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
            let nowColumn = nowRow.insertCell();        // 열 추가
        }

        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

            let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

            if (nowDay.getDay() == 0) {
                nowColumn.style.color = 'red';
            }

            let newDIV = document.createElement("p");
            newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {
                nowColumn.style.color = 'blue';             // 토요일인 경우
                nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            }

            if (nowDay < today) {                       // 지난날인 경우
                newDIV.className = "pastDay";
            }
            else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                newDIV.className = "today";
                newDIV.onclick = function () { choiceDate(this); }
            }
            else {                    // 미래인 경우
                newDIV.className = "futureDay";
                newDIV.onclick = function () { choiceDate(this); }
            }
        }
    }

    function buildCalendar_Air() {
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

        let tbody_Calendar = document.querySelector(".Calendar_Air > tbody");
        document.getElementById("calYear_Air").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
        document.getElementById("calMonth_Air").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

        while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }

        let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

        for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
            let nowColumn = nowRow.insertCell();        // 열 추가
        }

        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

            let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

            if (nowDay.getDay() == 0) {
                nowColumn.style.color = 'red';
            }

            let newDIV = document.createElement("p");
            newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {
                nowColumn.style.color = 'blue';             // 토요일인 경우
                nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            }

            if (nowDay < today) {                       // 지난날인 경우
                newDIV.className = "pastDay";
            }
            else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                newDIV.className = "today";
                newDIV.onclick = function () { choiceDate(this); }
            }
            else {                       // 미래인 경우
                newDIV.className = "futureDay";
                newDIV.onclick = function () { choiceDate(this); }
            }
        }
    }
    function buildCalendar_Start() {
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

        let tbody_Calendar = document.querySelector(".Calendar_Start > tbody");
        document.getElementById("calYear_Start").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
        document.getElementById("calMonth_Start").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

        while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }

        let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

        for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
            let nowColumn = nowRow.insertCell();        // 열 추가
        }

        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

            let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

            if (nowDay.getDay() == 0) {
                nowColumn.style.color = 'red';
            }

            let newDIV = document.createElement("p");
            newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {
                nowColumn.style.color = 'blue';             // 토요일인 경우
                nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            }

            if (nowDay < today) {                       // 지난날인 경우
                newDIV.className = "pastDay";
            }
            else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                newDIV.className = "today";
                newDIV.onclick = function () { choiceDate(this); }
            }
            else {                       // 미래인 경우
                newDIV.className = "futureDay";
                newDIV.onclick = function () { choiceDate(this); }
            }
        }
    }
    function buildCalendar_End() {
        let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);     // 이번달 1일
        let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, 0);  // 이번달 마지막날

        let tbody_Calendar = document.querySelector(".Calendar_End > tbody");
        document.getElementById("calYear_End").innerText = nowMonth.getFullYear();             // 연도 숫자 갱신
        document.getElementById("calMonth_End").innerText = leftPad(nowMonth.getMonth() + 1);  // 월 숫자 갱신

        while (tbody_Calendar.rows.length > 0) {                        // 이전 출력결과가 남아있는 경우 초기화
            tbody_Calendar.deleteRow(tbody_Calendar.rows.length - 1);
        }

        let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가           

        for (let j = 0; j < firstDate.getDay(); j++) {  // 이번달 1일의 요일만큼
            let nowColumn = nowRow.insertCell();        // 열 추가
        }

        for (let nowDay = firstDate; nowDay <= lastDate; nowDay.setDate(nowDay.getDate() + 1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  

            let nowColumn = nowRow.insertCell();        // 새 열을 추가하고

            if (nowDay.getDay() == 0) {
                nowColumn.style.color = 'red';
            }

            let newDIV = document.createElement("p");
            newDIV.innerHTML = leftPad(nowDay.getDate());        // 추가한 열에 날짜 입력
            nowColumn.appendChild(newDIV);

            if (nowDay.getDay() == 6) {
                nowColumn.style.color = 'blue';             // 토요일인 경우
                nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
            }

            if (nowDay < today) {                       // 지난날인 경우
                newDIV.className = "pastDay";
            }
            else if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) { // 오늘인 경우           
                newDIV.className = "today";
                newDIV.onclick = function () { choiceDateEnd(this); }
            }
            else {                         // 미래인 경우
                newDIV.className = "futureDay";
                newDIV.onclick = function () { choiceDateEnd(this); }
            }
        }
    }


    let packageStartDate = null;
    let packageEndDate = null;
    // 날짜 선택
    function choiceDate(newDIV) {
        if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
            document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
        }
        newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가

        const selectedYear = nowMonth.getFullYear();
        const selectedMonth = nowMonth.getMonth();
        const selectedDay = parseInt(newDIV.innerHTML);


        const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

        let selectedStartDate = new Date(selectedDate);
        let dateForm = selectedStartDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        });
        packageStartDate = dateForm;
        startTravelDateSpan.textContent = packageStartDate;
        startTravelDateSpanAir.textContent = packageStartDate;
        startTravelDateSpanHotel.textContent = packageStartDate;
        startTravelDate.classList.remove('on');
        startTravelDateAir.classList.remove('on');
        startTravelDateHotel.classList.remove('on');
        startTravelCalendar.classList.remove('on');
        startTravelCalendarAir.classList.remove('on');
        startTravelCalendarHotel.classList.remove('on');
    }

    function choiceDateEnd(newDIV) {
        if (document.getElementsByClassName("choiceDay")[0]) {                              // 기존에 선택한 날짜가 있으면
            document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");  // 해당 날짜의 "choiceDay" class 제거
        }
        newDIV.classList.add("choiceDay");           // 선택된 날짜에 "choiceDay" class 추가

        const selectedYear = nowMonth.getFullYear();
        const selectedMonth = nowMonth.getMonth();
        const selectedDay = parseInt(newDIV.innerHTML);


        const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

        let selectedStartDate = new Date(selectedDate);
        let dateForm = selectedStartDate.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'short'
        });
        packageEndDate = dateForm;

        endTravelDateSpanHotel.textContent = packageEndDate;
        endTravelDateHotel.classList.remove('on');
        endTravelCalendarHotel.classList.remove('on');
    }

    // 달력 보이기 or 안보이기 패키지
    startTravelDate.addEventListener('click', e => {
        startTravelDate.classList.toggle('on');
        startTravelCalendar.classList.toggle('on');
    })
    // 달력 보이기 or 안보이기 항공
    startTravelDateAir.addEventListener('click', e => {
        startTravelDate.classList.toggle('on');
        startTravelCalendarAir.classList.toggle('on');
    })

    // 이전달 버튼 클릭
    // function prevCalendar() {
    //     nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
    //     buildCalendar();    // 달력 다시 생성
    //     buildCalendar_Air();    // 달력 다시 생성
    //     buildCalendar_Start();    // 달력 다시 생성
    //     buildCalendar_End();    // 달력 다시 생성
    // }

    const mainPackageTabCalendarPrev = get('.startTravelCalendar .Calendar thead tr td:nth-child(1)');
    const mainPackageTabCalendarNext = get('.startTravelCalendar .Calendar thead tr td:nth-child(3)');
    const mainAirTabCalendarPrev = get('.startTravelCalendarAir .Calendar_Air thead tr td:nth-child(1)');
    const mainAirTabCalendarNext = get('.startTravelCalendarAir .Calendar_Air thead tr td:nth-child(3)');
    const mainHotelStartTabCalendarPrev = get('.startTravelCalendarStart .Calendar_Start thead tr td:nth-child(1)');
    const mainHotelStartTabCalendarNext = get('.startTravelCalendarStart .Calendar_Start thead tr td:nth-child(3)');
    const mainHotelEndTabCalendarPrev = get('.startTravelCalendarEnd .Calendar_End thead tr td:nth-child(1)');
    const mainHotelEndTabCalendarNext = get('.startTravelCalendarEnd .Calendar_End thead tr td:nth-child(3)');

    mainPackageTabCalendarPrev.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
        buildCalendar();    // 달력 다시 생성
    })
    mainPackageTabCalendarNext.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
        buildCalendar();
    })

    mainAirTabCalendarPrev.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
        buildCalendar_Air();    // 달력 다시 생성
    })
    mainAirTabCalendarNext.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
        buildCalendar_Air();    // 달력 다시 생성
    })
    mainHotelStartTabCalendarPrev.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
        buildCalendar_Start();    // 달력 다시 생성
    })
    mainHotelStartTabCalendarNext.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
        buildCalendar_Start();    // 달력 다시 생성
    })
    mainHotelEndTabCalendarPrev.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() - 1, nowMonth.getDate());   // 현재 달을 1 감소
        buildCalendar_End();    // 달력 다시 생성
    })
    mainHotelEndTabCalendarNext.addEventListener('click', e => {
        nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
        buildCalendar_End();    // 달력 다시 생성
    })

    // 다음달 버튼 클릭
    // function nextCalendar() {
    //     nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth() + 1, nowMonth.getDate());   // 현재 달을 1 증가
    //     buildCalendar();
    //     buildCalendar_Air();    // 달력 다시 생성
    //     buildCalendar_Start();    // 달력 다시 생성
    //     buildCalendar_End();    // 달력 다시 생성
    // }

    // input값이 한자리 숫자인 경우 앞에 '0' 붙혀주는 함수
    function leftPad(value) {
        if (value < 10) {
            value = "0" + value;
            return value;
        }
        return value;
    }

    // 패키지1 어디로 갈지 선택
    whereToGo.addEventListener('click', e => {
        whereToTravel.classList.toggle('on');
        startTravelDepart.classList.remove('on');
        startSelectDepartUl.classList.remove('on');
        startTravelDate.classList.remove('on');
        startTravelCalendar.classList.remove('on');
        // startTravelDate.classList.remove('on');
        // 리무브 all 함수 제작 필요 예상
    })

    whereToTravelulLi.forEach(element => {
        element.addEventListener('click', e => {
            let whereToGoTxt = e.currentTarget.textContent;
            whereToGo.value = whereToGoTxt;
            whereToTravel.classList.toggle('on');
        })
    })

    // 달력 보이기 or 안보이기 Start / End
    startTravelDateHotel.addEventListener('click', e => {
        startTravelDateHotel.classList.toggle('on');
        startTravelCalendarHotel.classList.toggle('on');
        endTravelDateHotel.classList.remove('on');
        endTravelCalendarHotel.classList.remove('on');
    })

    endTravelDateHotel.addEventListener('click', e => {
        endTravelDateHotel.classList.toggle('on');
        endTravelCalendarHotel.classList.toggle('on');
        startTravelDateHotel.classList.remove('on');
        startTravelCalendarHotel.classList.remove('on');
    })

    // 항공권 항공사 선택
    howToGo.addEventListener('click', e => {
        howToGoAir.classList.toggle('on');
        startSelectDepartUl_air.classList.remove('on');
        startTravelDepart_air.classList.remove('on');
        startTravelDateAir.classList.remove('on');
        startTravelCalendarAir.classList.remove('on');
    })

    howToGoAirUlLi.forEach(element => {
        element.addEventListener('click', e => {
            let howToGoTxt = e.currentTarget.textContent;
            howToGo.value = howToGoTxt;
            howToGoAir.classList.toggle('on');
        })
    })

    // 출발 공항 선택
    startTravelDepart.addEventListener('click', e => {
        e.currentTarget.classList.toggle('on');
        startSelectDepartUl.classList.toggle('on');
    })
    startSelectDepartList.forEach(element => {
        element.addEventListener('click', e => {
            startTravelDepart.classList.toggle('on');
            startSelectDepartUl.classList.toggle('on');
            let startDepartTxt = e.currentTarget.textContent;
            startTravelDepartSpan.textContent = startDepartTxt + ' 출발';
        })
    })

    startTravelDepart_air.addEventListener('click', e => {
        e.currentTarget.classList.toggle('on');
        startSelectDepartUl_air.classList.toggle('on');
    })

    startSelectDepartList_air.forEach(element => {
        element.addEventListener('click', e => {
            startTravelDepart_air.classList.toggle('on');
            startSelectDepartUl_air.classList.toggle('on');
            let startDepartTxt = e.currentTarget.textContent;
            startTravelDepartSpan_air.textContent = startDepartTxt + ' 출발';
        })
    })

    // 항공권은 있어요
    btnHaveAir.addEventListener('click', e => {
        e.currentTarget.classList.toggle('off');
        startTravelDepart.classList.toggle('off');
    })
    btnHaveAir_air.addEventListener('click', e => {
        e.currentTarget.classList.toggle('off');
        startTravelDepart_air.classList.toggle('off');
    })

    // 우리끼리만 여행할래요
    btnOnlyTeam.addEventListener('click', e => {
        e.currentTarget.classList.toggle('off');
    })
    btnOnlyTeam_air.addEventListener('click', e => {
        e.currentTarget.classList.toggle('off');
    })
}

function common() {
    let $links = getAll('a[href="#"]');
    $links.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
        })
    })
}

function mainInit() {
    header();
    common();
    if (location.pathname.split('/').pop() == 'index.html') {
        index();
    }
    if (location.pathname.split('/').pop() == 'rent.html') {
        rent();
    }
    if (location.pathname.split('/').pop() == 'notice.html') {
        notice();
    }
    if (location.pathname.split('/').pop() == 'qna.html') {
        qna();
    }
    if (location.pathname.split('/').pop() == 'hotel.html') {
        hotel();
    }
    if (location.pathname.split('/').pop() == "join.html") {
        join();
    }
    if (location.pathname.split('/').pop() == 'airport.html') {
        air();
    }
    if (location.pathname.split('/').pop() == "promotion.html") {
        prom();
    }
    if (location.pathname.split("/").pop() == "package.html") {
        pack();
    }
    if (
        location.pathname.split("/").pop() == "museum.html" ||
        location.pathname.split("/").pop() == "active.html" ||
        location.pathname.split("/").pop() == "food.html"
    ) {
        tour();
    }
}

(() => {
    mainInit();
})();