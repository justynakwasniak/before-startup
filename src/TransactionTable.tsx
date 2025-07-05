// 1. Zbudowanie komponentu "Lista transakcji" z filtrami
// Cel: Wyświetlanie listy transakcji pobranych z API klienta
//  Technologie: React + Ant Design + Axios
//  Zakres:
// Tabela z Ant Design
// Filtrowanie po statusie, kwocie lub dacie
// Użycie axios, Table, Select, DatePicker
import { useEffect, useState } from 'react';
import { Table, Select, InputNumber, DatePicker, Space, Button } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import type { ColumnsType } from 'antd/es/table';

const { Option } = Select;
const { RangePicker } = DatePicker;

type Transaction = {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  date: string;
};

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filtered, setFiltered] = useState<Transaction[]>([]);

  const [statusFilter, setStatusFilter] = useState<string | undefined>();
  const [minAmount, setMinAmount] = useState<number | undefined>();
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get<Transaction[]>('http://localhost:4000/transactions');
      setTransactions(response.data);
      setFiltered(response.data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...transactions];

    if (statusFilter) {
      result = result.filter(tx => tx.status === statusFilter);
    }

    if (minAmount !== undefined) {
      result = result.filter(tx => tx.amount >= minAmount);
    }

    if (dateRange) {
      result = result.filter(tx => {
        const txDate = dayjs(tx.date);
        return (
          txDate.isSameOrAfter(dateRange[0].startOf('day')) &&
          txDate.isBefore(dateRange[1].endOf('day')) || txDate.isSame(dateRange[1].endOf('day'))
        );
      });
    }

    setFiltered(result);
  }, [statusFilter, minAmount, dateRange, transactions]);

  const handleClearFilters = () => {
    setStatusFilter(undefined);
    setMinAmount(undefined);
    setDateRange(null);
  };

  const columns: ColumnsType<Transaction> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Kwota',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount, record) => `${amount} ${record.currency}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: date => dayjs(date).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div className="p-4">
      <Space className="mb-4" wrap>
        <Select
          placeholder="Wybierz status"
          allowClear
          onChange={value => setStatusFilter(value)}
          value={statusFilter}
          style={{ width: 160 }}
        >
          <Option value="pending">Pending</Option>
          <Option value="completed">Completed</Option>
          <Option value="failed">Failed</Option>
        </Select>

        <InputNumber
          placeholder="Min kwota"
          min={0}
          onChange={value => setMinAmount(value || undefined)}
          value={minAmount}
        />

        <RangePicker
          onChange={(dates) => setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)}
          value={dateRange}
        />

        <Button onClick={handleClearFilters}>Wyczyść filtry</Button>
      </Space>

      <Table
        columns={columns}
        dataSource={filtered}
        rowKey="id"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
}
