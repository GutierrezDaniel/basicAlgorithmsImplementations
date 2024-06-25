import { expect, test } from 'vitest';
import { appendDirectChildrenTo } from "../src/dijkstraCheapestPath"

const exampleGraph = {
    nodeStart: {
        costs: 10,
        parent: []
    },
    nodeA: {
        costs: 10,
        parent: ["nodeStart"]
    },
    nodeB: {
        costs: 10,
        parent: ["nodeStart"]
    },
    nodeC: {
        costs: 10,
        parent: ["nodeA"]
    },
    nodeD: {
        costs: 10,
        parent: ["nodeB"]
    },
};

const expectedGraph = {
    nodeStart: {
        costs: 10,
        parent: [],
        children:["nodeA", "nodeB"],
    },
    nodeA: {
        costs: 10,
        parent: ["nodeStart"],
        children:["nodeC"],
    },
    nodeB: {
        costs: 10,
        parent: ["nodeStart"],
        children:["nodeD"],
    },
    nodeC: {
        costs: 10,
        parent: ["nodeA"],
        children:[],
    },
    nodeD: {
        costs: 10,
        parent: ["nodeB"],
        children:[],
    },   
}

test('each node contains a new "reference" to its direct children', () => {
    const result = appendDirectChildrenTo(exampleGraph);
    console.log('aaa', JSON.stringify(result, null, 2))
    expect(result).toEqual(expectedGraph);
})