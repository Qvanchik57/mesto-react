import React from 'react';

function PopupWithForm(props) {
    return (
        <div className={`popup popup-${props.name} ${props.isOpen ? 'popup_open' : ''}`}>
            <div className="popup__container">
                <h2 className="popup__header">{props.title}</h2>
                <form className="popup__form" name={`props.name`} onSubmit={props.onClose}>
                    {props.children}
                    <button className="popup__button-save" type="submit">{props.buttonTitle}</button>
                </form>
                <button className="popup__profile-close" type="button" onClick={props.onClose}></button>
            </div>
        </div>
    )
}

export default PopupWithForm