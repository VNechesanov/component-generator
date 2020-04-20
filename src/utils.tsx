import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import parse, { domToReact, DomElement } from "html-react-parser";

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

export const domParsing = (html: string, classNamePostfix: number): string => {
  // const thirdLevelChild = {
  //   replace: ({ attribs, children }: any) => {
  //     if (!attribs) return;

  //     if (attribs.class === "react-draggable react-draggable-dragged") {
  //       return (
  //         <div
  //           className={`
  //           thirdLevelChild`}
  //         >
  //           {domToReact(children)}
  //         </div>
  //       );
  //     }
  //   },
  // };

  // const secondLevelChild = {
  //   replace: ({ attribs, children }: any) => {
  //     if (!attribs) return;

  //     if (attribs.class === "react-draggable react-draggable-dragged") {
  //       return (
  //         <div
  //           className={`
  //         secondLevelChild`}
  //         >
  //           {domToReact(children, thirdLevelChild)}
  //         </div>
  //       );
  //     }
  //   },
  // };

  // const firstLevelChild = {
  //   replace: ({ attribs, children }: any) => {
  //     if (!attribs) return;

  //     if (attribs.class === "react-draggable react-draggable-dragged") {
  //       return (
  //         <div
  //           className={`
  //           firstLevelChild`}
  //         >
  //           {domToReact(children, optionsParent)}
  //         </div>
  //       );
  //     }
  //   },
  // };

  let postfix = classNamePostfix;
  let mediator = ["Wrapper", "Block"];
  let index = 0;
  let counter = 0;

  const optionsParent = {
    replace: ({ attribs, children }: DomElement) => {
      if (!attribs) return;

      if (attribs.class === "react-draggable react-draggable-dragged") {
        postfix += 1;
        counter += 1;
        if (counter === 1) {
          index = 0;
        }
        if (counter > 1) {
          index = 1;
        }
        const tmp = (
          <div className={`chart${mediator[index]}${postfix}`}>
            {domToReact(children as DomElement[], optionsParent)}
          </div>
        );
        counter -= 1;
        return tmp;
      }
    },
  };

  return renderToStaticMarkup(parse(html, optionsParent) as any);
};
