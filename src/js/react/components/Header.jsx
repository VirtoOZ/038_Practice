import React from "react";

export default function Header() {
	return (
		<header className="header">
				<div className="header__container">
					<div className="header__left">
						<div className="header__img">
							<img src="img/logo.svg" alt="logo"/>
						</div>
						<div className="header__title-block">
							<h2 className="header__title">REACT SNEAKERS</h2>
							<div className="header__text">Магазин лучших кроссовок</div>
						</div>
					</div>
					<div className="header__actions actions-header">
						<div className="actions-header__item">
							<div className="actions-header__img">
								<img src="@img/cart.svg" alt="cart"/>
							</div>
							<span className="actions-header__text"><strong>1205 руб.</strong></span>
						</div>
						<div className="actions-header__item">
							<div className="actions-header__img">
								<img src="@img/favorite.svg" alt="favorite"/>
							</div>
							<span className="actions-header__text">Закладки</span>
						</div>
						<div className="actions-header__item">
							<div className="actions-header__img">
								<img src="@img/user.svg" alt="user"/>
							</div>
							<span className="actions-header__text">Профиль</span>
						</div>
					</div>
				</div>
			</header>
	)
}