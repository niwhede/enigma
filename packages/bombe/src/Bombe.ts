// type Node = string;

type Edge = {
  weight: number;
  nodes: [Node, Node];
};

// type Graph = Edge[];

type Node = string;

class Graph {
  adjList: Edge[] = [];
  nodes: Node[] = [];

  addNode(value: string) {
    this.nodes.push(value);
  }

  addEdge(node1: string, node2: string, weight: number) {
    this.adjList.push();
  }
}

export class Bombe {
  message: string;
  crib: string;

  constructor(message: string, crib: string) {
    this.message = message;
    this.crib = crib;
  }

  decode() {
    const graph = this.createGraph();
    // const loops = this.findLoops(graph);
    console.log("graph", graph);
  }

  createGraph() {
    // const edges: Edge[] = [];
    // for (let i = 0; i < this.message.length; i++) {
    //   edges.push({ weight: i, nodes: [this.message[i], this.crib[i]] });
    // }
    // return edges;
  }

  findLoops(graph: Graph) {}
}
