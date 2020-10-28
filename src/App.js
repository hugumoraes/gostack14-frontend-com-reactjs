import React, { useState, useEffect } from 'react';
import api from './services/api';

import './App.css';

import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    }).catch();
  }, []);

  async function handleAddProject() {
    // setProjects([...projects, `${Date.now()} - Novo projeto`]);

    const response = await api.post('/projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Hugo Moraes Bonatto'
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Homepage" />

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar projeto</button>
    </>
  );
}

export default App;