import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import * as C from "./style";
import { FaArrowLeft} from 'react-icons/fa'
import api from "../../services/api";

const Repositorio = ({ match }) => {
  const [repositorioDetail, setRepositorioDetail] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState([
    {state: 'all', label: 'Todas', active: true},
    {state: 'open', label: 'Abertas', active: false},
    {state: 'closed', label: 'Fechadas', active: false},
  ])
  const [filterIndex, setFilterIndex] = useState(0)


  const { repositorio } = useParams();

  useEffect(() => {
    async function getRepositorio () {
      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${repositorio}`),
        api.get(`/repos/${repositorio}/issues`, {
          params: {
            state: filters.find(f => f.active).state,
            per_page: 5
          }
        })
      ])

      setRepositorioDetail(repositorioData.data);
      setIssues(issuesData.data);
      console.log(issuesData.data);
      setLoading(false)
    }

    getRepositorio()
  }, [])

  useEffect(() => {
    async function loadIssue() {
      const response = await api.get(`/repos/${repositorio}/issues`, {
        params: {
          state: filters[filterIndex].state,
          page,
          per_page: 5
        }
      })

      setIssues(response.data)
    }

    loadIssue()
  }, [page, filters, filterIndex])

  function handlePage(action) {
    setPage(action === 'back' ? page - 1 : page + 1)
  }

  console.log(page);

  function handleFilter(i){
    setFilterIndex(i)
  }

  if(loading){
    return(
      <C.Loading >
        <h1>Carregando...</h1>
      </C.Loading>
    )
  }

  return (
    <C.Container>
      <C.BackButton to='/' ><FaArrowLeft color="#000" size={30} /></C.BackButton>

      <C.Owner>
        <img src={repositorioDetail.owner.avatar_url} alt={repositorioDetail.owner.login} />
        <h1>{repositorioDetail.name}</h1>
        <p>{repositorioDetail.description}</p>
      </C.Owner>

      <C.Filter active={filterIndex}>
        {filters.map((filter, i) => (
          <button
            type="button"
            key={filter.label}
            onClick={() => handleFilter(i)}
          >
            {filter.label}
          </button>
        ))}
      </C.Filter>
      <C.IssuesList>
        {issues.map(issue => (
          <li key={String(issue.id)}>
            <img src={issue.user.avatar_url} alt={issue.user.login} />

            <div>
              <strong>
                <a href={issue.html_url} target="_blank">{issue.title}</a>

                {issue.labels.map(label => (
                  <span key={String(label.id)}>{label.name}</span>
                ))}

              </strong>

              <p>{issue.user.login}</p>
            </div>

          </li>
        ))}
      </C.IssuesList>
      <C.PageActions>
        <button 
          type="button" 
          onClick={() => handlePage('back')}
          disabled={page < 2}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage('next')}>
          Proxima
        </button>
      </C.PageActions>
    </C.Container>
  );
};

export default Repositorio;
