1. create dummy data
    - Review app/page.tsx and add a local dummy TrendingCoin[] dataset matching the TrendingCoin type. Use existing local image assets for thumb/large so images resolve. Wire the dummy data into DataTable so the table renders rows
2. set up ESlint and prettier within this project
3. create a fallback.tsx file with CoinOverviewFallback and TrendingCoinsFallback UIs that match the existing #coin-overview-fallback and #trending-coins-fallback css rules, using Datatable for the trending table layout. Update page.tsx to use these components as suspense fallbacks
