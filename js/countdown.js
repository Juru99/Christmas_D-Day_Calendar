import DATE from '../constants/date.js';
import MODAL_MESSAGES from '../constants/modalMessages.js';
import TIME from '../constants/time.js';
import { showModal } from './showModal.js';

// 목표 날짜 설정 (예시: 2023년 1월 1일)
const targetDate = new Date(DATE.targetDate);

function updateCountdown() {
  // 현재 한국 시간을 얻어오기
  const now = new Date(
    new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
  );

  // 남은 시간 계산
  const timeRemaining = targetDate - now;

  // 시간, 분, 초 계산
  const days = Math.floor(timeRemaining / TIME.value.day);
  const hours = Math.floor((timeRemaining % TIME.value.day) / TIME.value.hour);
  const minutes = Math.floor(
    (timeRemaining % TIME.value.hour) / TIME.value.minute
  );
  const seconds = Math.floor(
    (timeRemaining % TIME.value.second) / TIME.unit.oneSecond
  );

  // 결과를 HTML에 업데이트
  const countdownElement = document.getElementById('countdown');
  countdownElement.style.color = '#FF9EA9';
  countdownElement.innerHTML = `
      <span>D-${days} ${hours}시간${minutes}분${seconds}초</span>`;
}
// 페이지 로드 시에도 업데이트 수행
updateCountdown();

// 1초마다 업데이트
setInterval(updateCountdown, TIME.unit.oneSecond);

// 날짜 기준 카드 오픈 기능
const doors = document.querySelectorAll('.door');
doors.forEach((door, index) => {
  door.addEventListener('click', () => {
    // 현재 한국 시간을 얻어오기
    const now = new Date(
      new Date().toLocaleString('en-US', { timeZone: 'Asia/Seoul' })
    );

    // 각 날짜에 해당하는 날짜를 계산
    const openDate = new Date(DATE.year, DATE.month, index + DATE.startDate); // 2023년 12월 1일부터 시작

    // 현재 날짜가 열 수 있는 날짜 이후인지 확인
    if (now.getTime() > openDate.getTime()) {
      // 여기에 모달을 열거나 특정 동작을 수행하는 코드 추가

      // 상위 div의 class 번호를 찾아서 image url에 사용합니다
      const imageUrl = `assets/images/card/card-${index + 1}.png`;
      const text = MODAL_MESSAGES[index]['message'];

      door.style.transform = 'rotateY(180deg)';

      // showModal 함수를 호출하여 모달을 표시합니다.
      showModal(imageUrl, text);
      // alert('이벤트 캘린더를 엽니다.');
    } else {
      // 현재 날짜가 열 수 있는 날짜보다 이전인 경우 몇 일 후에 열 수 있다는 메시지를 표시
      const daysRemaining = Math.ceil((openDate - now) / TIME.value.day);
      alert(`이 카드는 ${daysRemaining}일 후에 열 수 있어요!`);
    }
  });
});
