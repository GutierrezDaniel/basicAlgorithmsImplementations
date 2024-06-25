
type NodesGraph = Record<string, NodeValue>
type NodeValue = { costs: number, parent: Array<keyof NodesGraph>, children?: Array<keyof NodesGraph> }
const nodesGraph: NodesGraph = {
    nodeStart: {
        costs: 0,
        parent: []
    },
    nodeA: {
        costs: 20,
        parent: ["nodeStart"]
    },
    nodeB: {
        costs: 40,
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
    nodeF: {
        costs: 20,
        parent: ["nodeA"]
    },
    nodeG: {
        costs: 5,
        parent: ["nodeF", "nodeD"]
    },
    nodeH: {
        costs: 10,
        parent: ["nodeB"]
    },
    nodeI: {
        costs: 15,
        parent: ["nodeH"]
    },
    nodeJ: {
        costs: 25,
        parent: ["nodeD"]
    },
    nodeEnd: {
        costs: 0,
        parent: ["nodeG", "nodeI"]
    }
}
//  (nodeA: 20) --> (nodeC: 10)
//              --> (nodeF: 20) --> (nodeG: 5) --> (nodeEnd: 0)
//  (nodeB: 40) --> (nodeD: 10) --> (nodeJ: 25)
//              --> (nodeH: 10) --> (nodeI:15) --> (nodeEnd: 0)  

const graphClone = (objectToClone: NodesGraph) => JSON.parse(JSON.stringify(objectToClone));

export function appendDirectChildrenTo(weightedGraph: NodesGraph) {
    const clonedGraph = graphClone(weightedGraph);
    const entries: [keyof NodesGraph, NodeValue][] = Object.entries(clonedGraph);
    entries.forEach(([nodeName, nodeContent]) => {
        const children = nodeContent?.children || [];
        clonedGraph[nodeName].children = children;

        const parentsToConnect = nodeContent.parent;
        if (parentsToConnect.length) {
            parentsToConnect.forEach(parentNodeName => {
                const previusConnections = clonedGraph[parentNodeName]?.children || [];
                clonedGraph[parentNodeName].children = [...previusConnections, nodeName]
            });
        }
    });
    return clonedGraph;
}

function dijkstraCheapestPath(weightedGraph: NodesGraph) {
    const graphWithSubNodes = appendDirectChildrenTo(weightedGraph);
}