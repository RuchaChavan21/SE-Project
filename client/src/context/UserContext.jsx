import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [role, setRole] = useState(() => {
    return localStorage.getItem('edupath_user_role') || null;
  });

  const [educatorProfile, setEducatorProfile] = useState(() => {
    const saved = localStorage.getItem('edupath_educator');
    return saved ? JSON.parse(saved) : {
      role: "educator",
      name: "",
      institution: "",
      subjects: [],
      grades: [],
      goals: [],
      uploadedContent: [],
      dashboardReady: false
    };
  });

  const selectRole = (newRole) => {
    setRole(newRole);
    localStorage.setItem('edupath_user_role', newRole);
  };

  const updateEducatorProfile = (data) => {
    const updated = { ...educatorProfile, ...data };
    setEducatorProfile(updated);
    localStorage.setItem('edupath_educator', JSON.stringify(updated));
  };

  const logout = () => {
    setRole(null);
    localStorage.removeItem('edupath_user_role');
    // We intentionally don't clear the educatorProfile here so they don't have to re-onboard every time for the demo
  };

  return (
    <UserContext.Provider value={{ role, selectRole, educatorProfile, updateEducatorProfile, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
