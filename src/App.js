import {Route, Switch, Redirect} from 'react-router-dom'
import './App.css'

import Home from './Components/Home/index'
import NotFound from './Components/NotFound/index'
import TravelCardDetails from './Components/TravelCardDetails/index'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/courses/:id" component={TravelCardDetails} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
