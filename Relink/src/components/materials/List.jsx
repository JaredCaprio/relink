export default function List({ title1, title2, title3, children }) {
  return (
    <div className="list">
      {title1 && title2 && title3 ? (
        <ul className="list__ul">
          <li className="list__ul-col-label">{title1}</li>
          <li className="list__ul-col-label">{title2}</li>
          <li className="list__ul-col-label">{title3}</li>
        </ul>
      ) : null}

      {children}
    </div>
  );
}
