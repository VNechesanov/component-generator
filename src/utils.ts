type HTML_Map = {
  key: string;
  val: string;
};

export type Clear_DOM_Props = {
  clearDom: HTMLElement | null;
  stylesProps: HTML_Map[];
};

export const removeTags = (tagName: string, document: Document): Document => {
  const doc: Document = document;
  var elementTag = doc.getElementsByTagName(tagName);

  for (let index = elementTag.length - 1; index >= 0; index--) {
    elementTag[index].parentNode?.removeChild(elementTag[index]);
  }

  return doc;
};

export const removeClasses = (
  className: string,
  document: Document
): Document => {
  const doc: Document = document;
  var elementRem = doc.getElementsByClassName(className);

  for (let index = elementRem.length - 1; index >= 0; index--) {
    elementRem[index].parentNode?.removeChild(elementRem[index]);
  }

  return doc;
};

export const getClearDOM = (id: string, document: Document): Document => {
  const doc: Document = document;
  const removeClassDoc = removeClasses("removable", doc);
  const removeLibraryClassDoc = removeClasses(
    "__resizable_base__",
    removeClassDoc
  );
  const removeTagsDoc = removeTags("span", removeLibraryClassDoc);

  return removeTagsDoc;
};

export const getClearDomWithoutStyles = (
  document: Document
): Clear_DOM_Props => {
  const doc: Document = document;
  const clearDom = getClearDOM("Main", doc);
  const elems = clearDom.getElementsByTagName("div");
  const arrayOfProps: HTML_Map[] = [];

  for (var elem, i = 0; (elem = elems[i++]); ) {
    arrayOfProps.push({
      key: elem.className,
      val: elem.attributes[1].value,
    });

    elem.removeAttribute("style");
  }

  return {
    clearDom: clearDom.getElementById("Main"),
    stylesProps: arrayOfProps,
  };
};
