/* Extensions are event based programs used to modify or enhance the Chrome 
 * browsing experience. 
 *
 * Events are browser triggers, such as navigating to a new page, removing a 
 * bookmark, or closing a tab. 
 * 
 * Extensions monitor these events in their background script, then react with 
 * specified instructions.
 */

function focusOrCreateTab(url) {
  chrome.windows.getAll({ populate: true }, function (windows) {
    let existing_tab = null;
    for (let i in windows) {
      let tabs = windows[i].tabs;
      for (let j in tabs) {
        let tab = tabs[j];
        if (tab.url === url) {
          existing_tab = tab;
          break;
        }
      }
    }

    if (existing_tab) {
      chrome.tabs.update(existing_tab.id, { active: true });
    } else {
      chrome.tabs.create({ url: url, active: true });
    }
  });
}

// 
chrome.browserAction.onClicked.addListener(function () {
  focusOrCreateTab(chrome.extension.getURL("new_tab.html"));
});