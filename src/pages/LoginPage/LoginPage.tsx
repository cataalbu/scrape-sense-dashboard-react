import { useState } from 'react';

import { useAppDispatch } from '../../redux/hooks';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { useLoginMutation } from '../../redux/features/auth/authApiSlice';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log('email:', email);
      console.log('password', password);
      const userData = await login({ email, password }).unwrap();
      dispatch(setCredentials(userData));
      console.log('User data:', userData);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (!error.response) {
        console.log('No server resposne');
      } else if (error.response.status === 401) {
        console.log('Invalid credentials');
      } else {
        console.log('Some other error');
      }
    }
  };

  const handleEmailInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div>
      <h1>Login Page</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailInput}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordInput}
          />
          <button type="submit">Login</button>
        </form>
      )}
    </div>
  );
}
