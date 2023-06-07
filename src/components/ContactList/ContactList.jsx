import { useSelector } from "react-redux";
import { getContacts, getFilter } from "../../redux/selectors";
import ContactListItem from '../ContactListItem/ContactListItem';
import { ContactListStyled } from './ContactList.styled';

const ContactList = () => {

  const contacts = useSelector(getContacts);
  const filterContacts = useSelector(getFilter);

  return (
    <ContactListStyled>
      {contacts.filter(contact => 
        contact.name.toLowerCase().includes(filterContacts.toLowerCase()))
        .map(({ id, name, number }) => (
        <ContactListItem
          key={id}
          name={name}
          number={number}
         >
        </ContactListItem>
      ))}
    </ContactListStyled>
  );
};

export default ContactList;
