import React from 'react';
import PopupWithForm from './PopupWithForm';
import { api } from '../utils/Api';


function EditAvatarPopup({isOpen, onClose, onSubmit, ...props}) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        
        onSubmit({
            avatar: avatarRef.current.value,
        });
        onClose();
        avatarRef.current.value = '';
    } 

    return (
        <PopupWithForm title="Обновить аватар" name="avatar" buttonTitle="Сохранить" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
          <input ref={avatarRef} id="avatar" className="popup__input-text" type="url" name="avatar" placeholder="Ссылка на аватар" required />
          <span className="popup__input-text-error avatar-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;