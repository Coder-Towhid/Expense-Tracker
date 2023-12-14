import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
 
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:3001/expense/v1/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: name, password: password }),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('result:', result);
  
        // Assuming the backend returns a token upon successful login
        const { token } = result;
  
        // Store the token in local storage
        localStorage.setItem('token', token);
  
        // Redirect the user to a new route upon successful login
        // history.push('/home'); // Replace '/dashboard' with the route you want to navigate to
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  
    console.log(name);
    console.log(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" placeholder="username" value={name}  onChange={handleNameChange} />

      <input type="password" placeholder="password" value={password}  onChange={handlePasswordChange} />
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default Login;
0