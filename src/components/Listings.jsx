
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchListingsAsync, selectListings } from '../features/listingsSlice';
import UserActions from './UserActions';
import ListingDetails from './ListingDetails';
import { selectToken } from '../features/authSlice';

const Listings = () => {
  const dispatch = useDispatch();
  const listings = useSelector(selectListings);
  const token =useSelector(selectToken);

  const [selectedListing,setSelectedListing]=useState(null);

  useEffect(() => {
    dispatch(fetchListingsAsync(token));
  }, [dispatch, token]);

  const handleListingClick=(listing)=>{
    setSelectedListing(listing);
  };
  const handleCloseListingDetails=()=>{
    setSelectedListing(null);
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Listings</h2>
      <ol className="list-decimal pl-4">
        {listings.map((listing) => (
          <li
            key={listing.id}
            className="bg-gray-200 p-4 rounded cursor-pointer hover:bg-gray-300 mb-4"
            onClick={() => handleListingClick(listing)}
          >
            <h3 className="text-xl font-bold">Owner: {listing.username}</h3>
            <p>Address: {listing.address}</p>
            <p>Rent: {listing.rent}</p>
          </li>
        ))}
      </ol>
      <UserActions />
      
      {selectedListing && (
        <ListingDetails listing={selectedListing} onClose={handleCloseListingDetails} />
      )}
    </div>
  );
};

export default Listings;