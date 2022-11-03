
const addPdf = () => {
    let content = document.querySelector('.formImg');
    content.classList = 'formImg';
    if (content.childNodes[1]) {
        content.childNodes[1].classList = "inputPDF";
        content.childNodes[1].addEventListener('change', () => {
            content.classList = 'formImg hidden';
            content.childNodes[1].classList = "hidden inputPDF";
        });
    }
};

export default addPdf;