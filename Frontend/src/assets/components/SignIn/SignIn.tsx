import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SignUp.scss';

interface SignInProps {
  onLogin: () => void;
}

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState<SignInFormData>({
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // vorläufiger login hier muss noch die logik rien 
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log('Sign in form submitted:', formData);
    onLogin(); // Call onLogin after successful login
  };

  return (
    <div className="sign-in">
      <div className="background"></div>
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;