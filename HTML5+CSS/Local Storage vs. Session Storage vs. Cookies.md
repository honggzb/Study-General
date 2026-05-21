## Local Storage vs. Session Storage vs. Cookies

|Feature|localStorage|sessionStorage|Cookies|
|---|---|---|---|
|Lifespan|Indefinite (No expiration)|Until active tab/window ends|Specified by developer|
|Storage Limit|~5MB per origin|~5MB per origin|~4KB|
|Transmission|Stays in browser till manually deleted|Stays in browser|Sent with every HTTP request|
|Auto Expiry|No|Yes|Yes|
|Server side Accessibilty|No|No|Yes|

## localStorage

- Data in localStorage **has no expiration date**. It persists **indefinitely** until it is explicitly deleted by the user or the application.
- **Key Persistence Characteristics** of localStorage
  - Browser Restarts: Unlike sessionStorage, data in localStorage remains intact even after closing the tab, restarting the browser, or rebooting the computer.
  - Manual Deletion: The only standard ways for data to be removed are:
    - The user clearing their browser cache and site data.
    - The web application running `localStorage.removeItem(key)` or `localStorage.clear()`
- System Exceptions: In rare cases, browsers might delete data if the system is extremely low on disk space.
- Incognito/Private Mode: Data stored during a private session is typically deleted once the last private tab is closed

## sessionStorage

- Data in sessionStorage persists **only for the duration of a page session**, meaning it is cleared as soon as the specific browser tab or window is closed.
- **Key Duration Characteristics**
  - **Active Tab Life**: The data survives page reloads and restores but is tied strictly to the open tab.
  - **No Sharing**: Opening the same URL in a new tab creates a separate, unique session storage.
  - **No Expiration Date**: Unlike cookies, MDN Web Docs notes that sessionStorage has no built-in expiration timer; it remains until the tab is manually closed.
  - **Private Browsing**: In "Incognito" or "Private" modes, the storage is typically cleared when the last private window is closed.
