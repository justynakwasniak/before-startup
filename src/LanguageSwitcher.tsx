import { useLanguage } from './LanguageContext';
import { Select } from 'antd';

const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Select
      value={language}
      onChange={setLanguage}
      style={{ width: 100, marginLeft: 'auto', marginRight: 16 }}
      options={[
        { value: 'pl', label: 'Polski' },
        { value: 'en', label: 'English' }
      ]}
    />
  );
};

export default LanguageSwitcher;
