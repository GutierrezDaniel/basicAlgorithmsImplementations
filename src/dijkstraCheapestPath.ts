
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

export function pickNearestChildren(
    children: string[],
    parentCost: number,
    getNodeCost: (nodeName: keyof NodesGraph) => number): [string, number] | [] {

    if (!children.length) return []
    const pickCheapestNode = (previusNode: [string, number], currentName: keyof NodesGraph, indx: number) => {
        const [node, cost] = previusNode;
        const retorna: [string, number] = [node + indx, cost + indx || 0];
        console.log('first', JSON.stringify({ retorna, previusNode, type: typeof previusNode }, null, 2));
        return retorna;
    }
    return children.reduce(pickCheapestNode, ['aa', Infinity])
}

export const getNodeCost = (graphWithSubNodes: NodesGraph) => (nodeToFind: keyof NodesGraph) => (graphWithSubNodes[nodeToFind].costs)

export function findCheapestPath(graphWithSubNodes: NodesGraph) {
    const getNodeCostCurried = getNodeCost(graphWithSubNodes);
    let [[startName, startValue], ...arrayOfNodes]: [keyof NodesGraph, NodeValue][] = Object.entries(graphWithSubNodes) || [];
    const cost = { [startName]: startValue.costs };
    const processedNodes = [];
    while (arrayOfNodes.length) {
        const [nodeName, { costs, parent, children = [] }]: [keyof NodesGraph, NodeValue] = arrayOfNodes.shift();
        const nearestNode = pickNearestChildren(children, costs, getNodeCostCurried)
    }
}

function dijkstraCheapestPath(weightedGraph: NodesGraph) {
    const graphWithSubNodes = appendDirectChildrenTo(weightedGraph);
    findCheapestPath(graphWithSubNodes);
}

dijkstraCheapestPath(nodesGraph);