import {Window, TitleBar} from './window.js';

let modals = [];
for(let i=0;i<8;i++)
{
	const modal = new Window();
	modal.title_bar.text = 'Consectetur magni?';
	modal.addPage("<video src='media/video.webm' controls></video>");
	modal.x += Math.random()*500-350;
	modal.y += Math.random()*500-350;
}
