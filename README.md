# Zolplay React Interview Challenge

## About

In this exercise, we will be building a simple React app that will allow us to search for GitHub repositories and display the results.

The project is bootstrapped with [Next.js](https://nextjs.org/).

## Tech Stack

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Headless UI](https://headlessui.dev/)

## Set up for development

```bash
pnpm i
pnpm dev
```

## Features:

- Implement real-time search functionality using React hooks and other techniques (API endpoint: /api/search?q={query}).
- Filter search results based on the user's input, displaying only matching items.
- The app should display the name of the repository, the creator, the number of stars, the number of issues, and the number of forks.
- When hitting `Enter`, we should open the selected GitHub repository in a new tab.

- ✨ Optional (if you have extra time):
  - Add basic animations or transitions for improved user experience.
  - Highlight matched keywords within the search results.
  - Implement search history, we should have the most recent searches when the query is empty.
  - Use Compound Components structure (e.g. <Menu.Root><Menu.Item /></Menu.Root>)
    Support keyboard shortcut (e.g. ⌘ + K or Ctrl + K)
