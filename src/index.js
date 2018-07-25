import {EMFJS, RTFJS, WMFJS} from 'rtf.js';

RTFJS.loggingEnabled(false);
WMFJS.loggingEnabled(false);
EMFJS.loggingEnabled(false);

document.addEventListener('DOMContentLoaded', function(){
    document.getElementById("upload-field").addEventListener("change", function () {
        loadDataFileReader(this.files[0])
    }, false);
}, true);

function loadDataFileReader(file){
    let reader = new FileReader();
    reader.onload = function(event) {

        const doc = new RTFJS.Document(stringToArrayBuffer(event.target.result));

        const meta = doc.metadata();
        doc.render().then(function(htmlElements) {
            console.log(meta);

            var mainElement = document.createElement('div');
            htmlElements.forEach(function(htmlElement){
                mainElement.append(htmlElement[0]);
            });
            console.log(mainElement.innerHTML);
        }).catch(error => console.error(error))
    };
    reader.readAsText(file);
}

function stringToArrayBuffer(string) {
    var buffer = new ArrayBuffer(string.length);
    var bufferView = new Uint8Array(buffer);
    for (var i=0; i<string.length; i++) {
        bufferView[i] = string.charCodeAt(i);
    }
    return buffer;
}



