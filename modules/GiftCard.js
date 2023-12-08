import DATE from '../constants/date.js';

class Gift extends HTMLElement {
  connectedCallback() {
    for (let i = DATE.startDate; i <= DATE.endDate; i++) {
      // div.day-1 요소 생성
      const dayContainer = document.createElement('div');
      dayContainer.classList.add(`day-${i}`);

      // label 요소 생성
      const label = document.createElement('label');

      // input 요소 생성
      const checkbox = document.createElement('input');
      checkbox.setAttribute('type', 'checkbox');

      // div.door 요소 생성
      const door = document.createElement('div');
      door.classList.add('door');

      // div.front 요소 생성
      const front = document.createElement('div');
      front.classList.add('front');

      // span.date-num 요소 생성
      const dateNum = document.createElement('span');
      dateNum.classList.add('date-num');
      dateNum.textContent = i; // 숫자 설정

      // span.date-num을 div.front에 추가
      front.appendChild(dateNum);

      // div.back 요소 생성
      const back = document.createElement('div');
      back.classList.add('back');

      // div.front과 div.back을 div.door에 추가
      door.appendChild(front);
      door.appendChild(back);

      // div.door를 label에 추가
      label.appendChild(checkbox);
      label.appendChild(door);

      // label을 div.day-1에 추가
      dayContainer.appendChild(label);

      const gridElement = document.querySelector('.grid-1');
      gridElement.appendChild(dayContainer);
    }
  }
}
customElements.define('data-gift', Gift);
