var inputCSS = null;
function waitForClick(tabs) {
    console.log(tabs);
    document.addEventListener('click', e => {
        console.log("listen")
        if (e.target.textContent === 'Set') {
            inject();
        }
        if (e.target.textContent === 'Reset') {
            reset()
        }
    });

    function inject() {
        let input = document.getElementById('cssinput');
        inputCSS = input.value;
        if (inputCSS !== null) {
            browser.tabs.insertCSS(tabs[0].id, { code: inputCSS })
                // tab.insertCSS() //, run_at: "document_start" 
                .then(() => {
                    return browser.storage.local.set({ css: inputCSS })
                })
                .then(() => {
                    reportSuccess('Saved new CSS');
                })
                .catch(reportError)
        }
    }

    function reset() {
        if (inputCSS != null)
            browser.tabs.removeCSS(tabs[0].id, { code: inputCSS })
                .then(() => {
                    return browser.storage.local.remove('css')
                })
                .then(() => {
                    reportSuccess('Removed previous CSS');
                })
                .catch(err => reportError(err))
        inputCSS = null;
    }

}

function reportError(error) {
    console.error(error);
}

function reportSuccess(msg) {
    console.log(msg);
}

window.onload = () => {
    console.log('Loaded');
    if (inputCSS === null) {
        browser.storage.local.get('css')
            .then((value) => {
                console.log(value.css);
                // inputCSS = JSON.stringify(value.css);
                inputCSS = value.css;
                document.getElementById('cssinput').textContent = inputCSS;
                reportSuccess('Loaded previous CSS');
            })
            .catch(reportError)
    }
}

browser.tabs.query({ active: true, currentWindow: true })
    .then(waitForClick)
    .catch(reportError)
