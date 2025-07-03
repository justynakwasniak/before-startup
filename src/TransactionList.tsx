//LODASH
import { useEffect, useState, useCallback } from 'react';
import { Input, List, Typography, Empty, Tag } from 'antd';
import {
  orderBy,
  uniqBy,
  debounce,
  isEmpty,
} from 'lodash';
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

type Transaction = {
  id: string;
  amount: number;
  date: string; // ISO string
  type: 'credit' | 'debit';
  description: string;
};

const mockTransactions: Transaction[] = [
  {
    id: '1',
    amount: 1200,
    date: '2024-10-01T10:20:00Z',
    type: 'credit',
    description: 'Salary',
  },
  {
    id: '2',
    amount: -80,
    date: '2024-10-02T14:10:00Z',
    type: 'debit',
    description: 'Groceries',
  },
  {
    id: '3',
    amount: -40,
    date: '2024-10-02T16:45:00Z',
    type: 'debit',
    description: 'Coffee',
  },
  {
    id: '2', // duplicated ID to show uniqBy
    amount: -80,
    date: '2024-10-02T14:10:00Z',
    type: 'debit',
    description: 'Groceries',
  },
];

export default function TransactionList() {
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  // remove duplicates
  const uniqueTransactions = uniqBy(mockTransactions, 'id');

  // sorted by date descending
  const sortedTransactions = orderBy(uniqueTransactions, ['date'], ['desc']);

  // handle search with debounce and useCallback to memoize the function reference
  const handleSearch = useCallback(
    debounce((text: string) => {
      if (!text.trim()) {
        setFiltered(sortedTransactions);
      } else {
        const lower = text.toLowerCase();
        const result = sortedTransactions.filter((t) =>
          t.description.toLowerCase().includes(lower)
        );
        setFiltered(result);
      }
    }, 300),
    [sortedTransactions]
  );

  useEffect(() => {
    handleSearch(search);
  }, [search, handleSearch]);

  const transactionsToRender = isEmpty(search) ? sortedTransactions : filtered;

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
        Transakcje
      </Title>

      <Input.Search
        placeholder="Szukaj po opisie..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        enterButton={false}
        allowClear
        style={{ marginBottom: 20 }}
      />

      {isEmpty(transactionsToRender) ? (
        <Empty description="Brak wyników." />
      ) : (
        <List
          bordered
          dataSource={transactionsToRender}
          renderItem={t => (
            <List.Item>
              <List.Item.Meta
                title={
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Text strong>{t.description}</Text>
                    {t.type === 'credit' ? (
                      <Tag color="green" icon={<ArrowUpOutlined />}>
                        Przychód
                      </Tag>
                    ) : (
                      <Tag color="red" icon={<ArrowDownOutlined />}>
                        Wydatki
                      </Tag>
                    )}
                  </div>
                }
                description={
                  <>
                    <Text>
                      {t.amount.toLocaleString('pl-PL', {
                        style: 'currency',
                        currency: 'PLN',
                      })}
                    </Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(t.date).toLocaleString()}
                    </Text>
                  </>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  );
}
