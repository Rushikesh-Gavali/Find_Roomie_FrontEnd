
import { useSelector } from 'react-redux';
import { selectListings } from '../redux/listingsSlice';

const Uploads = ({ onListingClick }) => {
  const listings = useSelector(selectListings);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Uploads</h2>
      <ol className="list-decimal pl-4">
        {listings.map((listing) => (
          <li
            key={listing.id}
            className="bg-gray-200 p-4 rounded cursor-pointer hover:bg-gray-300 mb-4"
            onClick={() => onListingClick(listing)}
          >
            <h3 className="text-xl font-bold">{listing.username}</h3>
            <p>{listing.address}</p>
            <p>Rent: {listing.rent}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Uploads;
