export const renderContent = (content: string) => {
  try {
    // Create a temporary div to parse the HTML
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = content;

    // Convert to React elements
    const parseElement = (
      element: ChildNode,
      index: number,
    ): React.ReactNode => {
      if (element.nodeType === Node.TEXT_NODE) {
        return element.textContent;
      }

      if (element.nodeType !== Node.ELEMENT_NODE) {
        return null;
      }

      const el = element as HTMLElement;
      const tagName = el.tagName.toLowerCase();
      const children = Array.from(el.childNodes).map((child, i) =>
        parseElement(child, i),
      );

      const key = `${tagName}-${index}`;

      // Handle different HTML elements
      switch (tagName) {
        case "h1":
          return (
            <h1 key={key} className="text-2xl font-bold mb-4 mt-4">
              {children}
            </h1>
          );
        case "h2":
          return (
            <h2 key={key} className="text-xl font-bold mb-3 mt-3">
              {children}
            </h2>
          );
        case "h3":
          return (
            <h3 key={key} className="text-lg font-bold mb-2 mt-2">
              {children}
            </h3>
          );
        case "p":
          return (
            <p key={key} className="mb-4 text-justify">
              {children}
            </p>
          );
        case "div":
          // Check for specific class names
          const className = el.className || "";
          if (className.includes("ql-align-center")) {
            return (
              <div key={key} className="text-center mb-4">
                {children}
              </div>
            );
          } else if (className.includes("ql-align-right")) {
            return (
              <div key={key} className="text-right mb-4">
                {children}
              </div>
            );
          } else if (className.includes("ql-align-left")) {
            return (
              <div key={key} className="text-left mb-4">
                {children}
              </div>
            );
          } else {
            return (
              <div key={key} className="mb-4">
                {children}
              </div>
            );
          }
        case "img":
          const src = el.getAttribute("src") || "/placeholder.svg";
          const alt = el.getAttribute("alt") || "image";
          const width = el.getAttribute("width") || "700";
          const height = el.getAttribute("height") || "400";

          return (
            <div key={key} className="my-6 flex justify-center">
              <img
                src={src}
                alt={alt}
                className="max-w-full h-auto rounded-lg shadow-md"
                style={{ maxWidth: "100%" }}
              />
            </div>
          );
        case "br":
          return <br key={key} />;
        case "strong":
          return <strong key={key}>{children}</strong>;
        case "em":
          return <em key={key}>{children}</em>;
        case "ul":
          return (
            <ul key={key} className="list-disc pl-5 mb-4">
              {children}
            </ul>
          );
        case "ol":
          return (
            <ol key={key} className="list-decimal pl-5 mb-4">
              {children}
            </ol>
          );
        case "li":
          return (
            <li key={key} className="mb-1">
              {children}
            </li>
          );
        case "span":
          return <span key={key}>{children}</span>;
        case "a":
          const href = el.getAttribute("href") || "#";
          return (
            <a key={key} href={href} className="text-blue-600 hover:underline">
              {children}
            </a>
          );
        case "iframe":
          const iframeSrc = el.getAttribute("src") || "";
          return (
            <div key={key} className="my-6">
              <iframe
                className="w-full h-[500px] rounded-lg"
                src={iframeSrc}
                title={`iframe-${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          );
        default:
          // For unknown elements, render them as divs
          return (
            <div key={key} className="mb-4">
              {children}
            </div>
          );
      }
    };

    const parsedNodes = Array.from(tempDiv.childNodes).map((node, index) =>
      parseElement(node, index),
    );

    return parsedNodes;
  } catch (error) {
    console.error("Error parsing content:", error);
    return [
      <div key="error" className="text-red-500">
        Error displaying content
      </div>,
    ];
  }
};
