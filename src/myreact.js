function createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map(child =>
          typeof child === "object" ? child : createTextElement(child)
        )
      }
    };
  }
  
  function createTextElement(text) {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: []
      }
    };
  }
  
  function render(element, container) {
    const dom =
      element.type === "TEXT_ELEMENT"
        ? document.createTextNode("")
        : document.createElement(element.type);
    const isProperty = key => key !== "children";
    Object.keys(element.props)
      .filter(isProperty)
      .forEach(name => {
        dom[name] = element.props[name];
      });
    element.props.children.forEach(child => render(child, dom));
    container.appendChild(dom);
  }
  
  const myreact = {
    createElement,
    render
  };
  
  /** @jsx myreact.createElement */
  const element = (
    <div>
      <h1>Hello React mini version</h1>
      <h2 style="text-align:right">from sanhita</h2>
    </div>
  );
  const container = document.getElementById("root");
  myreact.render(element, container);
  