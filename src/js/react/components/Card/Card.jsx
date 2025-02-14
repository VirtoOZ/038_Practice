import React from "react";
import styles from "./Card.module.scss";

console.log(styles);
export default function Card(props) {
	return (
		<article className="page__item card">
			<button className="card__favorite">
				<img src={props.imageUrl} alt=""/>
			</button>
			<img src="@img/01.jpg" alt=""/>
			<h3 className="card__text">{props.title}</h3>
			<div className="card__block">
				<div className="card__left">
					<span className="card__cost">цена</span>
					<span className="card__cost-number">{props.cost}</span>
				</div>
				<button className="card__button" onClick={props.onClick}>
					<img src="@img/add.svg" alt=""/>
				</button>
			</div>
		</article>
	)
}