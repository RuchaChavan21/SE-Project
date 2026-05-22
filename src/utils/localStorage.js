// Helper functions for localStorage persistence

const PROFILE_KEY = 'edupath_profile';

export const saveProfile = (data) => {
  try {
    const currentData = getProfile() || {};
    const newData = { ...currentData, ...data };
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newData));
    return newData;
  } catch (error) {
    console.error('Error saving profile to localStorage:', error);
    return null;
  }
};

export const getProfile = () => {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error getting profile from localStorage:', error);
    return null;
  }
};

export const clearProfile = () => {
  try {
    localStorage.removeItem(PROFILE_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing profile from localStorage:', error);
    return false;
  }
};
