import React from "react";

export default function Driwer() {
	return (
		<div style={{display: 'none'}} className="overlay">
				<div className="driwer">
					<h3 className="driwer__title">Корзина</h3>
					<ul className="driwer__list">
						<li className="driwer__item">
							<div className="driwer__img">
								<img src="@img/01.jpg" alt=""/>
							</div>
							<div className="driwer__content">
								<h3 className="card__text">Мужские Кроссовки Nike Air Max 270</h3>
								<span className="actions-header__text"><strong>12005 руб.</strong></span>
							</div>
							<button className="driwer__close">
								<img src="@img/close.svg" alt=""/>
							</button>
						</li>
						<li className="driwer__item">
							<div className="driwer__img">
								<img src="@img/01.jpg" alt=""/>
							</div>
							<div className="driwer__content">
								<h3 className="card__text">Мужские Кроссовки Nike Air Max 270</h3>
								<span className="actions-header__text"><strong>8499 руб.</strong></span>
							</div>
							<button className="driwer__close">
								<img src="@img/close.svg" alt=""/>
							</button>
						</li>
					</ul>
					<div className="driwer__bottom bottom">
						<div className="bottom__body">
							<div className="bottom__cost">
								<span className="bottom__total">Итого</span>
								<div></div>
								<span className="bottom__number">21 498 руб.</span>
							</div>
							<div className="bottom__cost">
								<span className="bottom__total">Налог 5%:</span>
								<div></div>
								<span className="bottom__number">1 498 руб.</span>
							</div>
						</div>
						<button className="bottom__button">
							<span>Оформить заказ</span>
							<img src="@img/arrow-order.svg" alt=""/>
						</button>
					</div>
				</div>
			</div>
	)
}
