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

getResource('http://localhost:3000/menu')
	.then(data => {
		// в таком случае правильным решением будет воспользоваться деструктуризацией
		data.forEach(({ img, altimg, title, descr, price }) => {
			new Card(img, altimg, title, descr, price).render();
		});
	});

// export default cards;