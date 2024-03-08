export const parseCssStyles = (cssString) => {
  return cssString
    .split(";")
    .filter(Boolean)
    .reduce((acc, style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      return { ...acc, [property]: value };
    }, {});
};
