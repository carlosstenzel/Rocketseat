import React from 'react';
import api from './services/api';

import './App.css';

import Header from './components/header';

function App() {

  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    }) 
  }, []);

  function handleAddProject(){ß
    setProjects( [
        ...projects, 
        `Novo projeto ${Date.now()}`
      ]);
  }

  return (
    <>
      <Header title="Home" />
      
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  )
}

export default App;