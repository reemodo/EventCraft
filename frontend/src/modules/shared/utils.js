import html2canvas from "html2canvas";

export const parseCssStyles = (cssString) => {
  if (!cssString) {
    return {};
  }
  return cssString
    ?.split(";")
    .filter(Boolean)
    .reduce((acc, style) => {
      const [property, value] = style.split(":").map((s) => s.trim());
      return { ...acc, [property]: value };
    }, {});
};

const downloadImage = (url, fileName) => {
  const fakeLink = window.document.createElement("a");

  fakeLink.href = url;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export const exportAsCanvas = async (el, imageFileName) => {
  const canvas = await html2canvas(el, {
    letterRendering: 1,
    allowTaint: true,
    useCORS: true,
  });

  return canvas;
};
