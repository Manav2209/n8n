//@ts-ignore
export function cleanNodes(nodes) {
    return nodes.map(({ measured, dragging, selected, resizing, ...rest }) => rest);
  }