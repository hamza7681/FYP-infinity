const FormattedPrice = ({ price }) => {
  const newPrice = Number(price);
  const formattedPrice = newPrice.toLocaleString("en-PK", {
    style: "currency",
    currency: "PKR",
  });
  return formattedPrice;
};

export default FormattedPrice;
