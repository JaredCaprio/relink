export default function sortList(
  listData,
  sortBy,
  order,
  setOrderFunc,
  setLastClickedTitle,
  listTitles,
) {
  let sortedList;
  let newOrder;
  const { first, second, third } = listTitles;

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

  switch (sortBy) {
    case first:
      setLastClickedTitle(1);
      break;
    case second:
      setLastClickedTitle(2);
      break;
    case third:
      setLastClickedTitle(3);
      break;
  }

  return sortedList;
}
