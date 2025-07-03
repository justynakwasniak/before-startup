//CONTEXT
import { useUser } from './UserContext';
import { Card, Button, Typography, Space } from 'antd';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user, setUser } = useUser();

  const handleLogin = () => {
    setUser({
      userId: '12345',
      token: 'abcdefg-token',
      role: 'user',
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Card  style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>Dashboard</Title>

          {user ? (
            <Text type="success">
              Witaj, użytkowniku o ID: <strong>{user.userId}</strong> (rola: <strong>{user.role}</strong>)
            </Text>
          ) : (
            <Text type="warning">Nie jesteś zalogowany.</Text>
          )}

          <Button type="primary" onClick={handleLogin}>
            Zaloguj (symulacja)
          </Button>
        </Space>
      </Card>
    </div>
  );
};

export default Dashboard;
