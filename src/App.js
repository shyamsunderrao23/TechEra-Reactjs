import {Route, Switch} from 'react-router-dom'

import './App.css'
import TechEra from './Components/TechEra'
import Notfound from './Components/NotFound'
import CourseDetails from './Components/CourseDetails'
// import Header from './Components/Header'

const App = () => (
  <Switch>
    <Route exact path="/" component={TechEra} />
    <Route path="/courses/:id" component={CourseDetails} />
    <Route component={Notfound} />
  </Switch>
)

export default App
