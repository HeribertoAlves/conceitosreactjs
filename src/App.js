import React, { useState, useEffect }  from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]);

  function getRepositories() {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    });
  }

  useEffect(getRepositories, []);

  async function handleAddRepository() {
    const response = await api.post('/repositories', { 
      title: `Desafio ${Date.now()}`,
      url: "http://github.com/...",
      techs: [
        "Node.js",
        "ReactJS"
      ]
    });

    setRepositories([...repositories, response.data]);

  }

  async function handleRemoveRepository(id) {
    console.log(`valor do ${id}`)
    const oldRepository = [...repositories];
    const repositoryIndex = oldRepository.findIndex(r => r.id === id);

    if(repositoryIndex > -1) {
      console.log(repositoryIndex)
      const response = await api.delete(`/repositories/${id}`);

      if(response.status === 204) {
        oldRepository.splice(repositoryIndex, 1);
      }

      setRepositories([...oldRepository]);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ id, title}) => {
          return (
            <li key={id} >
              {title}

              <button onClick={() => handleRemoveRepository(id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
