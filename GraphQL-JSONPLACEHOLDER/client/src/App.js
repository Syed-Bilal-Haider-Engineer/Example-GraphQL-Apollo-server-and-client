import React from 'react';
import { useQuery, gql } from '@apollo/client';
import './App.css';

function App() {
  const query = gql`
    query ExampleQuery {
      getTodoList {
        completed
        id
        title
        user {
          email
          id
          phone
        }
      }
    }
  `;
  
  const { data, loading } = useQuery(query);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <table style={{ width: '90%', borderCollapse: 'collapse', marginTop: '20px',margin:'auto' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>ID</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Title</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Completed</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>User Email</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>User Phone</th>
          </tr>
        </thead>
        <tbody>
          {data.getTodoList.slice(0,10).map((todo) => (
            <tr key={todo.id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.id}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.title}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.completed ? 'Yes' : 'No'}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.user.email}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{todo.user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
