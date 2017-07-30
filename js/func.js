/**
 * @author : console.log
 * @date : 2011.05.08.
 */

function pageload() {
	// 네트워크가 온라인인지 오프라인인지 확인
	// 네트워크가 온라인이라면
	if (window.navigator.onLine) {
		// HTML5 지원여부 체크
		htmlLevel();
	}
	// 네트워크가 오프라인이라면
	else {
		// HTML5 지원여부 체크
		htmlLevel();
	}

	// 오프라인에서 온라인으로 전환될 때 발생하는 이벤트
	window.addEventListener('online', function() {
		// 만일을 대비해, 즉시 메모 내용을 Local Storage에 저장
		saveTxt();
	});

	// 온라인에서 오프라인으로 전환될 때 발생하는 이벤트
	window.addEventListener('offline', function() {
		// 만일을 대비해, 즉시 메모 내용을 Local Storage에 저장
		saveTxt();
	});
};

function htmlLevel() {
	// HTML5 미지원시
	if (!window.localStorage) {
		document.write('<p>이 브라우저는 Local Storage를 지원하지 않습니다.</p>');
		document.write('<p>최신 브라우저로 업그레이드 해주세요.</p>');
	}
	// HTML5 지원시
	// Local Storage에 저장된 내용을 읽어옴
	else {
		msg = document.getElementById('txtBox');	// textarea를 msg 변수에 담음
		
		memo_content = localStorage.getItem('memo');	// Local Storage에 저장된 텍스트 내용 불러옴
		memo_time = localStorage.getItem('time');		// Local Storage에 저장된 시간정보 불러옴
		
		// Local Storage에 저장된 내용이 있다면 텍스트 내용과 시간정보 출력
		if (memo_time != null) {
			msg.value = memo_content;
			info.innerText = memo_time + '에 저장되었습니다.';
		}
	}
};

// 메모 내용 저장
function saveTxt() {
	// 저장시간 정보 세팅
	var date = new Date();
	var year = date.getFullYear();
	var month = (date.getMonth() + 1) + '';
	if (month.length == 1) {
		month = '0' + month;
	}
	var day = date.getDate() + '';
	if (day.length == 1) {
		day = '0' + day;
	}
	var hour = date.getHours() + '';
	if (hour.length == 1) {
		hour = '0' + hour;
	}
	var min = date.getMinutes() + '';
	if (min.length == 1) {
		min = '0' + min;
	}
	var sec = date.getSeconds() + '';
	if (sec.length == 1) {
		sec = '0' + sec;
	}

	var time = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec;
	info = document.getElementById('info');		// <p>를 info 변수에 담음
	msg = document.getElementById('txtBox');	// textarea를 msg 변수에 담음
	localStorage.setItem('memo', msg.value);	// Local Storage에 텍스트 내용 저장
	localStorage.setItem('time', time);			// Local Storage에 시간 저장
	info.innerText = time + '에 저장되었습니다.';	// 저장 안내문구 세팅
	info.style.display = 'block';				// 저장 안내문구 노출
};

// 로컬 스토리지 내용을 비움
function clr() {
	msg = document.getElementById('txtBox');	// textarea를 msg 변수에 담음
	msg.value = '';					// textarea를 비움
	localStorage.clear();			// 로컬 스토리지를 비움
	info.style.display = 'none';	// 저장 안내문구를 감춤
};
