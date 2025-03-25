import React from 'react';

const ContactList = ({ contacts, deleteContact }) => {
  return (
    <div className="search-results">
      {contacts.length > 0 ? (
        contacts.map((contact, index) => (
          <div key={index} className="result-item">
            <span className="result-info">
              {contact.name} - {contact.email}
            </span>
            <span className="delete-span">
              <button
                className="delete-button"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default ContactList;
