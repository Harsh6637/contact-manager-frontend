import React from 'react';

const ContactForm = ({ name, email, setName, setEmail, addContact }) => {
  return (
    <div className="name-email-container">
      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={addContact}>Add Contact</button>
    </div>
  );
};

export default ContactForm;
