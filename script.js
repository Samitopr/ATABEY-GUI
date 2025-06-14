
const dropzone = document.getElementById('dropzone');
const output = document.getElementById('output');
const fileInput = document.getElementById('fileInput');
const mediaPlayer = document.getElementById('mediaPlayer');

dropzone.addEventListener('dragover', (e) => {
  e.preventDefault();
  dropzone.style.borderColor = '#ff0';
});
dropzone.addEventListener('dragleave', () => {
  dropzone.style.borderColor = '#0ff';
});
dropzone.addEventListener('drop', (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  handleFile(file);
});
fileInput.addEventListener('change', (e) => {
  handleFile(e.target.files[0]);
});

function handleFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    const data = e.target.result;
    output.textContent = `Loaded: ${file.name}\nPreview:\n` + data.substring(0, 500) + '...';

    if (file.name.endsWith(".cqi")) {
      const blob = new Blob([data], { type: 'audio/wav' });
      const url = URL.createObjectURL(blob);
      mediaPlayer.innerHTML = `<audio controls src="${url}"></audio>`;
    }
  };
  reader.readAsText(file);
}
