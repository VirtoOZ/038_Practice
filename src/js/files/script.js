// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

document.addEventListener("DOMContentLoaded", (e) => {
	//<>=================================
	// const tabHeaderItemO = document.querySelector('.tabheader__items');
	// const tabContentO = document.querySelector('.tabcontainer');
	// tabHeaderItemO.insertAdjacentHTML('beforeend', '<div class="tabheader__item">Постное</div>');
	// tabContentO.insertAdjacentHTML('afterbegin', `<div class="tabcontent hide">
	// 						<img src="img/tabs/post.jpg" alt="post">
	// 						<div class="tabcontent__descr">
	// 							Наше специальное “Постное меню” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения. Полная гармония с собой и природой в каждом элементе! Все будет Ом!
	// 						</div>
	// 					</div>`);
	//</>=================================

	//<TABS>=================================
	const tabContents = document.querySelectorAll('.tabcontent');
	const tabHeaderItems = document.querySelectorAll('.tabheader__item');
	const tabHeaderItem = document.querySelector('.tabheader__items');

	// скрыть контент и заголовок таба 
	function hideTabs() {
		tabContents.forEach(el => {
			el.classList.add('hide');
			el.classList.remove('show', 'fade');
		});
		tabHeaderItems.forEach(el => {
			el.classList.remove('tabheader__item_active');
		});
	}

	// показать контент и акивный заголовок таба 
	function showTabs(i = 0) {
		tabContents[i].classList.add('show', 'fade');
		tabContents[i].classList.remove('hide');
		tabHeaderItems[i].classList.add('tabheader__item_active');
	}

	// мой вариант
	tabHeaderItem.addEventListener("click", (e) => {
		const et = e.target;
		tabHeaderItems.forEach((el, i) => {
			if (el == et) {
				hideTabs();
				showTabs(i);
			}
		});
	});

	// вариант из урока
	// tabHeaderItem.addEventListener("click", (e) => {
	// 	const et = e.target;
	// 	if (et && et.classList.contains('tabheader__item')) {
	// 		tabHeaderItems.forEach((el, i) => {
	// 			if (et == el) {
	// 				hideTabs();
	// 				showTabs(i);
	// 			}
	// 		});
	// 	}
	// });

	// первоначально сброс состояний
	hideTabs();
	showTabs();
	//</TABS>=================================

	//<TIMER>=================================
	const dedLine = '2025-04-07';

	// форматирование, добавить 0 если число меньше 10
	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else return num;
	}

	// получаем объект с вычисленными данными оставшегося времени
	function getTimeLeft(time) {
		// будущую дату которая больше отнимаем текущую
		const t = Date.parse(time) - new Date().getTime(),
			days = Math.floor(t / (1000 * 60 * 60 * 24)),
			hours = Math.floor(t / (1000 * 60 * 60) % 24),
			minutes = Math.floor(t / (1000 * 60) % 60),
			seconds = Math.floor(t / (1000) % 60);

		return {
			'total': t,
			'days': addZero(days),
			'hours': addZero(hours),
			'minutes': addZero(minutes),
			'seconds': addZero(seconds),
		}
	}

	function setClock(selector, endtime) {
		const time = document.querySelector(selector),
			days = time.querySelector('#days'),
			hours = time.querySelector('#hours'),
			minutes = time.querySelector('#minutes'),
			seconds = time.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		updateClock(); //при загрузке фиксим убираем задержку обновления цифр

		// записываем на страницу данные из расчитанного объекта
		function updateClock() {
			const t = getTimeLeft(endtime);
			days.innerHTML = t.days;
			hours.innerHTML = t.hours;
			minutes.innerHTML = t.minutes;
			seconds.innerHTML = t.seconds;

			// если время уже закочилось
			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	setClock('.timer', dedLine);
	//<TIMER>=================================

	//<MODAL>=================================
	const modal = document.querySelector('.modal');
	const btns = document.querySelectorAll('[data-modal]');
	const btnsClose = document.querySelector('[data-close]');

	// function statusModal(element) {
	// 	const dispStatus = window.getComputedStyle(element);
	// 	if (dispStatus.display == 'none') {
	// 		showModal(element);
	// 	}
	// 	else hideModal(element);
	// }

	const modalTimerId = setTimeout(showModal, 15000);

	function showModal(element = modal) {
		element.classList.add('show', 'fade');
		// element.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);

	}
	function hideModal(element = modal) {
		element.classList.remove('show', 'fade');
		document.body.style.overflow = '';
	}
	document.addEventListener("click", (e) => {
		const et = e.target;
		if (!!et.closest('[data-modal]')) {
			showModal();
		}
		if (modal.classList.contains('show') && et == modal || et.classList.contains('modal__close')) {
			hideModal();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			hideModal();
		}
	},);
	//</MODAL>=================================

	//<SCROLL>=================================
	const endDoc = document.documentElement.getBoundingClientRect().top;

	function showModalByScroll() {
		const scrollFromTop = document.documentElement.scrollTop;
		if (scrollFromTop + endDoc == 0) {
			showModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
	//</SCROLL>=================================

	//<FORMS>=================================
	const forms = document.querySelectorAll('form');

	const messages = {
		vaiting: 'img/form/spinner.svg',
		sucsess: 'Данные успешно отправлены!',
		failure: 'Что-то пошло не так!',
	};

	document.addEventListener('submit', e => {
		e.preventDefault();

		const statusMessage = document.createElement('img');
		statusMessage.src = messages.vaiting;
		statusMessage.style.cssText = `display: block; margin: 0 auto;`;
		e.target.insertAdjacentElement('afterend', statusMessage);

		if (e.target.localName == 'form') {
			const request = new XMLHttpRequest();
			request.open('POST', 'server.php', true, 'vscode', '0300');
			request.setRequestHeader('Content-Type', 'aplication/json', 'charset=utf8');
			// request.setRequestHeader('Content-Type', 'multipart/form-data', 'charset=utf8');
			let formData = new FormData(e.target);

			// преобразовать в json
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});
			const json = JSON.stringify(object);

			request.send(json);
			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showRequestModal(messages.sucsess);
					e.target.reset();
				} else {
					showRequestModal(messages.failure);
				}
			})
		}
		//<054>=================================
		function showRequestModal(messages) {
			showModal();
			const modalDialog = document.querySelector('.modal__dialog');
			modalDialog.classList.add('hide');
			const modalNewDialog = document.createElement('div');
			modalNewDialog.classList.add('modal__dialog');
			modalNewDialog.innerHTML = `
		<div class="modal__content">
			<div data-close class="modal__close">×</div>
			<div class="modal__title">${messages}</div>
		</div>`;
			modalDialog.insertAdjacentElement('afterEnd', modalNewDialog);
			setTimeout(() => {
				hideModal();
				modalDialog.classList.remove('hide');
				modalNewDialog.remove();
				statusMessage.remove();
			}, 3000);
		}
		//<054>=================================
	})
	//</FORMS>=================================
});