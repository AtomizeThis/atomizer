import { combineReducers } from 'redux'
import graph from './graph'
import completions from './completions'
import diagram from './diagram'
// OB/SB: diagram could just be a function that coverts graph into correct format

export default combineReducers({ graph, completions, diagram });
