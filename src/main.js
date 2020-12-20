import qrcode from 'qrcode-generator';

const selText = window.getSelection().toString();
const urlText = window.location.href;
const qrText = selText.length > 0 ? selText : urlText;

const qr = qrcode(0, 'M');
qr.addData(qrText);
qr.make();

const qrWindow = window.open('', '_blank', [
	`top=${window.screenTop}`, `left=${window.screenLeft}`,
	'width=100', 'height=100'
].join(','));

qrWindow.document.open();
qrWindow.document.write(qr.createSvgTag(8, 8));
qrWindow.document.close();

qrWindow.document.title = window.document.title;
qrWindow.document.body.style.margin = 0;

setTimeout(() => {
	const qrSvg = qrWindow.document.querySelector('svg');
	const qrSvgRect = qrSvg.getBoundingClientRect();
	qrWindow.resizeTo(
		qrSvgRect.width + (qrWindow.outerWidth - qrWindow.innerWidth),
		qrSvgRect.height + (qrWindow.outerHeight - qrWindow.innerHeight)
	);
}, 50);
