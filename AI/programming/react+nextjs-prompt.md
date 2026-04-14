1. <mark>create dummy data</mark>
    - Review app/page.tsx and add a local dummy TrendingCoin[] dataset matching the TrendingCoin type. Use existing local image assets for thumb/large so images resolve. Wire the dummy data into DataTable so the table renders rows
2. set up ESlint and prettier within this project
3. <mark>React suspense</mark>
   - create a fallback.tsx file with CoinOverviewFallback and TrendingCoinsFallback UIs that match the existing #coin-overview-fallback and #trending-coins-fallback css rules, using Datatable for the trending table layout. Update page.tsx to use these components as suspense fallbacks
4. <mark>create a reusable React login card styled with Tailwind that includes</mark>
      - using a form library like React Hook Form and z library as validation
      - A centered card layout with a title and subtle shadow
      - Email and password input fields with proper labels and focus states
      - A primary "Sign in" button with loading and disabled states
      - Inline validation for required fields and basic email format
      - An error message area for failed logins
      - Optional extras like "Forgot password?", "“Remember me", and a show/hide password toggle
      - Fully accessible markup with label associations and keyboard-friendly interactions
