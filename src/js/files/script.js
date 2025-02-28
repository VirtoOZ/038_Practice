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

	//<CARDS>=================================
	class Card {
		constructor(img, altimg, title, descr, price) {
			this.img = img;
			this.altimg = altimg;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.valuta;
			this.place = document.querySelector('.menu .container');
			this.kurs = 60;
			this.isUSD = true;
			this.converToUsd();
		}
		converToUsd() {
			if (!this.isUSD) {
				this.price;
				this.valuta = 'usd/День'
			} else {
				this.valuta = 'руб/День'
				this.price *= this.kurs;
			}
		}
		render() {
			const element = document.createElement('div');
			element.classList.add('menu__item');
			element.innerHTML =
				`<img src="${this.img}" alt="${this.altimg}">
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> ${this.valuta}</div>
				</div>`;
			this.place.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url)
		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};
	getResource('http://localhost:3000/menu')
		.then(data => {
			// в таком случае правильным решением будет воспользоваться деструктуризацией
			data.forEach(({ img, altimg, title, descr, price }) => {
				new Card(img, altimg, title, descr, price).render();
			});
		});
	// constructor(img, altimg, title, descr, price, isUSD = true) {


	//</CARDS>=================================

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

			/* Запрос c помощью XMLHttpRequest
			const request = new XMLHttpRequest();
			request.open('POST', 'server.php', true, 'vscode', '0300');
			request.setRequestHeader('Content-Type', 'aplication/json', 'charset=utf8');
			request.setRequestHeader('Content-Type', 'multipart/form-data', 'charset=utf8');
			*/

			let formData = new FormData(e.target);

			// преобразовать в json
			/* // перебором
			const object = {};
				formData.forEach((value, key) => {
					object[key] = value;
				}); */

			// более эстетическое решение chein c помощью entries 
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			//<PROMISE + FETCH>=================================
			// Fetch запрос POST
			const postData = async (url, data) => {
				// важно fetch помещать в переменную, т.к. функция будет возвращать promise
				const result = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'aplication/json',
					},
					body: data,
				})
				// вернётся promise в jsone перевод в json может потребовать времени, 
				// по этому нужен await (дождаться когда произойжёт действие)
				return await result.json();
			};
			// после вызова нельзя стваить ; тк вызов возвращает 
			// promise который далее отбрабатывается цепочкой then
			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showRequestModal(messages.sucsess);
					statusMessage.remove();
				})
				.catch(() => {
					showRequestModal(messages.failure);
				})
				.finally(() => {
					e.target.reset();
				});
			//</PROMISE + FETCH>=================================

			/*  Запрос c помощью XMLHttpRequest()
			request.send(json);
			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showRequestModal(messages.sucsess);
					e.target.reset();
				} else {
					showRequestModal(messages.failure);
				}
			}) */
		}
		//<054>=================================
		function showRequestModal(messages) {
			showModal();
			const modalDialog = document.querySelector('.modal__dialog');
			modalDialog.classList.add('hide');
			const modalNewDialog = document.createElement('div');
			modalNewDialog.classList.add('modal__dialog');
			modalNewDialog.innerHTML =
				`<div class="modal__content">
					<div data-close class="modal__close">×</div>
					<div class="modal__title">${messages}</div>
				</div>`;
			modalDialog.insertAdjacentElement('afterEnd', modalNewDialog);
			setTimeout(() => {
				hideModal();
				modalDialog.classList.remove('hide');
				modalNewDialog.remove();
			}, 3000);
		}
		//<054>=================================
	})
	//</FORMS>=================================
});
