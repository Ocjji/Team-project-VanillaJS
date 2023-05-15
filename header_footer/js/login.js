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
