import ListCard from "../list-card";

async function getListData() {
  const fetchList = await fetch("http://localhost:3000/api/list", {
    method: "GET",
    cache: "no-cache",
  });
  if (!fetchList.ok) {
    throw new Error("Failed to fetch data");
  }
  const listData = await fetchList.json();
  return listData.data;
}

const ListShow = async () => {
  const listData = await getListData();
  return (
    <div className="flex flex-wrap gap-10 mt-6">
      {listData.map((list) => (
        <div key={list?.id} className="mx-auto">
          <ListCard list={list} />
        </div>
      ))}
    </div>
  )
}

export default ListShow
