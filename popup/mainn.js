// // if (window.hasRun) {
// //     return;
// // }
// // window.hasRun = true;


// function waitForClick(tab) {

//     /*
body {
    background-color: white;
    font-size: 1em;
}
    */
//     document.addEventListener('click', e => {
//         console.log("listen")
//         if (e.target.textContent === 'Set') {
//             inject();
//         }
//         if (e.target.textContent === 'Reset') {
//             reset()
//         }
//     });

//     function inject() {
//         let input = document.getElementById('cssinput');
//         inputCSS = input.value;
//         if (inputCSS !== null) {
//             tab.insertCSS({ code: inputCSS }) //, run_at: "document_start" 
//                 .then(() => {
//                     return browser.storage.local.set({ css, inputCSS })
//                 })
//                 .then(() => {
//                     reportSuccess('Saved new CSS');
//                 })
//                 .catch(reportError)
//         }
//     }

//     function reset() {
//         if (inputCSS != null)
//             tab.removeCSS({ code: inputCSS })
//                 .then(() => {
//                     return browser.storage.local.remove('css')
//                 })
//                 .then(() => {
//                     reportSuccess('Removed previous CSS');
//                 })
//                 .catch(err => reportError(err))
//         inputCSS = null;
//     }

// }


function reportError(error) {
    console.error(error);
}

function reportSuccess(msg) {
    console.log(msg);
}

var inputCSS = null;

document.addEventListener('load', (e) => {
    console.log('Loaded', e);
    if (inputCSS === null) {
        browser.storage.local.get('css')
            .then((value) => {
                inputCSS = value;
                reportSuccess('Loaded previous CSS');
            })
            .catch(reportError)
    }
})

// browser.tabs.query({ active: true, currentWindow: true })
//     .then(waitForClick)
//     .catch(reportError)
