import { expect, test } from 'vitest';
import { appendDirectChildrenTo, nodesGraph, findCheapestPath, findCheapestNode, dijkstraCheapestPath } from "../src/dijkstraCheapestPath"

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
        children: ["nodeA", "nodeB"],
    },
    nodeA: {
        costs: 10,
        parent: ["nodeStart"],
        children: ["nodeC"],
    },
    nodeB: {
        costs: 10,
        parent: ["nodeStart"],
        children: ["nodeD"],
    },
    nodeC: {
        costs: 10,
        parent: ["nodeA"],
        children: [],
    },
    nodeD: {
        costs: 10,
        parent: ["nodeB"],
        children: [],
    },
}

test('each node contains a new "reference" to its direct children', () => {
    const result = appendDirectChildrenTo(exampleGraph);
    expect(result).toEqual(expectedGraph);
});

test('check findCheapestNode()', () => {
    const inputNode = { "nodeStart": 0, "nodeA": 10, "nodeB": 5 }
    const processed = [];
    const result = findCheapestNode(inputNode, processed);
    expect(result).toEqual("nodeStart");
});
test('check findCheapestNode() with processed node', () => {
    const inputNode = { "nodeStart": 0, "nodeA": 10, "nodeB": 5 }
    const processed = ["nodeStart"];
    const result = findCheapestNode(inputNode, processed);
    expect(result).toEqual("nodeB");
});

test('check dijkstraCheapestPath()', () => {
    const example: Record<string, { costs: number, parent: string[] }> = {
        nodeStart: {
            costs: 0,
            parent: [],
        },
        nodeA: {
            costs: 10,
            parent: ["nodeStart"],
        },
        nodeB: {
            costs: 15,
            parent: ["nodeStart"],
        },
        nodeC: {
            costs: 5,
            parent: ["nodeB"]
        },
        nodeD: {
            costs: 15,
            parent: ["nodeA"]
        },
        nodeE: {
            costs: 25,
            parent: ["nodeA"]
        },
        nodeF: {
            costs: 2,
            parent: ["nodeD"]
        },
        nodeG: {
            costs: 10,
            parent: ["nodeC"]
        },
        nodeEnd: {
            costs: 10,
            parent: ["nodeG", "nodeF"]
        },
    };
    //                   (nodeA: 10) -> (nodeD: 15) ->
    //                                  (nodeE: 25)    (nodeF: 2) ->  costs: 27  it should choose this path
    // (nodeStart: 0) ->                                               (nodeEnd)
    //                   (nodeB: 15) -> (nodeC: 5) ->  (nodeG: 10) ->  costs: 30
    //
    //
    const [parents, costs] = dijkstraCheapestPath(example);    
    const result = [parents['nodeEnd'], costs[parents['nodeEnd']]];
    expect(result).toEqual(["nodeF", 27]);
});