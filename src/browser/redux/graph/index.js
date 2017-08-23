import axios from "axios"
import foc from './utils' // findOrCreate

const UPDATE = 'UPDATE_KNOWLEDGE_GRAPH'
const CLEAR = 'CLEAR_KNOWLEDGE_GRAPH'
const FETCH_INFO = 'FETCH_MODAL_INFORMATION'

const update = parentNode => ({ type: UPDATE, parentNode })
export const clear = _ => ({ type: CLEAR })
const info = info => ({ type: FETCH_INFO, info })

const initialState = {
    // total graph
    all: {},
    // new nodes to be updated based on query
    updated: {
        // the source of new links
        parent: null,
        // the links of the updated group
        links: [],
        // and the nodes
        nodes: {}
    },
    // selected node
    selected: {}
}

const reducer = (graph = initialState, action) => {

    switch (action.type) {
        case UPDATE:
            const newGraph = Object.assign(
                {},
                graph, // make a copy of graph to avoid mutation of reducer state
                { updated: { links: [], nodes: {}, parent: null } }) // clear updated links/nodes 
            // find or create with new graph as 'this' context
            const findOrCreate = foc.bind(newGraph)
            // find/create the root node
            const parent = findOrCreate(action.parentNode.title)
            // add all relations to adjacency list
            newGraph.updated.links = parent.adj = action.parentNode.relations.map(findOrCreate)
            newGraph.updated.parent = parent

            return newGraph
        case CLEAR:
            return initialState

        case FETCH_INFO:
            return Object.assign({}, graph, { selected: action.info })

    }
    return graph
}

export const search = query => dispatch => {
    axios.get(`/wiki?input=${query}`)
        .then(res => dispatch(update(res.data)))
        .catch(console.error)
}

export const fetch = article => dispatch => {
    axios.get(`/data?input=${article}`)
        .then(res => dispatch(info(res.data)))
        .catch(console.error)
}

export default reducer