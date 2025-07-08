import { useEffect, useMemo, useState } from 'react';
import { Input, List, Empty } from 'antd';
import debounce from 'lodash/debounce';

const { Search } = Input;

// Przykładowe dane do wyszukiwania
const dummyData = [
  'React',
  'Vue',
  'Angular',
  'Svelte',
  'SolidJS',
  'Next.js',
  'Remix',
  'Preact',
  'Astro',
];

export default function SearchWithDebounce() {
  const [results, setResults] = useState<string[]>(dummyData); // Wyniki wyszukiwania

  // Funkcja wyszukiwania
  const performSearch = (value: string) => { // Funkcja wyszukiwania, która jest debounced
    const filtered = dummyData.filter(item => // filtruj dane
      item.toLowerCase().includes(value.toLowerCase()) // porównuj bez uwzględniania wielkości liter
    );
    setResults(filtered); // Ustaw wyniki wyszukiwania
  };

  // Zdebounce'owana funkcja (tworzona tylko raz)
  const debouncedSearch = useMemo(  // Użycie useMemo do stworzenia zdebounce'owanej funkcji
    () => debounce(performSearch, 500), // Debounce ustawiony na 500ms
    []
  );

  // Zmiana zapytania i uruchomienie debounce
  const handleSearch = (value: string) => {
    debouncedSearch(value);
  };
  // Czyszczenie debounce przy odmontowaniu
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div style={{ maxWidth: 500, margin: '40px auto' }}>
      <Search
        placeholder="Szukaj technologii..."
        enterButton
        allowClear
        onChange={(e) => handleSearch(e.target.value)}
      />

      {results.length > 0 ? (
        <List
          bordered
          dataSource={results}
          renderItem={(item) => <List.Item>{item}</List.Item>}
          style={{ marginTop: 16 }}
        />
      ) : (
        <Empty description="Brak wyników" style={{ marginTop: 24 }} />
      )}
    </div>
  );
}
