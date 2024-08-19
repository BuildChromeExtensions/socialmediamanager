chrome.runtime.onMessage.addListener((request, sender, senderResponse) => {
    alert(request.message);
})

// Bonus tip: here is another way of just redirecting when unwanted page is loaded
// if(window.location.href.includes("linkedin.com")) window.location.href = 'https://google.com/';