import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    // Fetch items from the backend when the component mounts
    axios.get('http://localhost:3306/items').then((response) => {
      setItems(response.data);
    });
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Create item
    axios.post('http://localhost:3306/items', formData).then(() => {
      // Fetch updated items after creating a new item
      axios.get('http://localhost:3306/items').then((response) => {
        setItems(response.data);
      });
    });
  };

  const handleEdit = (id) => {
    // Implement edit functionality if needed
  };

  const handleDelete = (id) => {
    // Delete item
    axios.delete(`http://localhost:3306/items/${id}`).then(() => {
      // Fetch updated items after deleting an item
      axios.get('http://localhost:3306/items').then((response) => {
        setItems(response.data);
      });
    });
  };

  return (
    <div>
      <h1>CRUD App with React and MySQL</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>
          Description:
          <input type="text" name="description" onChange={handleInputChange} />
        </label>
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.description}
            <button onClick={() => handleEdit(item.id)}>Edit</button>
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
