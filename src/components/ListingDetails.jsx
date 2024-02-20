const ListingDetails = ({ listing, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-lg w-full">
        <div className="mb-6">
          <h3 className="text-3xl font-bold mb-2">{listing.address}</h3>
          <p className="text-gray-600">{listing.state}, {listing.country} {listing.pincode}</p>
          <p className="text-gray-600 mt-2">Available From: {listing.available_from}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Deposit: {listing.deposit}</p>
            <p className="text-gray-600">Rent: {listing.rent}</p>
            <p className="text-gray-600">Furnished: {listing.is_furnished ? 'Yes' : 'No'}</p>
          </div>
          <div>
            <p className="text-gray-600">Current Roomies: {listing.no_of_current_roommates}</p>
            <p className="text-gray-600">Female: {listing.no_of_current_female_roommates}</p>
            <p className="text-gray-600">Male: {listing.no_of_current_male_roommates}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-gray-600">Min Age: {listing.min_age}</p>
            <p className="text-gray-600">Max Age: {listing.max_age}</p>
            <p className="text-gray-600">Gender Preference: {listing.gender_preference === 1 ? 'Male' : 'Female'}</p>
          </div>
          <div>
            <p className="text-gray-600">Roommates Required: {listing.no_of_roommates_required}</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">Images:</p>
          <ul>
            {listing.images.map((image, index) => (
              <li key={index} className="text-blue-500 underline">{image}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-gray-600">Photo: {listing.photo}</p>
        </div>

        <button className="mt-6 bg-blue-500 text-white px-4 py-2 rounded" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ListingDetails;
