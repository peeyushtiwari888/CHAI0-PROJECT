import { useMutation } from "@tanstack/react-query";

export type Project = {
  id: string;
};

export function useCreateProject() {
  return useMutation<Project, Error, string>({
    mutationFn: async (prompt) => {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error("Unable to create the project.");
      }

      return response.json() as Promise<Project>;
    },
  });
}
