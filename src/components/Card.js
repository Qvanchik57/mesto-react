import React from 'react';

function Card({card, onCardClick}) {
    function handleClick() {
        onCardClick(card);
    }  

    return (
        <li className="photos__element" key={card._id}>
            <img className="photos__image" src={card.link} style={{ backgroundImage: `url(${card.link})` }} alt={card.name} onClick={handleClick}/>
            <button className="photos__button-delete"></button>
            <div className="photos__box">
                <h2 className="photos__name">{card.name}</h2>
                <div className="photos__likes">
                <button className="photos__button-like" type="button"></button>
                <span className="photos__like-count">{card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;