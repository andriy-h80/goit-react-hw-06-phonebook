  import { useState, useEffect } from "react";
  import { nanoid } from 'nanoid';
  import { Phonebook, Container } from './App.styled';
  import ContactForm from './ContactForm/ContactForm';
  import Filter from './Filter/Filter';
  import ContactList from './ContactList/ContactList';
  import initialContacts from '../contacts.json';
  
  export default function App() {
    const [contacts, setContacts] = useState(()=> {
      return JSON.parse(localStorage.getItem('contacts')) ?? initialContacts;
    });
    const [filter, setFilter] = useState('');

    useEffect(() => {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const handleChange = event => {
      const { value } = event.currentTarget;
      setFilter(value);
    };

    const handleSubmit = event => {
      event.preventDefault();
      const { name, number } = event.currentTarget;

      const isContactExist = contacts.some(
        contact => contact.name === name.value
      );
    
      if (isContactExist) {
        alert(`${name.value} is already in contacts`);
        event.currentTarget.reset();
        return;
      }

      const newContact = {
        id: nanoid(10),
        name: name.value,
        number: number.value
      };

      setContacts(prevState => [...prevState, newContact]);

      event.currentTarget.reset();
    };

    const deleteContacts = contactId => {
      setContacts(prevState => prevState.filter(contact => contact.id !== contactId))
    };

    const filteredContacts = contacts.filter(contact => {
        return contact.name.toLowerCase().includes(filter.toLowerCase())
      });

      return (
        <Phonebook >
          <Container>
            <h1>Phonebook</h1>
            <ContactForm onSubmit={handleSubmit} /> 
            <h2>Contacts</h2>
            <Filter value={filter} onChange={handleChange} />
            <ContactList contacts={filteredContacts} onDeleteContacts={deleteContacts} />
          </Container>
        </Phonebook>
      );
  };
