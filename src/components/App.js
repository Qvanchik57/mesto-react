import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
  }

  function handleCardClick(cardForPopup) {
    setSelectedCard(cardForPopup);
  }

  React.useEffect(() => {
    api.getCards()
        .then((data) => {
            setCards(data);
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    if (isLiked) { 
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
    }
    
    else {
      api.putLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      });
    }
  }

  function handleDeleteClick(card) {
    let newCards = {};
    api.deleteCard(card._id)
      .then((cardDel) => {
        newCards = cards.filter(elem => {
          if (elem._id != card._id) {
            return elem;
          }
        });
        setCards(newCards);
      })
  } 

  function handleUpdateUser(dataProfile) {
    api.editUser(dataProfile)
      .then((data) => {
        setCurrentUser(data);
      });
  }

  function handleUpdateAvatar(dataAvatar) {
    api.patchAvatar(dataAvatar)
      .then((data) => {
        currentUser.avatar = dataAvatar.avatar;
      })
      .catch((err) => {
        console.log(err);
      })
  } 

  function handleAddPlaceSubmit(newCardData) {
    api.createNewCard(newCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      })
    }

  React.useEffect(() => {
    api.getStartDataUser()
        .then((data) => {
          setCurrentUser(data);
        })
        .catch((err) => {
          console.log(err);
        })
  }, [])

  return (
    <div className={props.class}>
      <CurrentUserContext.Provider value={currentUser} >
        <Header class="header" />
        <Main class="content" onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteClick}/>
        <Footer class="footer" />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}></EditProfilePopup>
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}></AddPlacePopup>
        <PopupWithForm title="Вы уверены?" name="delete" buttonTitle="Да"></PopupWithForm>
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onSubmit={handleUpdateAvatar}/>
        <ImagePopup class="discovery popup" isOpen={selectedCard} card={selectedCard} onClose={closeAllPopups}  />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;