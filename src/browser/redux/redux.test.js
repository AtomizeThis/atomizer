import { expect } from 'chai'
import { createStore } from 'redux'

import { complete, clear, SUGGEST, CLEAR } from '../src/browser/redux/completions'
import { update, clearGraph, UPDATE, CLEARGRAPH } from '../src/browser/redux/graph'
import mainReducer from '../src/redux'

const completions1 = ['completion1', 'completion2', 'completion3']
const completions2 = ['completion4', 'completion5', 'completion6']

const data1 = {
  title: 'string1',
  relations: ['child1', 'child2', 'child3']
}
const data2 = {
  title: 'string2',
  relations: ['child4', 'child5', 'child6']
}
const data3 = {
  title: 'string3',
  relations: ['child7', 'child8', 'child9']
}

describe('Action Creators', () => {

    describe('complete', () => {
      
      it('returns properly formatted action', () => {
        const completions1 = ['completion1', 'completion2', 'completion3']        
        expect(complete(completions1)).to.be.deep.equal({
            type: 'SUGGEST',
            animal : completions1
        })
      })  
        
      it('returns properly formatted action', () => {
        const completions2 = []        
        expect(complete(completions2)).to.be.deep.equal({
            type: 'SUGGEST',
            animal : completions2
        })
      })
    })

    describe('clear', () => {

    })

    describe('update', () => {

    })


    describe('clearGraph', () => {

    })

})

describe('Main Reducer', () => {

  const initialState = {
    all: {},
    update: {
      all: {},
      updated: {
        parent: null,
        links: [],
        nodes: {}
      }
    }
  }

    describe('Completions Reducer', () => {
      
    })

    describe('Graph Reducer', () => {

    })

})
