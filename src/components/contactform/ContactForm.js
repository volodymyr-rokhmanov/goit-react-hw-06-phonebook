import { nanoid } from 'nanoid';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/contactSlice';
import { useState } from 'react';
import { getContacts } from 'redux/selectors';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const contact = {
      id: nanoid(),
      name: name,
      number: number,
    };
    const nameUser = name;
    const doubleContact = contacts.some(
      ({ name }) => name.toLowerCase() === nameUser.toLowerCase()
    );

    if (doubleContact) {
      alert(`${name} is already in contacts`);
      reset();
      return;
    } else dispatch(addContact(contact));;
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  
  return (
    <div className={css.form__wrapper}>
      <h1>Phonebook</h1>
      <form className={css.form__body} onSubmit={handleSubmit}>
        <label className={css.form__name}>
          Name
          <input
            className={css.input__name}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className={css.form__number}>
          Number
          <input
            className={css.input__number}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button className={css.form__button} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};


