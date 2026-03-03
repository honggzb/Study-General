[React typescript -1. Everyday TypeScript Mechanics](#top)


- <mark>Let inference work for primitives</mark>: `useState(0)`, `useState('')`, `useState(false)`
- <mark>Be explicit with unions</mark>: `useState<Status>('idle')`
- <mark>Always type empty containers</mark>: `useState<T[]>([])`, `useState<Partial<T>>({})`
- <mark>Use discriminated unions for complex state</mark>: Prevent impossible state combinations
- <mark>Prefer functional updates</mark>: They’re safer and get better type checking
- <mark>Define types separately</mark>: Make them reusable and improve error messages
- <mark>Use exhaustive checking</mark>: Add `never` checks in your reducers
