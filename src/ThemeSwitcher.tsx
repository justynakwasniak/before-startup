import { Switch } from 'antd';
import { useDarkMode } from './context/useDarkMode';
import { BulbOutlined, BulbFilled } from '@ant-design/icons';

const ThemeSwitcher = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  return (
    <Switch
      checked={darkMode}
      onChange={toggleDarkMode}
      checkedChildren={<BulbFilled />}
      unCheckedChildren={<BulbOutlined />}
      style={{ marginLeft: 12 }}
    />
  );
};

export default ThemeSwitcher;
