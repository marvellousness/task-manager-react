### Summary

- Adds an optional description field to the Task type and wires it through TaskForm, TaskManager, and TaskItem so users can add an optional description when creating a task and see it in the task list.

### Files changed

- `src/types/task.ts` — added `description?: string` to Task
- `src/components/TaskForm.tsx` — added description textarea and passed description to onAddTask
- `src/TaskManager.tsx` — accept description in addTask and store it on new tasks
- `src/components/TaskItem.tsx` — render description (if present) under the title

### Notes

- Existing tasks stored in localStorage before this change will continue to work (description will be undefined).
- Editing currently only supports editing the title. If you want editing for descriptions I can add it in a follow-up.
- No migration required for stored tasks.

### How to test locally

1. Checkout branch:
   `git fetch origin`
   `git checkout -b add-task-description origin/add-task-description`
2. Install and run:
   `npm install`
   `npm run dev`
3. In the app, add a new task, expand priority (focus the input), fill in the description textarea, submit, and verify the description displays below the title.
4. Verify filters (all/active/completed) still function and group-by-date UI is unchanged.

### Suggested reviewers/labels

- **Reviewers:** @marvellousness
- **Labels:** enhancement, frontend