import { useState, useEffect } from 'react';
import ContactForm from '../ContactForm/ContactForm';
import ContactList from '../ContactList/ContactList';
import Filter from '../Filter/Filter';
import { Section } from './Phonebook.styled';

export default function Phonebook() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) || []
  );
  const [filter, setFilter] = useState('');

  const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      alert(`You have already got ${newContact.name}.`);
      return;
    }
    setContacts(prevContacts => [...prevContacts, newContact]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    console.log(contacts);
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = contactId => {
    const contacts2 = contacts.filter(contact => contact.id !== contactId);
    setContacts(contacts2);
  };
  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (parsedContacts) {
      setContacts(parsedContacts);
    }
    return;
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const getContactCount = visibleContacts => {
    return visibleContacts.length;
  };
  return (
    <Section>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} count={getContactCount} onChange={changeFilter} />
      <ContactList
        visibleContacts={getVisibleContacts}
        onDelete={deleteContact}
      />
    </Section>
  );
}

// import React, { Component } from 'react';
// // import { nanoid } from 'nanoid';
// import ContactForm from '../ContactForm/ContactForm';
// import ContactList from '../ContactList/ContactList';
// import Filter from '../Filter/Filter';
// import { Section } from './Phonebook.styled';

// class Phonebook extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };
//   addContact = newContact => {
//     if (
//       this.state.contacts.some(
//         contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
//       )
//     ) {
//       alert(`You have already got ${newContact.name}.`);
//       return;
//     }
//     this.setState(prevState => ({
//       contacts: [...prevState.contacts, newContact],
//     }));
//   };
//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };
//   getVisibleContacts = () => {
//     const { filter, contacts } = this.state;
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };
//   getContactCount = visibleContacts => {
//     return visibleContacts.length;
//   };
//   deleteContact = contactId => {
//     this.setState(prevState => {
//       return {
//         contacts: prevState.contacts.filter(
//           contact => contact.id !== contactId
//         ),
//       };
//     });
//   };
//   componentDidMount() {
//     const parsedContacts = JSON.parse(localStorage.getItem('contacts'));
//     if (parsedContacts) {
//       this.setState({ contacts: parsedContacts });
//     }
//   }
//   componentDidUpdate(prevProps, prevState) {
//     if (this.state.contacts !== prevState.contacts) {
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
//     }
//   }
//   render() {
//     const { filter } = this.state;
//     const { addContact, changeFilter, deleteContact, getVisibleContacts } =
//       this;

//     const visibleContacts = getVisibleContacts();
//     const visibleContactsCount = visibleContacts.length;

//     return (
//       <Section>
//         <h1>Phonebook</h1>
//         <ContactForm onSubmit={addContact} />
//         <h2>Contacts</h2>
//         <Filter
//           value={filter}
//           count={visibleContactsCount}
//           onChange={changeFilter}
//         />
//         <ContactList contacts={visibleContacts} onDelete={deleteContact} />
//       </Section>
//     );
//   }
// }
// export default Phonebook;
