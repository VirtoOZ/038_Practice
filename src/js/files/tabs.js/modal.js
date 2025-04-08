function showModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show', 'fade');
	document.body.style.overflow = 'hidden';
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
}

function hideModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('show', 'fade');
	document.body.style.overflow = '';
}

function modal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);

	// function statusModal(element) {
	// 	const dispStatus = window.getComputedStyle(element);
	// 	if (dispStatus.display == 'none') {
	// 		showModal(element);
	// 	}
	// 	else hideModal(element);
	// }

	document.addEventListener("click", (e) => {
		const et = e.target;

		if (modal.classList.contains('show') && !et.closest('.modal__content') || et.classList.contains('modal__close')) {
			hideModal(modalSelector);
		}
		if (et.closest('[data-modal]')) {
			showModal(modalSelector, modalTimerId);
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.code == 'Escape' && modal.classList.contains('show')) {
			hideModal(modalSelector);
		}
	},);

	// открытие по скроллу внизу
	function showModalByScroll() {
		const endDoc = document.documentElement.scrollHeight,
			scrollDoc = window.pageYOffset + document.documentElement.clientHeight;

		if (endDoc <= scrollDoc) {
			showModal(modalSelector, modalTimerId);
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);
}

export default modal;
export { showModal };
export { hideModal };