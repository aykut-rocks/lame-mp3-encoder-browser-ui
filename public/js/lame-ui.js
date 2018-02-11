var getBitrateMode = () => {
    let value = document.querySelector('input[name=bitrate-mode]:checked').value;
    return value;
};

var getSelectedValue = (selectName) => {
    let element = document.querySelector('select[name='+ selectName + ']');
    let value = element.options[element.selectedIndex].value;
    return value;
};

var enableSelect = () => {
    let bitrateMode = ['cbr', 'vbr', 'abr'];
    bitrateMode.map((item) => {
        let element = document.querySelector('select[name='+ item + '-quality]'); 
        if(item === getBitrateMode()) {
            element.disabled = false;
        } else {
            element.disabled = true;
        }
    });
};

var enableEncodeButton = () => {
    let value = document.querySelector('input[type=file]').value;
    if(value !== '') {
        document.querySelector('input[type=submit]').disabled = false;
    }
};

document.addEventListener("change", enableSelect);
document.addEventListener("change", enableEncodeButton);
