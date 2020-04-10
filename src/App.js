import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(()=> {
    api.get('/repositories').then(res =>{
      setRepositories(res.data);
    });

  }, []);

  /*axios mock adapter = consegue fazer a aplicacao identificar uma chamada api e retornar outra resposta, o teste funciona como um ficticio backend
  */

  async function handleAddRepository() {
    // TODO
    const response = await api.post('/repositories', {
      title: "Front-end Developer",
      url: "http://qualquercoisa.com/henriquepe",
      techs: ["React", "Angular", "Vue.js"]
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
    
  }

  async function handleRemoveRepository(id) {
    // TODO
    //handleRemoveRepository(repository.id)}
    await api.delete(`/repositories/${id}`);

    setRepositories(repositories.filter(repository => repository.id !== id))

  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

