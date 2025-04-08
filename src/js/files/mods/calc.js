function calc() {

	const calculatingParent = document.querySelector('.calculating__field'),
		female = calculatingParent.querySelector('#female'),
		male = calculatingParent.querySelector('#male'),
		lowAct = calculatingParent.querySelector('#low'),
		smallAct = calculatingParent.querySelector('#small'),
		mediumAct = calculatingParent.querySelector('#medium'),
		highAct = calculatingParent.querySelector('#high');
	let result = calculatingParent.querySelector('.calculating__result span'),
		sex = 'female', ratio = 1.375, height, weight, age;

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
			switch (et.closest(selector) && et.value.match(/\d/)) {
				case element = +et.value.match(/\d/g).join(''):
					break;
				default:
					break;
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
		if (!sex || !ratio || !height || !weight || !age) {
			result.textContent = '^____^';
			return;
		}
		if (sex == 'female') {
			return result.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(2);
		} else {
			return result.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(2);
		}
	}
	totalCalc();
}

export default calc;