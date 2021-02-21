class Node {
	constructor(value, adjacent = new Set()) {
		this.value = value;
		this.adjacent = adjacent;
	}
}

class Graph {
	constructor() {
		this.nodes = new Set();
	}

	// this function accepts a Node instance and adds it to the nodes property on the graph
	addVertex(vertex) {
		this.nodes.add(vertex);
	}

	// this function accepts an array of Node instances and adds them to the nodes property on the graph
	addVertices(vertexArray) {
		vertexArray.map((vertex) => this.addVertex(vertex));
	}

	// this function accepts two vertices and updates their adjacent values to include the other vertex
	addEdge(v1, v2) {
		v1.adjacent.add(v2);
		v2.adjacent.add(v1);
	}

	// this function accepts two vertices and updates their adjacent values to remove the other vertex
	removeEdge(v1, v2) {
		v1.adjacent.delete(v2);
		v2.adjacent.delete(v1);
	}

	// this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
	removeVertex(vertex) {
		this.nodes.delete(vertex);
		for (let node of this.nodes) {
			if (node.adjacent.has(vertex)) this.removeEdge(vertex, node);
		}
	}

	// this function returns an array of Node values using DFS
	depthFirstSearch(start) {
		let toVisitStack = [start];
		let seen = new Set(toVisitStack);
		let vals = [];

		while (toVisitStack.length) {
			let currNode = toVisitStack.pop();
			vals.push(currNode.value);
			for (let node of currNode.adjacent) {
				if (!seen.has(node)) {
					seen.add(currNode);
					if (!toVisitStack.includes(node)) {
						toVisitStack.push(node);
					}
				}
			}
		}
		return vals;
	}

	// this function returns an array of Node values using BFS
	breadthFirstSearch(start) {
		let toVisitQueue = [start];
		let seen = new Set(toVisitQueue);
		let vals = [];

		while (toVisitQueue.length) {
			let currNode = toVisitQueue.shift();
			vals.push(currNode.value);
			for (let node of currNode.adjacent) {
				if (!seen.has(node)) {
					seen.add(currNode);
					if (!toVisitQueue.includes(node)) {
						toVisitQueue.push(node);
					}
				}
			}
		}
		return vals;
	}
}

module.exports = { Graph, Node };
