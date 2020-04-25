window.dom = {
  //用于创建节点
  create: function (string) {
    const container = document.createElement("template");
    container.innerHTML = string.trim(); //trim()去除字符串前后的空格
    return container.content.firstChild;
  },

  //用于新增弟弟
  after(node, node2) {
    node.parentNode.insertBefore(node2, node.nextSiblings);
  },

  //用于新增哥哥
  before(node, node2) {
    node.parentNode.insertBefore(node2, node);
  },

  //用于新增儿子
  append(parent, node) {
    parent.appendChild(node);
  },

  //用于新增爸爸
  wrap(node, parent) {
    dom.before(node, parent);
    dom.append(parent, node);
  },
  //删除节点
  remove(node) {
    node.parentNode.removeChild(node);
    return node;
  },
  //清空节点的后代子元素
  empty(node) {
    const array = [];
    let x = node.firstChild;
    while (x) {
      array.push(dom.remove(node.firstChild));
      x = node.firstChild;
    }
    return array;
  },
  //参数为3个时，设置属性和属性值；参数为2个时，查看属性值
  attr(node, name, value) {
    //重载
    if (arguments.length === 3) {
      return node.setAttribute(name, value);
    } else if (arguments.length === 2) {
      return node.getAttribute(name);
    }
  },
  //参数为2时设置文本内容，参数为1时，查看元素的文本内容。会覆盖原值
  text(node, string) {
    //重载
    if (arguments.length === 2) {
      //适配
      if ("innerText" in node) {
        node.innerText = string;
      } else {
        node.textContent = string;
      }
    } else if (arguments.length === 1) {
      if ("innerText" in node) {
        return node.innerText;
      } else {
        return node.textContent;
      }
    }
  },
  //参数为2时，设置html的内容，参数为1时，查看元素的html内容。会覆盖原值
  html(node, string) {
    //重载
    if (arguments.length === 2) {
      node.innerHTML = string;
    } else if (arguments.length === 1) {
      return node.innerHTML;
    }
  },
  //设置元素的 CSS 属性
  style(node, name, value) {
    if (arguments.length === 3) {
      // dom.style(div,'color','red')
      node.style[name] = value;
    } else if (arguments.length === 2) {
      if (typeof name === "string") {
        // dom.style(div,'color')
        return node.style[name];
      } else if (name instanceof Object) {
        //dom.style(div,{color:'red'})
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    }
  },
  class: {
    //给对应节点添加 class 属性值
    add(node, className) {
      node.classList.add(className);
    },
    //给对应节点移除 class 属性值
    remove(node, className) {
      node.classList.remove(className);
    },
    //判断对应节点的 class 是否存在某个属性值
    has(node, className) {
      return node.classList.contains(className);
    },
  },
  //给元素绑定事件
  on(node, eventName, fn) {
    node.addEventListener(eventName, fn);
  },
  //删除元素绑定事件
  off(node, eventName, fn) {
    node.removeEventListener(eventName, fn);
  },
  //没有指定 scope 范围时，在document中找对应的对象，指定 scope 范围时，在范围内找该对象
  find(selector, scope) {
    return (scope || document).querySelectorAll(selector);
  },
  //找元素的爸爸
  parent(node) {
    return node.parentNode;
  },
  //找元素的儿子
  children(node) {
    return node.children;
  },
  //找到元素的兄弟姐妹
  siblings(node) {
    return Array.from(node.parentNode.children).filter((n) => n !== node);
  },
  //查看元素的弟弟
  next(node) {
    let x = node.nextSibling;
    while (x && x.nodeType === 3) {
      x = x.nextSibling;
    }
    return x;
  },
  //查看元素的哥哥
  previous(node) {
    let x = node.previousSibling;
    while (x && x.nodeType === 3) {
      x = x.previousSibling;
    }
    return x;
  },
  //遍历所有节点
  each(nodeList, fn) {
    for (let i = 0; i < nodeList.length; i++) {
      fn.call(null, nodeList[i]);
    }
  },
  //查看该元素的排名
  index(node) {
    const list = dom.children(node.parentNode);
    let i;
    for (i = 0; i < list.length; i++) {
      if (list[i] === node) {
        break;
      }
    }
    return i;
  },
};
