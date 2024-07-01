
type NodesGraph = Record<string, NodeValue>
type NodeValue = { costs: number, parent: Array<keyof NodesGraph>, children?: Array<keyof NodesGraph> }
export const nodesGraph: NodesGraph = {
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
export const getNodeCost = (graphWithSubNodes: NodesGraph) => (nodeToFind: keyof NodesGraph) => (graphWithSubNodes[nodeToFind].costs)

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

function createBaseCosts(graphWithSubNodes: NodesGraph) {
    const { children = [] } = graphWithSubNodes["nodeStart"];
    const arrayOfNodes = Object.entries(graphWithSubNodes) || [];
    return Object.assign({},
        ...arrayOfNodes.map(([nodeName]) => ({ [nodeName]: Infinity })),
        ...children.map(nodeName => ({ [nodeName]: graphWithSubNodes[nodeName].costs })),
        { nodeStart: 0 }
    );
};

function createBaseParents(graphWithSubNodes: NodesGraph) {
    const { children = [] } = graphWithSubNodes["nodeStart"];
    return Object.assign({},
        ...(children.map(nodeName => ({ [nodeName]: "nodeStart" })))
    );
}

export function findCheapestNode(
    costs: Record<keyof NodesGraph, number>,
    processed: Array<keyof NodesGraph>) {

    let lowestCost = Infinity;
    let lowestCostNode = 'nodeEnd';
    const arrayOfNodes = Object.entries(costs);
    for (let nodeIndex in arrayOfNodes) {
        const [nodeName, nodeCost] = arrayOfNodes[nodeIndex];
        if (nodeCost < lowestCost && !processed.includes(nodeName)) {
            lowestCost = nodeCost;
            lowestCostNode = nodeName;
        }
    }
    return lowestCostNode;
}

export function findCheapestPath(graphWithSubNodes: NodesGraph) {
    const getNodeCostCurried = getNodeCost(graphWithSubNodes);
    const costs = createBaseCosts(graphWithSubNodes);
    const parents = createBaseParents(graphWithSubNodes);
    const processed: Array<keyof NodesGraph> = [];
    let currentNode = findCheapestNode(costs, processed);
    while (currentNode !== "nodeEnd") {
        const cost = costs[currentNode];
        const { children = [] } = graphWithSubNodes[currentNode];
        children.forEach(nodeName => {
            const newCost = cost + getNodeCostCurried(nodeName);
            if (costs[nodeName] > newCost) {
                costs[nodeName] = newCost;
                parents[nodeName] = currentNode;
            }
        });
        processed.push(currentNode);
        currentNode = findCheapestNode(costs, processed);
    }
    return [parents, costs]
}

export function dijkstraCheapestPath(weightedGraph: NodesGraph) {
    const graphWithSubNodes = appendDirectChildrenTo(weightedGraph);
    const parentsAndCosts = findCheapestPath(graphWithSubNodes);
    return parentsAndCosts;
}

dijkstraCheapestPath(nodesGraph);