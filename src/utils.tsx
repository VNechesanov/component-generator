import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import parse, { domToReact, DomElement } from "html-react-parser";

export type Clear_DOM_Props = {
  clearDom: HTMLElement | null;
  stylesProps: any;
};

export type ParsDomProps = {
  DOM: string;
  classes: string[];
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

export const getClearDOM = (document: Document): Document => {
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
  const clearDom = getClearDOM(doc);
  const elems = clearDom.getElementsByTagName("div");
  const arrayOfProps: any = [];

  for (var elem, i = 0; (elem = elems[i++]); ) {
    arrayOfProps.push(elem.attributes[1].value);

    elem.removeAttribute("style");
  }

  return {
    clearDom: clearDom.getElementById("Main"),
    stylesProps: arrayOfProps,
  };
};

export const domParsing = (
  html: string,
  classNamePostfix: number,
  componentName: string
): ParsDomProps => {
  let postfix = classNamePostfix;
  let mediator = ["BaseWrapper", "LocalWrapper", "Block"];
  let index = 0;
  let counter = 0;
  const classNameArray: string[] = [];

  const optionsParent = {
    replace: ({ attribs, children }: DomElement) => {
      if (!attribs) return;

      if (
        attribs.class === "react-draggable react-draggable-dragged" ||
        attribs.class === "react-draggable"
      ) {
        postfix += 1;
        counter += 1;
        if (counter === 1) {
          index = 0;
        }
        if (counter === 2) {
          index = 1;
        }
        if (counter > 2) {
          index = 2;
        }
        classNameArray.push(`${componentName}${mediator[index]}${postfix}`);
        const tmp = (
          <div className={`${componentName}${mediator[index]}${postfix}`}>
            {domToReact(children as DomElement[], optionsParent)}
          </div>
        );
        counter -= 1;
        return tmp;
      }
    },
  };

  return {
    DOM: renderToStaticMarkup(parse(html, optionsParent) as any),
    classes: classNameArray,
  };
};

export function downloadTsx(
  filename: string,
  text: string,
  componentName: string
) {
  const replacedString = text.replace(/class/g, "className");
  const repeatArray = [];

  for (let i = 0; i < replacedString.length; i++) {
    var x = replacedString.indexOf("BaseWrapper", i);
    if (x === -1) continue;
    i = x;
    repeatArray.push(x);
  }

  let templateString = `
  import React from 'react';
  
  import "${componentName}.scss";
  
  class ${componentName} extends React.Component {
      render() {
          return(
           ${repeatArray.length < 2 ? "" : "<>"} 
              ${replacedString}
           ${repeatArray.length < 2 ? "" : "</>"} 
          );
      }
  }
  
  export default ${componentName};
  `;

  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(templateString)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

export function downloadScss(
  filename: string,
  stylesArray: string[],
  classNameArray: string[]
) {
  let templateString = "";

  const newStylesArray: string[] = [];
  stylesArray.forEach((item: string) => {
    newStylesArray.push(
      item.replace(
        /user-select: auto;|touch-action: none;|display: inline-block;|cursor: move;|max-width: 9.0072e15px;|max-height: 9.0072e15px;|min-width: 68px;|min-height: 16px;|box-sizing: border-box;|flex-shrink: 0;/gi,
        ""
      )
    );
  });

  for (let i = 0; i < classNameArray.length; i++) {
    templateString += `
    .${classNameArray[i]} {
      ${newStylesArray[i + 1]}
    }

    `;
  }

  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(templateString)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
