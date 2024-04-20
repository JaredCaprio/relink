export default function sortList(listData, sortBy, order, setOrderFunc) {
  let sortedList;
  let newOrder;

  const sanitizedPinYin = (pinYin) => {
    return pinYin
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  };

  if (order[sortBy]) {
    sortedList = [...listData].sort((a, b) => {
      return sanitizedPinYin(a[sortBy]) > sanitizedPinYin(b[sortBy]) ? 1 : -1;
    });
    newOrder = false;
  } else if (!order[sortBy]) {
    sortedList = [...listData].sort((a, b) => {
      return sanitizedPinYin(a[sortBy]) < sanitizedPinYin(b[sortBy]) ? 1 : -1;
    });
    newOrder = true;
  } else {
    sortedList = listData;
  }

  setOrderFunc((prevOrder) => ({
    ...prevOrder,
    [sortBy]: newOrder,
  }));
  console.log(sortedList);
  return sortedList;
}
