const selectFile = document.querySelector('.select-image');
const displayImage = document.querySelector('.image-space');
const displayText = document.querySelector('.text-space');
const selectedImage = document.querySelector('.img');
const widthInput = document.getElementById('width');
const heightInput = document.getElementById('height');
const ratioInput = document.getElementById('aspect-r');
const qualityInput = document.getElementById('r-qualilty');
const downloadBtn = document.getElementById('d-btn');

let imageRatio;

function loadFile(e) {
    const file = e.target.files[0];
    if (!file) {
        return;
    }
    selectedImage.src = URL.createObjectURL(file);
    selectedImage.addEventListener('load', () => {
        widthInput.value = selectedImage.naturalWidth;
        heightInput.value = selectedImage.naturalHeight;
        imageRatio = selectedImage.naturalWidth / selectedImage.naturalHeight;
        displayImage.classList.add('active');
        displayText.classList.add('active');
    })
}

widthInput.addEventListener('keyup', () => {
    const height = ratioInput.checked ? widthInput.value / imageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
})

heightInput.addEventListener('keyup', () => {
    const width = ratioInput.checked ? heightInput.value * imageRatio : widthInput.value;
    widthInput.value = Math.floor(width);
})


function resizeAndDownload(e) {
    e.preventDefault();
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');

    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widthInput.value;
    canvas.height = heightInput.value;

    ctx.drawImage(selectedImage, 0, 0, canvas.width, canvas.height);

    a.href = canvas.toDataURL('image/jpeg', imgQuality);
    a.download = 'Emperor-resize';
    a.click();
    // document.body.appendChild(canvas);
}

downloadBtn.addEventListener('click', resizeAndDownload);
selectFile.addEventListener('change', loadFile);
displayImage.addEventListener('click', () => selectFile.click());