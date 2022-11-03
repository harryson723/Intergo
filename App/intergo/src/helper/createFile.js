const getType = (type) => {
    let arr = type.split('.');
    return arr[arr.length - 1];
};

const createFile = (data, id, url) => {
    console.log(data.files);
    let dataFile = data.files[0];
    let formData = new FormData();
    let fileName = `${id}.${getType(dataFile.name)}`;
    formData.append('data', dataFile, fileName);
    fetch(url, {
        method: 'PUT',
        body: formData
    })
        .then(response => response.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    return fileName;
};

export default createFile;