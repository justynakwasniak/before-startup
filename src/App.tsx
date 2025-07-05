import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { UserProvider } from './UserContext';

import Dashboard from './Dashboard';
import ExampleApi from './ExampleApi';
import TransactionList from './TransactionList';
import Calendar from './Calendar';
import EventList from './EventList';
import TransactionTable from './TransactionTable';
import DynamicForm from './DynamicForm';

import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { LanguageProvider } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import SearchWithDebounce from './SearchWithDebounce';



const { Header, Content } = Layout;

// 👇 Funkcja pomocnicza do aktywnego menu
const items: MenuProps['items'] = [
  { label: <Link to="/">Dashboard</Link>, key: '/' },
  { label: <Link to="/api">ExampleApi</Link>, key: '/api' },
  { label: <Link to="/transactions">TransactionList</Link>, key: '/transactions' },
  { label: <Link to="/table">TransactionTable</Link>, key: '/table' },
  { label: <Link to="/calendar">Calendar</Link>, key: '/calendar' },
  { label: <Link to="/events">EventList</Link>, key: '/events' },
    { label: <Link to="/form">DynamicForm</Link>, key: '/form' },
  { label: <Link to="/search">SearchWithDebounce</Link>, key: '/search' },

];

// 👇 Komponent z Menu (zawiera hook do ustawienia aktywnego)
const AppMenu = () => {
  const location = useLocation();
  return (
    <Menu
      theme="light"
      mode="horizontal"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

const App = () => {
  return (
    <LanguageProvider>

    <UserProvider>
      <BrowserRouter>
        <Layout>
<Header style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '0 16px' }}>
  <AppMenu />
  <LanguageSwitcher />
</Header>

          <Content style={{ padding: '24px' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/api" element={<ExampleApi />} />
              <Route path="/transactions" element={<TransactionList />} />
              <Route path="/table" element={<TransactionTable />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/events" element={<EventList />} />
                            <Route path="/form" element={<DynamicForm />} />
                            <Route path="/search" element={<SearchWithDebounce />} />

            </Routes>
          </Content>
        </Layout>
      </BrowserRouter>
    </UserProvider>
    </LanguageProvider>

  );
};

export default App;
