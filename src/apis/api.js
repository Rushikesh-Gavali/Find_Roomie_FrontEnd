const apiUrl = 'http://localhost:3000/api';

export const loginApi = async (email, password) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error('Login failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error during login:', error);
    return null;
  }
};

export const signupApi = async (userData) => {
  try {
    const response = await fetch(`${apiUrl}/users/signup`, {
      method: 'POST',
      body: userData,
    });

    if (response.ok) {
      const data = await response.json();
      console.log(data.data, 'from api');
      return data.data;
    } else {
      console.error('Signup failed:', response.statusText);
      return null;
    }
  } catch (error) {
    console.error('Error during signup:', error);
    return null;
  }
};

export const fetchListingsApi = async (token) => {
  try {
    const response = await fetch(`${apiUrl}/listings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const data = await response.json();
      return data.data;
    } else {
      console.error('Failed to fetch listings:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Error during API call:', error);
    return [];
  }
};

export const fetchProfileDetails = async (token) => {
    try {
      const response = await fetch(`${apiUrl}/users/my-profile`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error('Failed to fetch profile details:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  };

  export const updateProfile = async (token, updatedProfile) => {
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error('Failed to update profile:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  };

  export const deleteProfile = async (token, password) => {
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data.data;
      } else {
        console.error('Failed to delete profile:', response.statusText);
        return null;
      }
    } catch (error) {
      console.error('Error during API call:', error);
      return null;
    }
  };
  