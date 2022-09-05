export class Graph {
  vertices: string[];
  adjacent: { [vertex: string]: string[] };

  constructor() {
    this.vertices = [];
    this.adjacent = {};
  }

  addVertex(v: string) {
    this.vertices.push(v);
    this.adjacent[v] = [];
  }

  addEdge(v: string, w: string) {
    if (!this.adjacent[v]) {
      this.adjacent[v] = [];
    }
    if (!this.adjacent[w]) {
      this.adjacent[w] = [];
    }
    if (!this.adjacent[v].includes(w)) {
      this.adjacent[v].push(w);
    }
    if (!this.adjacent[w].includes(v)) {
      this.adjacent[w].push(v);
    }
  }

  dfs(
    goal: string,
    v: string,
    discovered: { [key: string]: boolean } = {},
    recStack: { [key: string]: boolean } = {}
  ) {
    if (recStack[v]) {
      console.log(Object.keys(recStack));
      return true;
    }

    if (discovered[v]) {
      return false;
    }

    discovered[v] = true;
    recStack[v] = true;
    let adj = this.adjacent;

    for (let i = 0; i < adj[v].length; i++) {
      let w = adj[v][i];

      if (this.dfs(goal, w, discovered, recStack)) {
        return true;
      }
    }
    recStack[v] = false;
    return false;
  }
}
