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
		const et = e.target.closest('.tabheader__item');
		if (et) {
			tabHeaderItems.forEach((el, i) => {
				if (el == et) {
					hideTabs();
					showTabs(i);
				}
			});
		}
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
	// Конструктор карточек
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

	// GET запрос данных JSON для постоения карточек 
	const getResource = async (url) => {
		const res = await fetch(url)
		if (!res.ok) {
			throw new Error(`Couldn't fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		// в таком случае правильным решением будет воспользоваться деструктуризацией
	// 		data.forEach(({ img, altimg, title, descr, price }) => {
	// 			new Card(img, altimg, title, descr, price).render();
	// 		});
	// 	});
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

	// function statusModal(element) {
	// 	const dispStatus = window.getComputedStyle(element);
	// 	if (dispStatus.display == 'none') {
	// 		showModal(element);
	// 	}
	// 	else hideModal(element);
	// }

	// const modalTimerId = setTimeout(showModal, 15000);

	function showModal(element = modal) {
		element.classList.add('show', 'fade');
		document.body.style.overflow = 'hidden';
		// clearInterval(modalTimerId);

	}
	function hideModal(element = modal) {
		element.classList.remove('show', 'fade');
		document.body.style.overflow = '';
	}
	document.addEventListener("click", (e) => {
		const et = e.target;
		if (et.closest('[data-modal]')) {
			showModal();
		}
		if (modal.classList.contains('show') && et.closest('.modal') || et.classList.contains('modal__close')) {
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

	//<SLIDER>=================================
	const slider = document.querySelector('.offer__slider'),
		sliderCurrDigits = slider.querySelector('#current'),
		sliderTotalDigits = slider.querySelector('#total'),
		slides = slider.querySelectorAll('.offer__slide'),
		total = slides.length,
		sliderWrapper = slider.querySelector('.offer__slider-wrapper'),
		sliderBody = slider.querySelector('.offer__slider-body'),
		slideWidth = parseInt(window.getComputedStyle(sliderWrapper).width),
		paginationBody = document.createElement('ol');
	let currSlide = 0,
		currentWidth = 0;



	//<СЛАЙДЕР C СДВИГОМ>=================================
	sliderBody.style.cssText = `
		width: ${slideWidth * total}px;
		transition: transform 0.3s ease 0s;
	`;

	const shiftSlide = (position, sign = '') => sliderBody.style.transform = `translateX(${sign}${position}px)`;
	shiftSlide(currentWidth);

	// Первоначальное выставление текущего слайда
	function initSlider() {
		sliderTotalDigits.innerHTML = addZero(slides.length);
		computeCurrent();

		paginationBody.classList.add('carousel-indicators');
		slider.style.position = 'relative';
		slider.append(paginationBody);

		slides.forEach((el, i) => {
			const dot = document.createElement('li');
			dot.classList.add('dot');
			dot.setAttribute('data-slide-to', i);
			paginationBody.append(dot);
			// первоначально выделить активной пагинацию
			if (i == currSlide) {
				dot.style.opacity = 1;
			}
		});
	}
	initSlider();

	// Корректировка диапазона пагинации
	function computeCurrent() {
		currSlide > total - 1 ? currSlide = 0 : '';
		currSlide < 0 ? currSlide = total - 1 : '';
		sliderCurrDigits.textContent = addZero(currSlide + 1);
	}

	// Делигирование и навешевание собитий на кнопки
	const dots = paginationBody.querySelectorAll('.dot');

	slider.addEventListener('click', (e) => {
		const et = e.target;
		// отлавливанием нажатие next
		if (et.closest('.offer__slider-next')) {
			currSlide++;

			currentWidth += slideWidth;
			computeCurrent();
			if (currentWidth == slideWidth * total) {
				currentWidth = 0;
				shiftSlide(currentWidth);
			}
			shiftSlide(currentWidth, '-');
			shiftPags();
		}
		// отлавливанием нажатие prev
		if (et.closest('.offer__slider-prev')) {
			currSlide--;
			computeCurrent();
			currentWidth -= slideWidth;
			if (currentWidth < 0) {
				currentWidth = slideWidth * total - slideWidth;
				shiftSlide(currentWidth);
			}
			shiftSlide(currentWidth, '-');
			shiftPags();
		}
		// отлавливанием нажатие на пагинацию
		if (et.closest('.dot')) {
			shiftPags(0);
		}

		// движение активности пагинации
		function shiftPags(mode = 1) {
			dots.forEach(el => {
				let forSlide = undefined;
				if (mode == 0) {
					forSlide = et == el;
				} else if (mode == 1) {
					forSlide = +el.getAttribute('data-slide-to') == currSlide;
				}
				if (forSlide) {
					el.style.opacity = 1;
					currSlide = +el.getAttribute('data-slide-to');
					computeCurrent();
					currentWidth = slideWidth * currSlide;
					shiftSlide(currentWidth, '-');
				} else el.style.opacity = 0.5;
			});
		}
	})
	/* //<ПРОСТОЙ ВАРИАНТ СЛАЙДЕРА>=================================
		// Первоначальное выставление текущего слайда
		function initSlider() {
			sliderTotalDigits.innerHTML = addZero(slides.length);
			computeCurrent();
			slides[currSlide].classList.add('active');
		}
		initSlider();
	
		// Обработка и скрытие не текущего слайда
		function showOrHideSlide() {
			slides.forEach((el, i) => {
				if (i == currSlide) {
					el.classList.add('active');
				} else el.classList.remove('active');
			})
		}
	
		// Корректировка диапазона
		function computeCurrent() {
			currSlide > total - 1 ? currSlide = 0 : '';
			currSlide < 0 ? currSlide = total - 1 : '';
			sliderCurrDigits.textContent = addZero(currSlide + 1);
		}
	
		// Делигирование и навешевание собитий на кнопки
		sliderCounter.addEventListener('click', (e) => {
			const et = e.target;
			// отлавливанием нажатие next
			if (et.closest('.offer__slider-next')) {
				currSlide++;
				computeCurrent();
				showOrHideSlide();
			}
			// отлавливанием нажатие prev
			if (et.closest('.offer__slider-prev')) {
				currSlide--;
				computeCurrent();
				showOrHideSlide();
			}
		})
	//<ПРОСТОЙ ВАРИАНТ СЛАЙДЕРА>=================================// 
	 */
	//</SLIDER>=================================

	//<CALC>=================================
	const calculatingParent = document.querySelector('.calculating__field'),
		female = calculatingParent.querySelector('#female'),
		male = calculatingParent.querySelector('#male'),
		lowAct = calculatingParent.querySelector('#low'),
		smallAct = calculatingParent.querySelector('#small'),
		mediumAct = calculatingParent.querySelector('#medium'),
		highAct = calculatingParent.querySelector('#high');
	// height = calculatingParent.querySelector('#height'),
	// weight = calculatingParent.querySelector('#weight'),
	// age = calculatingParent.querySelector('#age');
	let result = calculatingParent.querySelector('.calculating__result span'),
		sex, ratio, height, weight, age;

	calculatingParent.addEventListener('click', (e) => {
		const et = e.target;
		function clearActive(parentArr) {
			const element = document.querySelectorAll(`${parentArr} div`);
			element.forEach(el => {
				el.classList.remove('calculating__choose-item_active');
			});
		}

		function setActive(condition, selector, sexGender = 1) {
			if (condition) {
				if (!et.classList.contains('calculating__choose-item_active')) {
					clearActive(selector);
					et.classList.add('calculating__choose-item_active');
					sexGender ? sex = et.getAttribute('id') : ratio = +et.getAttribute('data-activity');
					// console.log(sex, ratio);
				}
			}
		}

		setActive(et == female || et == male, '.calculating__choose#gender');
		setActive(et.closest('.calculating__choose_big'), '.calculating__choose_big', 0);
		totalCalc();
	})

	calculatingParent.addEventListener('input', (e) => {
		const et = e.target;
		function setInput(selector, element) {
			if (et.closest(selector) && et.value.match(/\d/)) {
				element = +et.value.match(/\d/g).join('');
				console.log(element);
			}
		}

		// setInput('#height', height);
		// setInput('#weight', weight);
		// setInput('#age', age);


		if (et.closest('#height') && et.value.match(/\d/)) {
			height = +et.value.match(/\d/g).join('');
		}
		if (et.closest('#weight') && et.value.match(/\d/)) {
			weight = +et.value.match(/\d/g).join('');
		}
		if (et.closest('#age') && et.value.match(/\d/)) {
			age = +et.value.match(/\d/g).join('');
		}
		totalCalc();
	})

	function totalCalc() {
		console.log(sex, ratio, height, weight, age);
		if (!sex || !ratio || !height || !weight) {
			result.textContent = '^____^';
			return;
		}
		if (sex == 'female') {
			result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
		} else {
			result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
		}
	}
	totalCalc();
	//<CALC>=================================
});
// npx json-server src/files/db.json