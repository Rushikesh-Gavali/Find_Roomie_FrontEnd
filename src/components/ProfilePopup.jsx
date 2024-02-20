import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProfileDetails,
  updateProfile,
  deleteProfile,
} from '../apis/api';
import { clearToken, selectToken } from '../features/authSlice';
import {
  selectProfile,
  setEditMode,
  setEditedProfile,
  setShowDeleteConfirmation,
  setPasswordForDelete,
} from '../features/profileSlice';

const ProfilePopup = ({ onClose }) => {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);
  const { isEditMode, editedProfile, showDeleteConfirmation, passwordForDelete } = useSelector(
    selectProfile
  );

  const fetchData = async () => {
    try {
      const profileData = await fetchProfileDetails(token);
      dispatch(setEditedProfile(profileData));
      dispatch(setEditMode(false));
    } catch (error) {
      console.error('Error during profile details API call:', error);
    }
  };

  useEffect(() => {
    console.log('ProfilePopup component mounted or opened');
    fetchData();
  }, [token]);

  const handleEditProfileClick = () => {
    dispatch(setEditMode(true));
  };

  const handleConfirmEditClick = async () => {
    try {
      const updatedProfile = await updateProfile(token, editedProfile);
      dispatch(setEditedProfile(updatedProfile));
      dispatch(setEditMode(false));
      console.log('Profile updated successfully');
    } catch (error) {
      console.error('Error during profile update:', error);
    }
  };

  const handleDeleteProfileClick = () => {
    dispatch(setShowDeleteConfirmation(true));
  };

  const handleConfirmDeleteClick = async () => {
    try {
      const result = await deleteProfile(token, passwordForDelete);
      if (result) {
        console.log('Account deleted successfully');
        dispatch(clearToken());
        dispatch(setShowDeleteConfirmation(false));
        onClose();
      }
    } catch (error) {
      console.error('Error during profile deletion:', error);
    }
  };

  const handleCancelDeleteClick = () => {
    dispatch(setShowDeleteConfirmation(false));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setEditedProfile({ ...editedProfile, [name]: value }));
  };

  return (
    <div className="profile-popup fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="profile-popup-content bg-white p-8 rounded-md shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-bold mb-4 text-blue-500">{isEditMode ? 'Edit Profile': 'Profile Details' } </h2>
        <p>
          <span>Username: </span>
          {isEditMode ? (
            <input
              type="text"
              name="username"
              value={editedProfile.username}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md bg-opacity-80"
            />
          ) : (
            <span>{editedProfile.username}</span>
          )}
        </p>
        <p>
          <span>Email: </span>
          {isEditMode ? (
            <input
              type="text"
              name="email"
              value={editedProfile.email}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md bg-opacity-80"
            />
          ) : (
            <span>{editedProfile.email}</span>
          )}
        </p>
        <p>
          <span>Mobile No: </span>
          {isEditMode ? (
            <input
              type="text"
              name="mobile_no"
              value={editedProfile.mobile_no}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md bg-opacity-80"
            />
          ) : (
            <span>{editedProfile.mobile_no}</span>
          )}
        </p>
        <p>
          <span>WhatsApp No: </span>
          {isEditMode ? (
            <input
              type="text"
              name="whatsapp_no"
              value={editedProfile.whatsapp_no}
              onChange={handleInputChange}
              className="border border-gray-300 p-2 rounded-md bg-opacity-80"
            />
          ) : (
            <span>{editedProfile.whatsapp_no}</span>
          )}
        </p>
        <div className="mt-4 space-y-2">
          {isEditMode ? (
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleConfirmEditClick}>
              Confirm Edit
            </button>
          ) : (
            <div className="space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDeleteProfileClick}>
                Delete Profile
              </button>
              <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleEditProfileClick}>
                Edit Profile
              </button>
            </div>
          )}
        </div>

        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4" onClick={onClose}>
          Close
        </button>
      </div>

      {/* Delete Confirmation Popup */}
      {showDeleteConfirmation && (
        <div className="delete-confirmation-popup fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="delete-confirmation-content bg-white p-8 rounded-md shadow-lg max-w-md w-full">
            <h2 className="text-3xl font-bold mb-4 text-red-500">Are you sure ?</h2>
            <p className="mb-4">Enter your password to delete your account:</p>
            <input
              type="password"
              className="border p-2 w-full mb-4"
              value={passwordForDelete}
              onChange={(e) => dispatch(setPasswordForDelete(e.target.value))}
            />
            <div className="flex space-x-4">
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleConfirmDeleteClick}>
                Confirm
              </button>
              <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={handleCancelDeleteClick}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePopup;
