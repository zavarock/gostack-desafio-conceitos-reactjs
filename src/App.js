import React, {useEffect, useState} from "react";

import "./styles.css";

import api from "./services/api";

function App() {
    const [repositories, setRepositories] = useState([]);

    useEffect(() => {
        api.get('/repositories').then((response) => {
            setRepositories(response.data);
        });
    }, []);

    async function handleAddRepository() {
        const newRepository = await api.post('/repositories', {
            title: `Novo repositório ${Date.now()}`,
            url: 'https://github.com/zavarock/desafio-02-gostack-reactjs',
            techs: ['nodejs']
        });

        setRepositories([...repositories, newRepository.data]);
    }

    async function handleRemoveRepository(id) {
        await api.delete(`/repositories/${id}`);

        setRepositories(repositories.filter(repository => repository.id !== id));
    }

    return (
        <>
            <ul data-testid="repository-list">
                {repositories.map(repository => (
                    <li key={repository.id}>
                        {repository.title}
                        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
                    </li>
                ))}
            </ul>
            <br />
            <button onClick={handleAddRepository}>Adicionar</button>
        </>
    );
}

export default App;
