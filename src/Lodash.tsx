import _ from 'lodash';

// Typ pojedynczej transakcji
type Transaction = {
  id: string;
  amount: number;
  currency: string;
  category: string;
  user?: {
    profile?: {
      name?: string;
    };
  };
};

// Przykładowe dane
const transactions: Transaction[] = [
  { id: '1', amount: 100, currency: 'USD', category: 'food' },
  { id: '2', amount: 200, currency: 'USD', category: 'travel' },
  { id: '3', amount: 150, currency: 'EUR', category: 'food' },
  { id: '4', amount: 100, currency: 'EUR', category: 'food' },
  { id: '2', amount: 200, currency: 'USD', category: 'travel' }, // duplikat ID
];

// 1. get(): bezpieczny dostęp do zagnieżdżonych danych
const userName = _.get(transactions[0], 'user.profile.name', 'Nieznany');

// 2. debounce(): np. przy wyszukiwaniu (tu tylko przykład funkcji)
const handleSearch = _.debounce((query: string) => {
  console.log('Szukaj:', query);
}, 300);

// 3. groupBy(): grupowanie transakcji po walucie
const grouped = _.groupBy(transactions, 'currency');

// 4. orderBy(): sortowanie malejąco po amount
const sorted = _.orderBy(transactions, ['amount'], ['desc']);

// 5. isEmpty(): sprawdzenie czy lista transakcji pusta
if (_.isEmpty(transactions)) {
  console.log('Brak transakcji');
}

// 6. uniqBy(): usuwanie duplikatów po ID
const unique = _.uniqBy(transactions, 'id');

// 7. pick(): wybór tylko niektórych pól np. do API
const simplified = unique.map(t => _.pick(t, ['id', 'amount']));

// 8. cloneDeep(): bezpieczna głęboka kopia np. do modyfikacji bez zmian oryginału
// const cloned = _.cloneDeep(transactions);

// Przykład eksportu do użycia w React Component
export {
  transactions,
  grouped,
  sorted,
  simplified,
  handleSearch,
  userName,
};
