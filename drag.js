let mouse_old_x;
let mouse_old_y;
let mousemove_handler;
let mouseup_handler;

export function startDragging(e){
	e.preventDefault();

	mouse_old_x = e.clientX;
	mouse_old_y = e.clientY;

	mousemove_handler = drag.bind(this);
	mouseup_handler = stopDragging.bind(this);
	document.addEventListener("mousemove",mousemove_handler);
	document.addEventListener("mouseup", mouseup_handler);
}

function drag(e){
	const delta_x = e.clientX - mouse_old_x;
	const delta_y = e.clientY - mouse_old_y;
	mouse_old_x = e.clientX;
	mouse_old_y = e.clientY;

	this.y+=delta_y;
	this.x+=delta_x;
}

function stopDragging(e)
{
	document.removeEventListener("mousemove",mousemove_handler);
	document.removeEventListener("mouseup", mouseup_handler);
}
