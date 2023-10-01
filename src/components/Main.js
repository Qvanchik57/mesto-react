import React from 'react';
import { api } from '../utils/Api';
import Card from './Card'

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, ...props}) {
    
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription ] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');    

    React.useEffect(() => {
        api.getStartDataUser()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
    }, [])

    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
      api.getCards()
          .then((data) => {
              setCards(data);
          })
          .catch((err) => {
            console.log(err);
          })
    }, [])

    return (
        <main className={props.class}>
        <section className="profile">
          <div className="profile__description">
            <button className="profile__avatar-edit" onClick={onEditAvatar}>
              <img className="profile__avatar" alt="Фото профиля" src={userAvatar} />
            </button>
            <div className="profile__info">
              <div className="profile__name">
                <h1 className="profile__title">{userName}</h1>
                <button className="profile__edit-button" type="button" onClick={onEditProfile}/>
              </div>
              <p className="profile__subtitle">{userDescription}</p>
            </div>
          </div>
          <button className="profile__add-button" type="button" onClick={onAddPlace}/>
        </section>
        <section className="photos">
          <ul className="photos__grid">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={onCardClick} />
           ))}
            {/* {props.children} */}
          </ul>
        </section>
      </main>
    );
}
  
export default Main;
