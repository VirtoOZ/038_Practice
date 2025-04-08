// Подключение функционала "Чертоги Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

import tabs from './mods/tabs.js';
import modal from './mods/modal.js';
import cards from './mods/cards.js';
import timer from './mods/timer.js';
// import scroll from './mods/scroll.js';
import forms from './mods/forms.js';
import slider from './mods/slider.js';
import calc from './mods/calc.js';
import showModal from './mods/modal.js';

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
	const modalTimerId = setTimeout(() => showModal('.modal', modalTimerId), 5000);

	//<TABS>=================================
	tabs();
	//</TABS>=================================

	//<CARDS>=================================
	// cards();
	//</CARDS>=================================

	//<TIMER>=================================
	timer();
	//<TIMER>=================================

	//<MODAL>=================================

	modal('.modal', modalTimerId);
	//</MODAL>=================================

	//<SCROLL>=================================
	// scroll();
	//</SCROLL>=================================

	//<FORMS>=================================
	forms();
	//</FORMS>=================================

	//<SLIDER>=================================
	slider();
	//</SLIDER>=================================

	//<CALC>=================================
	calc();
	//<CALC>=================================
});
// npx json-server src/files/db.json