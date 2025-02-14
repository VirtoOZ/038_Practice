import React from "react";
import Header from "./components/Header.jsx";
import Card from "./components/Card/Card.jsx";
import Driwer from "./components/Driwer.jsx";
import  {arr}  from "./data.js";
const App = () => {
	
	const deistvie = () => {
		console.log(123);
	}
	return (
		<>
			<Driwer/>
			<Header/>
			<main>
				<section className="page">
					<div className="page__container">
						<div className="page__top">
							<h1 className="page__title">Все кроссовки</h1>
							<div className="page__search">
								<img src="@img/search-input.svg" alt=""/>
								<input id="input" className="page__input" placeholder="Поиск" type="text" />
							</div>
						</div>
						<div className="page__body">
							{arr.map((obj) =>
							<Card
								key={obj.title}
								title={obj.title}
								cost={obj.cost}
								imageUrl={obj.imageUrl}
								onClick={deistvie}
							/>
							)}
						</div>
					</div>
				</section>
			</main>
		</>
	)
	
};

export default App