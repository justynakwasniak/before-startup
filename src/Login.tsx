import { useState } from 'react';
import { Button, Input, Typography } from 'antd';
import { useAuth } from './context/AuthContext';
import { useNavigate } from 'react-router-dom';


const { Title } = Typography;

export default function Login() {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
    const navigate = useNavigate(); // 👈


  const handleLogin = () => {
    login(username, password); // nie sprawdza haseł, symulacja
    navigate('/');
  };

  return (
    <div style={{ maxWidth: 300, margin: '100px auto', textAlign: 'center' }}>
      <Title level={3}>Zaloguj się</Title>
      <Input placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} />
      <Input.Password placeholder="Hasło" value={password} onChange={e => setPassword(e.target.value)} style={{ marginTop: 8 }} />
      <Button type="primary" onClick={handleLogin} style={{ marginTop: 16 }}>
        Zaloguj
      </Button>
    </div>
  );
}
