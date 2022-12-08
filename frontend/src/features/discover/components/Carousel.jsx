export function Carousel({ dataList, subcaption }) {
  return (
    <div style={{ display: "flex" }}>
      {dataList.map((item) => (
        <div key={item.id}>
          <div>
            <img src="https://via.placeholder.com/175" alt="FIXME:" />
          </div>
          <div>
            <p>{item.title}</p>
            <p>{subcaption}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
