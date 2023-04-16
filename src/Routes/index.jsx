import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from '../Pages/Main'
import Repositorio from '../Pages/Repositorio'

const RoutesApp = () =>  {
    return (
        <BrowserRouter>
            <Routes> 
                <Route path='/' element={ <Main />}/>
                <Route path='/repositorio/:repositorio' element={ <Repositorio />}/>
            </Routes>
        </BrowserRouter>
    )
}
 
export default RoutesApp