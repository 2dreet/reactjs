import React, { useEffect, useState } from 'react';
import './App.css';
// import backGroundImage from './assets/image.jpg';
import Header from './components/Header.js';
import api from './services/api.js';

/**
 * 
 * Componente
 * Propiedade
 * Estado e Imutabilidade
 */
function App(){
    const [ projects, setProjects ] = useState([]);

    // Utilizado para disparar eventos
    // no primeiro paramentro é a função a ser executada
    // no segundo parametro é quando a função deve ser executada
    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        })
    }, []);

    // useState retorno um array como 2 posições
    //
    //  1. Variável com o seu valor inicial
    //  2. Função para atualizar esse valor
    // Imutabilidade é não alterar de forma direta uma variável e sim
    // utilizar funções para isso
    // 
    // no Exemplo a baixo é copiado tudo de projects e depois 
    // add um novo project
    
    async function handleAddProject() {
        // setProjects([...projects, `Novo Projeto ${Date.now()}`]);
        // console.log(projects);
        const response = await api.post('projects', { 
            message : `Novo Projeto ${Date.now()}` 
        });

        const project = response.data;
        setProjects([...projects, project]);
    }

    return (
        <>
            <Header title="Projects" />
            {/* <img src={backGroundImage} width={300}/> */}
            <ul>
                {
                    /* Aqui tem um exemplo de criação de uma lista 
                    todo componente criado a partir de uma lista
                    deve ter o atributo key */
                    projects.map(project => <li key={project.id} > { project.message } </li>)
                }
            </ul>
            {/* Aqui cria um botão que irá chamar a função handleAddProject */}
            <button type="button" onClick={handleAddProject}> Adicionar Projetos </button>
        </>
    );
}

export default App;