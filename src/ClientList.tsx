import { useEffect, useState } from 'react';
import { Table, Typography, Spin, Alert } from 'antd';
import axios from 'axios';

const { Title } = Typography;

type Client = {
  id: string;
  name: string;
    status: string;

 
};

export default function ClientList() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get<Client[]>('https://petstore.swagger.io/v2/pet/findByStatus?status=available');
        setClients(response.data);
      } catch {
        setError('Błąd podczas pobierania klientów');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Imię i nazwisko', dataIndex: 'name', key: 'name' },
        { title: 'Status', dataIndex: 'status', key: 'status' },

  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3}>Lista klientów</Title>

      {loading ? <Spin /> : error ? <Alert type="error" message={error} /> : (
        <Table columns={columns} dataSource={clients} rowKey="id" />
      )}
    </div>
  );
}
