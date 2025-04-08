function slider() {

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

	// форматирование, добавить 0 если число меньше 10
	function addZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else return num;
	}

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
}

export default slider;