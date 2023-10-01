import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard('');
  }

  const [selectedCard, setSelectedCard] = React.useState('');
  function handleCardClick(cardForPopup) {
    setSelectedCard(cardForPopup);
  }

  return (
    <div className={props.class}>
      <Header class="header" />
      <Main class="content" onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} />
      <Footer class="footer" />
      <PopupWithForm title="Редактировать профиль" name="profile" buttonTitle="Сохранить" isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input id="name" className="popup__input-text" type="text" name="name" placeholder="Имя профиля" required minlength="2" maxlength="40" />
        <span className="popup__input-text-error name-error"></span>
        <input id="descrip" className="popup__input-text" type="text" name="about" placeholder="Описание профиля" required minlength="2" maxlength="200" />
        <span className="popup__input-text-error descrip-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Новое место" name="photo" buttonTitle="Создать" isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input id="mesto" className="popup__input-text" type="text" name="name" placeholder="Название" required minlength="2" maxlength="30" />
        <span className="popup__input-text-error mesto-error"></span>
        <input id="link" className="popup__input-text" type="url" name="link" placeholder="Ссылка на картинку" required />
        <span className="popup__input-text-error link-error"></span>
      </PopupWithForm>
      <PopupWithForm title="Вы уверены?" name="delete" buttonTitle="Да"></PopupWithForm>
      <PopupWithForm title="Обновить аватар" name="avatar" buttonTitle="Сохранить" isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input id="avatar" className="popup__input-text" type="url" name="avatar" placeholder="Ссылка на аватар" required />
        <span className="popup__input-text-error avatar-error"></span>
      </PopupWithForm>
      <ImagePopup class="discovery popup" isOpen={selectedCard} card={selectedCard} onClose={closeAllPopups}  />
    </div>
  );
}

export default App;

