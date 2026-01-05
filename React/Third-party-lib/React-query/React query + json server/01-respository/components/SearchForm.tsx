import { Button, Input } from "./ui/button";
import { Search } from "lucide-react";

interface propsType {
    query: any;
    handleSearchProducts: () => void;
    setQuery: () => void;
}
const SearchForm = (props: propsType) => {
  return (
    <form onSubmit={props.handleSearchProducts}>
      <Input
        className="p-1 m-1"
        type="text"
        value={props.query}
        onChange={(e) => props.setQuery(e.target.value)}
      />
      <Button className="btn btn-outline-info">
        <Search />
      </Button>
    </form>
  )
}

export default SearchForm