//CONTEXT
import { useAuth } from './context/AuthContext';
import { Card, Typography, Space } from 'antd';
import { useLanguage } from './context/LanguageContext';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { token, isAuthenticated } = useAuth();
  const { language } = useLanguage();

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Card style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Title level={3}>
            {language === 'pl' ? 'Panel główny' : 'Dashboard'}
          </Title>

          {isAuthenticated ? (
            <Text type="success">
              ✅ {language === 'pl' ? 'Jesteś zalogowany.' : 'You are logged in.'}
              <br />
              <small style={{ wordBreak: 'break-all' }}>
                {language === 'pl' ? 'Token:' : 'Token:'} <code>{token}</code>
              </small>
            </Text>
          ) : (
            <Text type="warning">
              ⚠️ {language === 'pl' ? 'Nie jesteś zalogowany.' : 'You are not logged in.'}
            </Text>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Dashboard;
