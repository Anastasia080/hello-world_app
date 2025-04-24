import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from './authSlice';
import axios from 'axios';

const ProfilePage = () => {
  const currentUser = useSelector(state => state.auth.currentUser);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    bio: ''
  });

  useEffect(() => {
    if (currentUser?.profile) {
      setFormData({
        name: currentUser.profile.name || '',
        bio: currentUser.profile.bio || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update on server
      await axios.patch(`http://localhost:3001/users/${currentUser.id}`, {
        profile: formData
      });
      
      // Update in Redux store
      dispatch(updateProfile(formData));
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Bio:</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default ProfilePage;