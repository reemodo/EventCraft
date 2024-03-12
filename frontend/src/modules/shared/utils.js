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

const downloadImage = (blob, fileName) => {
  const fakeLink = window.document.createElement("a");
  fakeLink.style = "display:none;";
  fakeLink.download = fileName;

  fakeLink.href = blob;

  document.body.appendChild(fakeLink);
  fakeLink.click();
  document.body.removeChild(fakeLink);

  fakeLink.remove();
};

export const exportAsImage = async (el, imageFileName) => {
  const canvas = await html2canvas(el, {
    letterRendering: 1,
    allowTaint: true,
    useCORS: true,
  });
  const image = canvas.toDataURL("image/png", 1.0);
  downloadImage(image, imageFileName);

  return image;
};
