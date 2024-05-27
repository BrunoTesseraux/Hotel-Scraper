import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom'; 
import './SignUp.scss';


interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to the server)
    console.log('Sign in form submitted:', formData);
  };

  return (
    <div className="sign-in">
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
      <p>
        Dont have an account? <Link to="/signup">Sign up</Link>
      </p>
    </div>
  );
};

export default SignIn;