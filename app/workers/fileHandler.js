import {saveAs} from 'file-saver'


function getBase64(file) {
    return new Promise((resolve, reject)=> {
        var reader = new FileReader();
        console.log(file)
        reader.readAsDataURL(file);

        reader.onload = () => {
            resolve(reader.result)
        }
        reader.onerror = (e) =>{
            reject(e)  
        } 
    })
}


function dataURItoBlob(dataURI) {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);

    // create a view into the buffer
    var ia = new Uint8Array(ab);

    // set the bytes of the buffer to the correct values
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    return blob;
}

class FileHandler {
    static async sendFiles(files, connection){
        for(let iii =0; iii < files.length; iii++) {
            let encodedData = await getBase64(files.item(iii))
            let filename = files.item(iii).name
            connection.send(JSON.stringify({
                type: "put",
                filedata: encodedData,
                filename
            }))
        } 
    }

    static saveFile(dataURL, filename){
        let blob = dataURItoBlob(dataURL)
        saveAs(blob, filename)
    }
}

export default FileHandler