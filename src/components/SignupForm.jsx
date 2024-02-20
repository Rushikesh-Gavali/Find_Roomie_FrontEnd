
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signupAsync, } from '../features/authSlice';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [whatsappNo, setWhatsappNo] = useState('');
  const [dob, setDob] = useState('');
  const [photo, setPhoto] = useState(null);

  const[signupStatus,setSignupStatus]=useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('gender', gender);
    formData.append('mobile_no', mobileNo);
    formData.append('whatsapp_no', whatsappNo);
    formData.append('dob', dob);
    formData.append('photo', photo);

    try {
      const user= await dispatch(signupAsync(formData));
      console.log('user is: '+ user);
      if(user){
        setUsername('');
        setSignupStatus('success');
      }else{console.log(user.error)}
    } catch (error) {
      console.log(error);
      setSignupStatus('failed');
    }
  };

  return (
    <form onSubmit={handleSignup} className="max-w-md mx-auto mt-8 p-6 bg-white rounded-md shadow-md" >
      {console.log(signupStatus)}

    {signupStatus === 'success' && (
        <div className="text-green-600 mb-4">Your account is created successfully. <Link to='/login'>Login</Link> </div>
      )}

    {signupStatus === 'failed' && (
        <div className="text-red-600 mb-4">Signup failed. Please try again. <Link to='/' >Home</Link> </div>
      )}

      <h2 className="text-2xl font-bold mb-6">Signup</h2>
      <label className="block mb-2">Username:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">Password:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2" >Gender:</label>
      <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">Mobile Number:</label>
      <input type="text" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">WhatsApp Number:</label>
      <input type="text" value={whatsappNo} onChange={(e) => setWhatsappNo(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">Date of Birth:</label>
      <input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="w-full border p-2 mb-4" />
      <label className="block mb-2">Photo:</label>
      <input type="file" accept="image/*" onChange={handleFileChange} className="w-full border p-2 mb-4" />

      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
        Signup
      </button>
    </form>
  );
};

export default SignupForm;
