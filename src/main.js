//dom.create()，创建节点
const div = dom.create("<div>newDiv</div>");
console.log(div);

//dom.after(node,node2)，新增弟弟
dom.after(test, div);

//dom.before(node,node2)，新增哥哥
dom.before(test, div);

//dom.append(parent,node)，新增儿子
dom.append(test, div);
console.log(test);

//dom.wrap(node,parent)，新增爸爸
const div3 = dom.create('<div id="parent">我是爸爸</div>');
dom.wrap(test, div3);
console.log(document.documentElement);

//dom.remove(node)，删除节点
const div4 = dom.create("<div>xxxx</div>");
dom.after(div, div4);
dom.remove(div4);
console.log(div4);

//dom.empty(node)，清空节点的后代子元素
// console.log(div3);
// console.log(dom.empty(div3));

//dom.attr(node,name,value)，参数为3个时，设置属性和属性值；参数为2个时，查看属性值
dom.attr(test, "title", "Hi i am wbh");
const title = dom.attr(test, "title");
console.log("title:" + title);

//dom.text(node,string)，参数为2时设置文本内容，参数为1时，查看元素的文本内容，会覆盖原值
dom.text(div4, "我是div4");
console.log(div4);
console.log(dom.text(div4));

//dom.html(node,string)，参数为2时，设置html的内容，参数为1时，查看元素的html内容，会覆盖原值
//dom.html(div3, "<strong>div3</strong>");
//console.log(dom.html(div3));

//dom.style(node,name,value)，设置元素的 CSS 属性
dom.style(test, { border: "1px solid red", color: "blue" });
console.log(dom.style(test, "border"));
dom.style(test, "border", "1px solid black");

//dom.class.add(node,className)，给对应节点添加 class 属性值
//dom.class.remove(node,className)，给对应节点移除 class 属性值
//dom.class.has(node,className)，判断对应节点的 class 是否存在某个属性值
dom.class.add(test, "red");
dom.class.add(test, "blue");
dom.class.remove(test, "blue");
console.log(dom.class.has(test, "blue"));

//dom.on(node,eventName,fn) ，给元素绑定事件
//dom.off(node,eventName,fn)，删除元素绑定事件
const fn = () => {
  console.log("点击了一次");
};
dom.on(test, "click", fn);
dom.off(test, "click", fn);

//dom.find(selector,scope) 没有指定 scope 范围时，在document中找对应的对象，
//指定 scope 范围时，在范围内找该对象
const testDiv = dom.find("#test")[0];
console.log(testDiv);
const testFind = dom.find(".testFind", testDiv);
console.log(testFind);

//dom.parent(node) 找 node 元素的爸爸
console.log(dom.parent(test));

//dom.children(node) 找 node 元素的儿子
console.log(dom.children(test)[0]);

//dom.siblings(node) 找到node元素的兄弟姐妹
console.log(dom.siblings(dom.find("#s1", siblings)[0]));

//dom.next(node) 查看 node 元素的弟弟
console.log(dom.next(dom.find("#s2")[0]));

//dom.previous(node) 查看 node 元素的哥哥
console.log(dom.previous(dom.find("#s2")[0]));

//dom.each(node,fn) 用于遍历所有节点
dom.each(dom.children(dom.find("#travel")[0]), (n) => {
  dom.style(n, "color", "red");
  console.log(n);
});

//dom.index(node) 用于查看元素的排名
console.log(dom.index(dom.find("#s3")[0]));
