

const addImage = () => {
    let content = document.querySelector('.formImg');
    content.classList = 'formImg';
    if (content.childNodes[0]) {
        content.childNodes[0].classList = "inputImg";
        content.childNodes[0].addEventListener('change', () => {
            let image = content.childNodes[0].files[0];
            var TmpPath = URL.createObjectURL(image);
            console.log(TmpPath);
            document.querySelector('.userImg').src = TmpPath;
            content.classList = 'formImg hidden';
            content.childNodes[0].classList = "inputImg hidden";
        });
    } 
};

export default addImage;