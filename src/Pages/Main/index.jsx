import React, { useCallback, useEffect, useState } from "react";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import * as C from "./style";

import api from "../../services/api";
import { Link } from "react-router-dom";

const Main = () => {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);

  // Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos')
    
    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage))
    }
  }, [])
  
  const handleInputChange = (e) => {
    setNewRepo(e.target.value)
    setAlert(false)
  } 


  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      async function submit() {
        setLoading(true);
        setAlert(false)
        try {

          if(newRepo === ''){
            throw new Error('Você precisa indicar um repositorio!')
          }

          const response = await api.get(`repos/${newRepo}`)

          const hasRepo = repositorios.find(repos => repos.name === newRepo)

          if(hasRepo){
            throw new Error('Repositorio já foi adicionado')
          }

          const data = {
            name: response.data.full_name,
          };

          const newArray = [...repositorios, data]
          setRepositorios(newArray);
          localStorage.setItem('repos', JSON.stringify(newArray))
          setNewRepo("");
        } catch (error) {
          setAlert(true)
          console.log(error);
        } finally {
          setLoading(false);
        }
      }

      submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback((name) => {
    const newArray = repositorios.filter(repos => repos.name !== name)

    setRepositorios(newArray)
    localStorage.setItem('repos', JSON.stringify(newArray))
  }, [repositorios])

  return (
    <div>
      <C.Container>
        <h1>
          <FaGithub size={25} />
          Meus Repositorios
        </h1>

        <C.Form onSubmit={handleSubmit} error={alert}>
          <input
            type="text"
            placeholder="Adicionar Repositorios"
            value={newRepo}
            onChange={handleInputChange}
          />

          <C.SubmitButton loading={loading}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </C.SubmitButton>
        </C.Form>
        <C.List>
          {repositorios.map((repo, i) => (
            <li key={i}>
              <span>
                <C.DeleteButton onClick={() => handleDelete(repo.name)}>
                  <FaTrash />
                </C.DeleteButton>{" "}
                {repo.name}
              </span>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
                <FaBars size={20} />
              </Link>
            </li>
          ))}
        </C.List>
      </C.Container>
    </div>
  );
};

export default Main;
