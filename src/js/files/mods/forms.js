import { hideModal } from "./modal.js";
import { showModal } from "./modal.js";

function forms() {
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
			showModal('.modal', modalTimerId);
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
				hideModal('.modal');
				modalDialog.classList.remove('hide');
				modalNewDialog.remove();
			}, 3000);
		}
		//<054>=================================
	})
}
export default forms;