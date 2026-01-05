import React, { useState } from 'react';
import Pagination from "react-js-pagination";
import { useQuery } from "@tanstack/react-query";
import { getTodosPaging, totalData } from "../../hooks/useTodo";

function Paginate() {
  const [page, setPage] = useState(1);
  let limit: number = 5;

  const {isLoading, isError, data: todos, error} = useQuery({
    queryKey: ["todos", { page, limit }],
    queryFn: async () => await getTodosPaging({ page, limit }),
  });

  const {data: total} = useQuery({
    queryKey: ["totaltodos"],
    queryFn: totalData,
  });

  const handlePageChange = (pageNumber: number) => {
    setPage(pageNumber);
  };


  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center" }}> List of Todo </h1>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {todos.data.map((todo, index) => (
            <tr key={todo.id}>
              <td>{(page - 1) * limit + 1 + index}</td>
              <td>{todo.title}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-center">
        <Pagination
          activePage={page}
          itemsCountPerPage={limit}
          totalItemsCount={total}
          pageRangeDisplayed={5}
          onChange={handlePageChange}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="<"
          nextPageText=">"
        />
      </div>
    </div>
  );
}

export default Paginate;