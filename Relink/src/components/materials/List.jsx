export default function List({
  title1: { title1Id, title1Output } = {},
  title2: { title2Id, title2Output } = {},
  title3: { title3Id, title3Output } = {},
  children,
  sortFunc,
  lastClickedTitle,
}) {
  return (
    <div className="list">
      {title1Output && title2Output && title3Output ? (
        <ul className="list__ul" onClick={sortFunc}>
          <li
            className={`list__ul-col-label ${lastClickedTitle === 1 ? "list--sort" : ""}`}
            id={title1Id}
          >
            {title1Output}
          </li>
          <li
            className={`list__ul-col-label ${lastClickedTitle === 2 ? "list--sort" : ""}`}
            id={title2Id}
          >
            {title2Output}
          </li>
          <li
            className={`list__ul-col-label ${lastClickedTitle === 3 ? "list--sort" : ""}`}
            id={title3Id}
          >
            {title3Output}
          </li>
        </ul>
      ) : null}

      {children}
    </div>
  );
}
