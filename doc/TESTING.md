# Testing

Tools:
- Jest (`jest.config.ts`, `jest.setup.js`)
- React Testing Library

Commands:
```bash
npm test
npm run update-snapshot
```

Existing tests:
- `__test__/home.test.tsx`
- `__test__/topnavbar.test.tsx`
- `__test__/bottomnavbar.test.tsx`

Guidelines:
- Write tests near related components or in `__test__/`
- Prefer testing behavior over implementation
- Use `jest-dom` matchers for clarity
