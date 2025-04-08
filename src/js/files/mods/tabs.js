function tabs() {

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
}

export default tabs;