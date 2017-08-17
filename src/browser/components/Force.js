import { connect } from 'react-redux';
import React from 'react';
import * as d3 from 'd3'


let baseNodes = []
let baseLinks = []
let nodes
let links
let width
let height
let svg

let linkElements,
    nodeElements,
    textElements

let linkGroup
let nodeGroup
let textGroup

let selectedId
let linkForce
let simulation

let dragDrop

let live = false


const Force = ({ graph }) => {

    if (!Object.keys(graph).length) return null

    if (nodeGroup) {
        nodeGroup.remove()
        textGroup.remove()
        linkGroup.remove()
    }

    graph.forEach((concept, group) => {
        const center = { id: concept.name.toLowerCase(), group, label: concept.name.toUpperCase(), level: 1 }
        concept.children.forEach(relation => {
            baseLinks.push({ target: center.id, source: relation.name.toLowerCase(), strength: 0.1 })
            baseNodes.push({ id: relation.name.toLowerCase(), group: 0, label: relation.name, level: 2 })
        })
        baseNodes.push(center)
    })

    nodes = [...baseNodes]
    links = [...baseLinks]

    width = window.innerWidth
    height = window.innerHeight

    svg = d3.select('svg')
    svg.attr('width', width).attr('height', height)

    // we use svg groups to logically group the elements together
    linkGroup = svg.append('g').attr('class', 'links')
    nodeGroup = svg.append('g').attr('class', 'nodes')
    textGroup = svg.append('g').attr('class', 'texts')

    // simulation setup with all forces
    linkForce = d3
        .forceLink()
        .id(function (link) { return link.id })
        .strength(function (link) { return link.strength })

    simulation = d3
        .forceSimulation()
        .force('link', linkForce)
        .force('charge', d3.forceManyBody().strength(-50))
        .force('center', d3.forceCenter(width / 2, height / 2))

    dragDrop = d3.drag().on('start', function (node) {
        node.fx = node.x
        node.fy = node.y
    }).on('drag', function (node) {
        simulation.alphaTarget(0.7).restart()
        node.fx = d3.event.x
        node.fy = d3.event.y
    }).on('end', function (node) {
        if (!d3.event.active) {
            simulation.alphaTarget(0)
        }
        node.fx = null
        node.fy = null
    })

    // last but not least, we call updateSimulation
    // to trigger the initial render
    updateSimulation()
    live = true

    baseNodes = []
    baseLinks = []
    return null
}

function updateGraph() {
    // links
    linkElements = linkGroup.selectAll('line')
        .data(links, function (link) {
            return link.target.id + link.source.id
        })

    linkElements.exit().remove()

    const linkEnter = linkElements
        .enter().append('line')
        .attr('stroke-width', 1)
        .attr('stroke', 'rgba(50, 50, 50, 0.2)')

    linkElements = linkEnter.merge(linkElements)

    // nodes
    nodeElements = nodeGroup.selectAll('circle')
        .data(nodes, function (node) { return node.id })

    nodeElements.exit().remove()

    const nodeEnter = nodeElements
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('fill', function (node) { return node.level === 1 ? 'red' : 'gray' })
        .call(dragDrop)
        .on('click', () => { })

    nodeElements = nodeEnter.merge(nodeElements)

    // texts
    textElements = textGroup.selectAll('text')
        .data(nodes, function (node) { return node.id })

    textElements.exit().remove()

    const textEnter = textElements
        .enter()
        .append('text')
        .text(function (node) { return node.label })
        .attr('font-size', 15)
        .attr('dx', 15)
        .attr('dy', 4)

    textElements = textEnter.merge(textElements)
}

function updateSimulation() {
    updateGraph()

    simulation.nodes(nodes).on('tick', () => {
        nodeElements
            .attr('cx', function (node) { return node.x })
            .attr('cy', function (node) { return node.y })
        textElements
            .attr('x', function (node) { return node.x })
            .attr('y', function (node) { return node.y })
        linkElements
            .attr('x1', function (link) { return link.source.x })
            .attr('y1', function (link) { return link.source.y })
            .attr('x2', function (link) { return link.target.x })
            .attr('y2', function (link) { return link.target.y })
    })

    simulation.force('link').links(links)
    simulation.alphaTarget(0.7).restart()
}

const mapProps = store => ({ graph: store.graph })
const mapDispatch = null
export default connect(mapProps, mapDispatch)(Force)
