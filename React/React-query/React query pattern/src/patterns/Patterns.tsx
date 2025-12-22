import { Link } from "@tanstack/react-router";

export function Patterns() {
  return (
    <>
      React Query Patterns
      <Link to={"/01-simple-queries"}>
        <li>01-simple-queries</li>
      </Link>
      <Link to={"/02-custom-queries"}>
        <li>02-custom-queries</li>
      </Link>
      <Link to={"/03-selectors"}>
        <li>03-selectors</li>
      </Link>
      <Link to={"/04-parameterized-queries"}>
        <li>04-parameterized-queries</li>
      </Link>
      <Link to={"/05-pagination"}>
        <li>05-pagination</li>
      </Link>
      <Link to={"/06-disabling-queries"}>
        <li>06-disabling-queries</li>
      </Link>
      <Link to={"/07-prefetching"}>
        <li>07-prefetching</li>
      </Link>
      <Link to={"/08-infinite-queries"}>
        <li>08-infinite-queries</li>
      </Link>
      <Link to={"/09-query-key-factories"}>
        <li>09-query-key-factories</li>
      </Link>
      <Link to={"/10-simple-mutations"}>
        <li>10-simple-mutations</li>
      </Link>
      <Link to={"/11-query-invalidation"}>
        <li>11-query-invalidation</li>
      </Link>
      <Link to={"/12-automatic-query-invalidation"}>
        <li>12-automatic-query-invalidation</li>
      </Link>
      <Link to={"/13-global-error-handling"}>
        <li>13-global-error-handling</li>
      </Link>
      <Link to={"/14-optimistic-updates-in-ui"}>
        <li>14-optimistic-updates-in-ui</li>
      </Link>
      <Link to={"/15-optimistic-updates-in-cache"}>
        <li>15-optimistic-updates-in-cache</li>
      </Link>
      <Link to={"/16-suspense-queries"}>
        <li>16-suspense-queries</li>
      </Link>
    </>
  );
}
