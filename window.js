import {startDragging} from "./drag.js";
class Component{
	_element=null;

	constructor(tagname,class_name){
		this._element=document.createElement(tagname);
		if(class_name)
			this._element.classList=class_name;
	}

	actualize(){}

	get element(){
		return this._element;
	}

	show(){
		this.element.removeAttribute("hidden");
	}
	hide(){
		this.element.hidden = true;
	}

	destroy(){
		this._element.remove();
		for(let property in this)
		{
			if(this[property].destroy)
				this[property].destroy();
			this[property] = null;
		}
	}
}

export class TitleBar extends Component {
	constructor(text){
		super("div", "window-title-bar");
		this.element.innerHTML=`<span class='window-title'></span>
		<button class='window-close'>X</button>`;
		if(text)
			this.text=text;
	}

	set text(val){
		this.element.querySelector(".window-title").textContent=val;
	}

	get text(){
		return this.element.querySelector(".window-title").textContent;
	}
}

export class Window extends Component{
	static highest_z_index=100;
	_pages = [];
	_x;
	_y;
	_maximized = false;
	_drag_handler=null;
	_maximize_handler=null;

	constructor(){
		super("div","window");

		this._title_bar = new TitleBar("Blank!");
		this.element.appendChild(this.title_bar.element);

		this._maximize_handler=()=>this._maximized?this.unmaximize():this.maximize();
		this._drag_handler = e=>{this.putInFocus();startDragging.call(this,e)};
		this.enableDragging();
		this.enableMaximizing();
		
		this.element.querySelector(".window-close").addEventListener("click",
			this.destroy.bind(this)
		);

		this.putInFocus();
		this.element.addEventListener("click",this.putInFocus.bind(this));
		
		document.body.appendChild(this.element);

		this.x = Number(getComputedStyle(this.element).left.replace("px",""));
		this.y = Number(getComputedStyle(this.element).top.replace("px",""));

	}

	putInFocus(){
		Window.highest_z_index++;
		this.element.style.zIndex = `${Window.highest_z_index}`;
	}

	get title_bar(){
		return this._title_bar;
	}

	addPage(val){
		let page;

		if(val instanceof WindowPage)
			page = val;
		else
			page = new WindowPage(val);

		if(this._pages.length === 0)
			page.show();
		
		this._pages.push(page);
		this.element.appendChild(page.element);
	}

	enableMaximizing()
	{
		this.title_bar.element.addEventListener("dblclick",this._maximize_handler);
	}

	disableMaximizing()
	{
		this.title_bar.element.removeEventListener("doubleclick",this._maximize_handler);
	}

	enableDragging()
	{
		this.title_bar.element.addEventListener("mousedown",this._drag_handler);
	}

	disableDragging()
	{
		this.title_bar.element.removeEventListener("mousedown",this._drag_handler);
	}

	maximize()
	{
		console.log("maximizing");
		this._maximized = true;
		this.element.style.top="0px";
		this.element.style.left="0px";
		this.element.style.width="100vw";
		this.element.style.height="100vh";
		this.disableDragging();
	}
	
	unmaximize()
	{
		console.log("unmaximizing");
		this._maximized = false;
		this.element.style.width="";
		this.element.style.height="";
		this.y = this.y;
		this.x = this.x;
		this.enableDragging();
	}
	get x(){return this._x; }
	set x(val){
		this.element.style.left=`${val}px`;
		this._x=val;
		if(this.x<0)this.x=0;
	}

	get y(){return this._y; }
	set y(val){
		this.element.style.top=`${val}px`;
		this._y=val;
		if(this.y<0)this.y=0;
	}
}

export class WindowPage extends Component
{
	constructor(inner){
		super("div","window-page")
		console.log(inner);
		this.element.innerHTML=inner;
		this.hide();
	}
}
