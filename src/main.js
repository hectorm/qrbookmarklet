import qrcode from 'qrcode-generator';

const selText = window.getSelection().toString();
const urlText = window.location.href;
const qrText = selText.length > 0 ? selText : urlText;

const qr = qrcode(0, 'M');
qr.addData(qrText);
qr.make();

const qrWindow = window.open('', '_blank', 'width=1,height=1');
const qrDocument = qrWindow.document;

qrDocument.open();
qrDocument.write(qr.createSvgTag(8, 8));
qrDocument.close();

qrDocument.title = window.document.title;
qrDocument.body.style.margin = 0;

setTimeout(() => {
	const qrSvg = qrDocument.querySelector('svg');
	const qrSvgRect = qrSvg.getBoundingClientRect();
	qrWindow.resizeTo(
		qrSvgRect.width + (qrWindow.outerWidth - qrWindow.innerWidth),
		qrSvgRect.height + (qrWindow.outerHeight - qrWindow.innerHeight)
	);
}, 50);
