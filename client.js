
const endpoints = [{x: 1, y: 1}, {x: 0, y: 3}];

const connectors = [[{x: 1, y: 1}, {x: 1, y: 2}], [{x: 1, y: 2}, {x: 1, y: 3}], [{x: 1, y: 3}, {x: 0, y: 3}]];

// ===============================================================================================

// Convert RL to LR and BU to UB:
function getStandardEdge(edge) {
  if (edge[0].x == edge[1].x) {
    // Vertical:
    if (edge[0].y > edge[1].y) {
      const temp = edge[0].y;
      edge[0].y = edge[1].y;
      edge[1].y = temp;
    }
  } else {
    // Horizontal:
    if (edge[0].x > edge[1].x) {
      const temp = edge[0].x;
      edge[0].x = edge[1].x;
      edge[1].x = temp;
    }
  }
}

// ===============================================================================================

function getOtherPoint(point, edge) {
  if (edge[0].x == point.x && edge[0].y == point.y) return edge[1];
  else return edge[0];
}

// ===============================================================================================

function edgeInArray(e, arr) {
  if (e.length < 1) return false;
  for (let i=0; i < arr.length; i++) {
    if (arr[i][0].x == e[0].x && arr[i][0].y == e[0].y && arr[i][1].x == e[1].x && arr[i][1].y == e[1].y) return true;
  }
  return false;
}

// ===============================================================================================

function computeVertices(cell) {
  const UL = {pos: 'UL', x: cell.x    , y: cell.y    };
  const UR = {pos: 'UR', x: cell.x + 1, y: cell.y    };
  const BL = {pos: 'BL', x: cell.x    , y: cell.y + 1};
  const BR = {pos: 'BR', x: cell.x + 1, y: cell.y + 1};
  const vertices = [UL, UR, BL, BR];
  return vertices;
}

// ===============================================================================================

function computeEdges(cell) {
  const vertices = computeVertices(cell);
  const top    = [vertices[0], vertices[1]];
  const right  = [vertices[1], vertices[3]];
  const bottom = [vertices[2], vertices[3]];
  const left   = [vertices[0], vertices[2]];
  const edges   = [top, right, bottom, left];
  return edges;
}

// ===============================================================================================

function areConnected(v1, v2, occ_edges, path=[]) {
  let currentVtx = v1;
  const edges = computeEdges(currentVtx);

  const important_edges = edges.filter(e => edgeInArray(e, occ_edges));

  important_edges.forEach(edge => {
    // Will this work?
    currentVtx = getOtherPoint(currentVtx, edge);

    // NO! We should recurse here!!!
    const more_edges = computeEdges(currentVtx);
    more_edges.forEach(edge2 => {
      if (!edgeInArray(edge2, path)) {

      }

    });
  });

}

// ===============================================================================================

areConnected(endpoints[0], endpoints[1], connectors);

console.log(endpoints, connectors);
