import React, { useState } from "react";
import "./ProfileSettingsPage.css";
import { Navbar } from "../Navbar/Navbar";

const ProfileSettingsPage = () => {
  const [username, setUsername] = useState("");
  const [profileName, setProfileName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Settings updated:", { username, profileName, password });
  };

  return (
    <>
      <Navbar />
      <div className="profile-settings-container">
        <h2 className="profile-settings-title">Profile Settings</h2>
        <form onSubmit={handleSubmit} className="profile-settings-form">
          <div className="profile-settings-field">
            <label htmlFor="username">Change Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter new username"
              className="profile-settings-input"
            />
          </div>

          <div className="profile-settings-field">
            <label htmlFor="profileName">Change Profile Name</label>
            <input
              type="text"
              id="profileName"
              value={profileName}
              onChange={(e) => setProfileName(e.target.value)}
              placeholder="Enter new profile name"
              className="profile-settings-input"
            />
          </div>

          <div className="profile-settings-field">
            <label htmlFor="password">Change Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
              className="profile-settings-input"
            />
          </div>

          <button type="submit" className="profile-settings-button">
            Save Changes
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileSettingsPage;
