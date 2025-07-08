import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { UserProvider } from './UserContext';
import { LanguageProvider } from './LanguageContext';

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

import {
  Layout,
  Menu,
  Drawer,
  Button,
  Grid,
} from 'antd';
import {
  MenuOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid;

// 👇 Elementy menu
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

// 👇 Komponent AppMenu (responsywny)
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
  );
};

// 👇 Główny App
const App = () => {
  const screens = useBreakpoint();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <LanguageProvider>
      <UserProvider>
        <BrowserRouter>
          <Layout>
            <Header style={{ background: '#fff', padding: '0 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {screens.md ? (
                <Menu
                  mode="horizontal"
                  selectedKeys={[location.pathname]}
                  items={menuItems}
                  style={{ flex: 1 }}
                />
              ) : (
                <>
                  <Button
                    icon={<MenuOutlined />}
                    onClick={() => setDrawerOpen(true)}
                  />
                  <Drawer
                    title="Menu"
                    placement="left"
                    onClose={() => setDrawerOpen(false)}
                    open={drawerOpen}
                    bodyStyle={{ padding: 0 }}
                  >
                    <AppMenu onMenuClick={() => setDrawerOpen(false)} />
                  </Drawer>
                </>
              )}
              <LanguageSwitcher />
            </Header>

            <Content style={{ padding: '16px', minHeight: 'calc(100vh - 64px)' }}>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/api" element={<ExampleApi />} />
                <Route path="/transactions" element={<TransactionList />} />
                <Route path="/table" element={<TransactionTable />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/form" element={<DynamicForm />} />
                <Route path="/search" element={<SearchWithDebounce />} />
                <Route path="/clients" element={<ClientList />} />
                <Route path="/calendar-view" element={<CalendarView />} />
              </Routes>
            </Content>
          </Layout>
        </BrowserRouter>
      </UserProvider>
    </LanguageProvider>
  );
};

export default App;
