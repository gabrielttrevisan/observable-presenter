export type TodoStatus = "to-be-done" | "undone" | "doing" | "done";

export type Todo = {
  id: string;
  title: string;
  description: string;
  status: TodoStatus;
};

export const createId = () => {
  return Array.from({ length: 16 })
    .map((_) =>
      Math.floor(Math.random() * 255 + 0)
        .toString(16)
        .padStart(2, "0")
    )
    .join("");
};

export function createTodo(title: string, description: string): Todo {
  return {
    id: createId(),
    title,
    description,
    status: "to-be-done",
  };
}
