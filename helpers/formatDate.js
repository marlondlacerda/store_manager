module.exports = (date, format) => {
  const map = {
      MM: date.getMonth() + 1,
      DD: date.getDate(),
      YYYY: date.getFullYear(),
      hh: date.getHours(),
      mm: date.getMinutes(),
      ss: date.getSeconds(),
  };

  return format.replace(/MM|DD|YYYY|hh|mm|ss/gi, (matched) => map[matched]);
};
