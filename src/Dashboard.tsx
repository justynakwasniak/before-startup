//CONTEXT
import { useUser } from './context/UserContext';
import { Card, Button, Typography, Space } from 'antd';
import { useLanguage } from './context/LanguageContext';


const { Title, Text } = Typography;

const Dashboard = () => {
  const { user, setUser } = useUser();
  const { language } = useLanguage(); // użycie języka

  const handleLogin = () => {
    setUser({
      userId: '12345',
      token: 'abcdefg-token',
      role: 'user',
    });
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>
            {language === 'pl' ? 'Panel główny' : 'Dashboard'}
          </Title>

          {user ? (
            <Text type="success">
              {language === 'pl' ? 'Witaj, użytkowniku o ID:' : 'Welcome, user ID:'}{' '}
              <strong>{user.userId}</strong> ({language === 'pl' ? 'rola' : 'role'}: <strong>{user.role}</strong>)
            </Text>
          ) : (
            <Text type="warning">
              {language === 'pl' ? 'Nie jesteś zalogowany.' : 'You are not logged in.'}
            </Text>
          )}

          <Button type="primary" onClick={handleLogin}>
            {language === 'pl' ? 'Zaloguj (symulacja)' : 'Log in (simulation)'}
          </Button>
        </Space>
      </Card>
    </div>
  );
};


export default Dashboard;
