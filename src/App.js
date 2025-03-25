import React, { useState, useEffect } from 'react';
import './styles.css';
import axiosInstance from './services/api';
import ContactForm from './components/ContactForm';
import SearchBar from './components/SearchBar';
import ContactList from './components/ContactList';

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    const response = await axiosInstance.get('/contacts');
    setContacts(response.data);
  };

  const addContact = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!name || name.length < 2) {
      alert('Name is required and must be at least 2 characters long.');
      return;
    }

    if (!email || !emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      const response = await axiosInstance.post(
        '/contacts',
        { contact: { name, email } },
        { headers: { 'Content-Type': 'application/json' } }
      );

      setContacts((prevContacts) => [...prevContacts, response.data]);
      setName('');
      setEmail('');
      alert('Contact added successfully!');
    } catch (error) {
      alert('Failed to add contact. Please try again.');
    }
  };

  const searchContacts = async () => {
    try {
      const response = await axiosInstance.get(`/contacts/search/${searchQuery}`);
      setContacts(response.data);
      if (response.data.length === 0) {
        alert(`No contacts found matching "${searchQuery}".`);
      }
    } catch (error) {
      alert('Failed to search contacts. Please try again.');
    }
  };

  const deleteContact = async (id) => {
    await axiosInstance.delete(`/contacts/${id}`);
    fetchContacts();
  };

  return (
    <div className="container">
      <h1>Contact List Manager</h1>
      <ContactForm
        name={name}
        email={email}
        setName={setName}
        setEmail={setEmail}
        addContact={addContact}
      />
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchContacts={searchContacts}
      />
      <ContactList contacts={contacts} deleteContact={deleteContact} />
    </div>
  );
};

export default App;
