// import { useState, useEffect, type ChangeEvent } from 'react';

// interface Todo { 
//   userId?: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

// export default function TodoApp() {
//   const [todos, setTodos] = useState<Todo[]>([]);
//   const [newTitle, setNewTitle] = useState<string>('');
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);
// //pobieranie danych z API GET
//   useEffect(() => {
//     setLoading(true);
//     fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
//       .then(res => { 
//         console.log('GET status:', res.status);
//         if (!res.ok) throw new Error('Błąd sieci');
//         return res.json() as Promise<Todo[]>;
//       })
//       .then(data => {
//         setTodos(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Nie udało się pobrać danych');
//         setLoading(false);
//       });
//   }, []);
// // dodawanie danych do API POST
//   const addTodo = () => {
//     if (!newTitle.trim()) return;
//     setLoading(true);
//     fetch('https://jsonplaceholder.typicode.com/todos', {
//       method: 'POST',
//       body: JSON.stringify({
//         title: newTitle,
//         completed: false,
//       }),
//       headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     })
//       .then(res => {
//         console.log('POST status:', res.status);
//         if (!res.ok) throw new Error('Błąd przy dodawaniu');
//         return res.json() as Promise<Todo>;
//       })
//       .then(data => {
//         setTodos([data, ...todos]);
//         setNewTitle('');
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Nie udało się dodać zadania');
//         setLoading(false);
//       });
//   };
// // aktualizacja danych w API PUT
//   const toggleComplete = (id: number) => {
//     const todo = todos.find(t => t.id === id);
//     if (!todo) return;
//     setLoading(true);
//     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//       method: 'PUT',
//       body: JSON.stringify({
//         ...todo,
//         completed: !todo.completed,
//       }),
//       headers: { 'Content-type': 'application/json; charset=UTF-8' },
//     })
//       .then(res => {
//         console.log('PUT status:', res.status);
//         if (!res.ok) throw new Error('Błąd przy aktualizacji');
//         return res.json() as Promise<Todo>;
//       })
//       .then(data => {
//         setTodos(todos.map(t => (t.id === id ? data : t)));
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Nie udało się zaktualizować zadania');
//         setLoading(false);
//       });
//   };
// // usuwanie danych z API DELETE
//   const deleteTodo = (id: number) => {
//     setLoading(true);
//     fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
//       method: 'DELETE',
//     })
//       .then(res => {
//         console.log('DELETE status:', res.status);
//         if (!res.ok) throw new Error('Błąd przy usuwaniu');
//         setTodos(todos.filter(t => t.id !== id));
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error(err);
//         setError('Nie udało się usunąć zadania');
//         setLoading(false);
//       });
//   };
// // obsługa zmiany wartości inputa
//   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setNewTitle(e.target.value);
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: '20px auto', fontFamily: 'Arial' }}>
//       <h2>Moja lista TODO (API test)</h2>

//       <input
//         type="text"
//         value={newTitle}
//         placeholder="Nowe zadanie"
//         onChange={handleChange}
//         disabled={loading}
//         style={{ width: '70%', padding: '8px' }}
//       />
//       <button onClick={addTodo} disabled={loading || !newTitle.trim()} style={{ padding: '8px', marginLeft: '10px' }}>
//         Dodaj
//       </button>

//       {loading && <p>Ładowanie...</p>}
//       {error && <p style={{ color: 'red' }}>{error}</p>}

//       <ul style={{ listStyle: 'none', padding: 0 }}>
//         {todos.map(todo => (
//           <li key={todo.id} style={{ margin: '10px 0', background: '#f9f9f9', padding: '10px', borderRadius: 4 }}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleComplete(todo.id)}
//               disabled={loading}
//             />
//             <span style={{ marginLeft: 10, textDecoration: todo.completed ? 'line-through' : 'none' }}>
//               {todo.title}
//             </span>
//             <button
//               onClick={() => deleteTodo(todo.id)}
//               disabled={loading}
//               style={{ float: 'right', background: 'red', color: 'white', border: 'none', padding: '4px 8px', borderRadius: 4 }}
//             >
//               Usuń
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

////////////////////////////////////
import { useState, useEffect } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import { Input, Button, List, Checkbox, Typography, Spin, message, Space, Row, Col, Card } from 'antd';

const { Text, Title } = Typography;

interface Todo {
  userId?: number;
  id: number;
  title: string;
  completed: boolean;
}

const ExampleApi = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(res => {
        setTodos(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Nie udało się pobrać danych');
        message.error('Nie udało się pobrać danych');
        setLoading(false);
      });
  }, []);

  const addTodo = () => {
    if (!newTitle.trim()) return;
    setLoading(true);
    axios
      .post<Todo>('https://jsonplaceholder.typicode.com/todos', {
        title: newTitle,
        completed: false,
      })
      .then(res => {
        setTodos([res.data, ...todos]);
        setNewTitle('');
        setLoading(false);
        message.success('Dodano zadanie');
      })
      .catch(() => {
        setError('Nie udało się dodać zadania');
        message.error('Nie udało się dodać zadania');
        setLoading(false);
      });
  };

  const toggleComplete = (id: number) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    setLoading(true);
    axios
      .put<Todo>(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        ...todo,
        completed: !todo.completed,
      })
      .then(res => {
        setTodos(todos.map(t => (t.id === id ? res.data : t)));
        setLoading(false);
        message.success('Zaktualizowano zadanie');
      })
      .catch(() => {
        setError('Nie udało się zaktualizować zadania');
        message.error('Nie udało się zaktualizować zadania');
        setLoading(false);
      });
  };

  const deleteTodo = (id: number) => {
    setLoading(true);
    axios
      .delete(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
        setLoading(false);
        message.success('Usunięto zadanie');
      })
      .catch(() => {
        setError('Nie udało się usunąć zadania');
        message.error('Nie udało się usunąć zadania');
        setLoading(false);
      });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  return (
    <Row justify="center" style={{ padding: '24px' }}>
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
<Card style={{ borderRadius: 8, marginBottom: 24 }}>
          <Title level={3} style={{ textAlign: 'center', marginBottom: 24 }}>
            Moja lista TODO
          </Title>

          <Space.Compact style={{ marginBottom: 20, width: '100%' }}>
            <Input
              placeholder="Nowe zadanie"
              value={newTitle}
              onChange={handleChange}
              disabled={loading}
              onPressEnter={addTodo}
            />
            <Button type="primary" onClick={addTodo} disabled={loading || !newTitle.trim()}>
              Dodaj
            </Button>
          </Space.Compact>

          {loading && (
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
<Spin spinning={loading} fullscreen tip="Ładowanie..." />
            </div>
          )}

          {error && (
            <Text type="danger" style={{ display: 'block', marginBottom: 20 }}>
              {error}
            </Text>
          )}

          <List
            bordered
            dataSource={todos}
            locale={{ emptyText: 'Brak zadań' }}
            renderItem={todo => (
              <List.Item
                actions={[
                  <Button
                    danger
                    type="text"
                    onClick={() => deleteTodo(todo.id)}
                    disabled={loading}
                    key="delete"
                  >
                    Usuń
                  </Button>,
                ]}
              >
                <Checkbox
                  checked={todo.completed}
                  onChange={() => toggleComplete(todo.id)}
                  disabled={loading}
                  style={{ marginRight: 12 }}
                />
                <Text delete={todo.completed}>{todo.title}</Text>
              </List.Item>
            )}
          />
</Card>
      </Col>
    </Row>
  );
};

export default ExampleApi;
