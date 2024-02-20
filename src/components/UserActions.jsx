import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProfilePopup from './ProfilePopup';
import { selectToken } from '../features/authSlice';
import {
  selectProfile,
  setShowDeleteConfirmation,
} from '../features/profileSlice';

const UserActions = ({ setProfileDetails }) => {
  const token = useSelector(selectToken);
  const { showDeleteConfirmation } = useSelector(selectProfile);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const dispatch = useDispatch();

  const handleViewProfileClick = () => {
    dispatch(setShowDeleteConfirmation(false));
    setShowProfilePopup(true);
  };

  const handleClosePopup = () => {
    setShowProfilePopup(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mt-4"
        onClick={handleViewProfileClick}
      >
        View Profile
      </button>
      {showProfilePopup && (
        <ProfilePopup
          token={token}
          setProfileDetails={setProfileDetails}
          onClose={handleClosePopup}
        />
      )}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-popup">
        </div>
      )}
    </div>
  );
};

export default UserActions;
