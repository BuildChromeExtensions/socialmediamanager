chrome.action.onClicked.addListener(async (currentTab) => {

    // You can put all sort of query options here
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#method-query
    // you can use chrome.tabs.query with async/await of with callback.
    const tabs = await chrome.tabs.query({}) // get all the tabs

    let isFacebookAvailable = false;
    let isInstagramAvailable = false;
    let isYouTubeAvailable = false;

    //check if the facebook, instagram and youtube are available in the tabs
    for (const tab of tabs) {
        if (!tab.url) {
            // skip if url not available
            continue;
        }

        if (tab.url.includes('facebook.com')) {
            isFacebookAvailable = true;
        }
        else if (tab.url.includes('instagram.com')) {
            isInstagramAvailable = true;
        }
        else if (tab.url.includes('youtube.com')) {
            isYouTubeAvailable = true;
        }
    }

    // open tabs that are not available
    if (!isFacebookAvailable) {
        chrome.tabs.create({ url: "https://facebook.com", active: false });
    }
    if (!isInstagramAvailable) {
        chrome.tabs.create({ url: "https://instagram.com", active: false });
    }
    if (!isYouTubeAvailable) {
        chrome.tabs.create({ url: "https://youtube.com", active: false });
    }

    // Get active tab
    // you can use chrome.tabs.query with async/await of with callback.
    chrome.tabs.query({ active: true }, (tabs) => {
        const tab = tabs[0];
        // would could have also used the currentTab variable 
        // from the chrome.action.onClick.addListener 
        // const tab = currentTab

        // send a message to the content script of the active tab
        chrome.tabs.sendMessage(tab.id, { message: `Social Media Pages opened successfully` });
    })


})

// Redirect any linkedin links to google.com
chrome.tabs.onCreated.addListener((tab) => {
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onUpdated
    if (tab.url && tab.url.includes("linkedin.com")) {
        chrome.tabs.update(tab.id, { url: "https://google.com" })
    }
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    // https://developer.chrome.com/docs/extensions/reference/api/tabs#event-onUpdated
    if (tab.url && tab.url.includes("linkedin.com")) {
        chrome.tabs.update(tabId, { url: "https://google.com" })
    }
})

