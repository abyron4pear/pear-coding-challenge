export function sortTodos(a, b) {

    if (a.isPriority && !b.isPriority) {
        return -1;
    } else if (!a.isPriority && b.isPriority) {
        return 1;
    }
  
    return a.order - b.order;
}