import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';
import { ConfigProvider, theme as antdTheme } from 'antd';
import { DarkModeProvider } from './context/DarkModeContext';
import { useDarkMode } from './context/useDarkMode';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/AuthContext';

import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Dashboard from './Dashboard';
import ExampleApi from './ExampleApi';
import TransactionList from './TransactionList';
import Calendar from './Calendar';
import EventList from './EventList';
import TransactionTable from './TransactionTable';
import DynamicForm from './DynamicForm';
import LanguageSwitcher from './LanguageSwitcher';
import SearchWithDebounce from './SearchWithDebounce';
import ClientList from './ClientList';
import CalendarView from './CalendarView';
import ThemeSwitcher from './ThemeSwitcher';

import {
  Layout,
  Menu,
  Drawer,
  Button,
  Grid,
} from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

const menuItems: MenuProps['items'] = [
  { label: <Link to="/">Dashboard</Link>, key: '/' },
  { label: <Link to="/api">ExampleApi</Link>, key: '/api' },
  { label: <Link to="/transactions">TransactionList</Link>, key: '/transactions' },
  { label: <Link to="/table">TransactionTable</Link>, key: '/table' },
  { label: <Link to="/calendar">Calendar</Link>, key: '/calendar' },
  { label: <Link to="/events">EventList</Link>, key: '/events' },
  { label: <Link to="/form">DynamicForm</Link>, key: '/form' },
  { label: <Link to="/search">SearchWithDebounce</Link>, key: '/search' },
  { label: <Link to="/clients">ClientList</Link>, key: '/clients' },
  { label: <Link to="/calendar-view">Kalendarz</Link>, key: '/calendar-view' },
];

const AppMenu = ({ onMenuClick }: { onMenuClick?: () => void }) => {
  const location = useLocation();
  return (
    <Menu
      theme="light"
      mode="vertical"
      selectedKeys={[location.pathname]}
      items={menuItems}
      onClick={onMenuClick}
    />
  )
};


const AppLayout = () => {
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { darkMode } = useDarkMode();
  const { isAuthenticated, logout } = useAuth();


  const theme = {
    algorithm: darkMode ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
  };

  return (
    <ConfigProvider theme={theme}>
      <Layout>
        <Header
          style={{
            background: darkMode ? '#141414' : '#fff',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {screens.md ? (
            <Menu
              mode="horizontal"
              selectedKeys={[location.pathname]}
              items={menuItems}
              style={{ flex: 1 }}
              theme={darkMode ? 'dark' : 'light'}
            />
          ) : (
            <>
              <Button icon={<MenuOutlined />} onClick={() => setDrawerOpen(true)} />
              <Drawer
                title="Menu"
                placement="left"
                onClose={() => setDrawerOpen(false)}
                open={drawerOpen}
                styles={{ body: { padding: 0 } }}
              >
                <AppMenu onMenuClick={() => setDrawerOpen(false)} />
              </Drawer>
            </>
          )}
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
  <LanguageSwitcher />
  <ThemeSwitcher />
  {isAuthenticated && (
    <Button onClick={logout} type="primary" danger>
      Wyloguj
    </Button>
  )}
</div>
</Header>
        <Content style={{ padding: '16px', minHeight: 'calc(100vh - 64px)' }}>
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/api" element={<PrivateRoute><ExampleApi /></PrivateRoute>} />
            <Route path="/transactions" element={<PrivateRoute><TransactionList /></PrivateRoute>} />
            <Route path="/table" element={<PrivateRoute><TransactionTable /></PrivateRoute>} />
            <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
            <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
            <Route path="/form" element={<PrivateRoute><DynamicForm /></PrivateRoute>} />
            <Route path="/search" element={<PrivateRoute><SearchWithDebounce /></PrivateRoute>} />
            <Route path="/clients" element={<PrivateRoute><ClientList /></PrivateRoute>} />
            <Route path="/calendar-view" element={<PrivateRoute><CalendarView /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Content>
      </Layout>
    </ConfigProvider>
  );
};

const AppContent = () => (
  <BrowserRouter>
    <AuthProvider>
      <AppLayout />
    </AuthProvider>
  </BrowserRouter>
);

const App = () => (
  <LanguageProvider>
    <UserProvider>
      <DarkModeProvider>
        <AppContent />
      </DarkModeProvider>
    </UserProvider>
  </LanguageProvider>
);

export default App;
