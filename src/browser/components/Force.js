import * as d3 from 'd3'
import React from 'react'

import { connect } from 'react-redux'
import { search, clear, fetch } from '../redux/graph'
import { simulate, feature, init, draw, populate } from '../../d3/utils'

class Force extends React.Component {

    componentDidUpdate() {
        this.populate(this.props.graph)
        this.draw()
        this.simulate()
    }

    componentDidMount() {
        this.width = window.innerWidth
        this.height = window.innerHeight

        this.svg = d3.select('svg')
        this.svg.attr('width', this.width).attr('height', this.height)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.init = init.bind(this)
        this.populate = populate.bind(this)
        this.draw = draw.bind(this)
        this.simulate = simulate.bind(this)
        this.search = this.props.search
        this.fetch = this.props.fetch
        

        // simulation setup with all forces
        this.linkForce = this.init(feature.LINK_FORCE)
        this.simulation = this.init(feature.SIMULATION)
        this.dragDrop = this.init(feature.DRAG_DROP)

        // we use this.svg groups to logically group the elements together
        this.linkGroup = this.svg.append('g').attr('class', 'links')
        this.nodeGroup = this.svg.append('g').attr('class', 'nodes')
        this.textGroup = this.svg.append('g').attr('class', 'texts')

        this.nodes = []
        this.links = []

        this.modal = false
    }

    handleSubmit(event) {
        event.preventDefault()
        this.nodes = []
        this.links = []
        this.props.clear()
    }

    render() { 
        return (
            <div>
                <form onSubmit={event => this.handleSubmit(event)}>
                    <button type="submit">Clear Now</button>
                </form>
                <div className="modal" style={{display: this.modal ? 'block' : 'none'}} id="myModal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <span className="close" onClick={this.modal = false}>&times;</span>
                            <h2>The Real Freakin' Deal</h2>
                        </div>
                        <div className="modal-body">
                            <p>Some text in the Modal Body</p>
                            <p>Some other text...</p>
                        </div>
                        <div className="modal-footer">
                            <h3>Modal Footer</h3>
                        </div>
                    </div>
                </div>
            </div>
        ) 
    }
}

const mapProps = ({ graph }) => ({ graph })
const mapDispatch = { search, clear, fetch }
export default connect(mapProps, mapDispatch)(Force)