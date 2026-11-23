# How to update the Utah careers page

This is a short guide for changing wording, stores, or the form. You usually only need to edit **content.js**. You do not need to change the layout files (`index.html`, `styles.css`, or `script.js`) for ordinary updates.

This folder is a **local draft**. Nothing here is live on the public internet until Aydon approves publishing it.

## Edit the intro and other wording

1. Open `content.js` in any text editor.
2. Find the line you want to change. Labels in the file tell you what each piece is, for example `heroIntro`, `whyPoints`, `formTitle`, and `thankYouBody`.
3. Change only the text inside the quotes. Leave the commas, colons, and curly braces alone.
4. Save the file and refresh the page in your browser.

Tips:

- If your text has an apostrophe, that is fine inside double quotes: `"we're hiring"`.
- To change a “Why work with us” point, edit both `title` and `text` for that point.
- The contact email is `contactEmail`. The footer and error message will pick it up automatically.

## Add or remove a store

Stores live in the `locations` list near the bottom of `content.js`. There is also a spreadsheet-style copy in `utah-locations.csv`. If you update one, update the other so they stay in sync.

Each store looks like this:

```
{ city: "Eagle Mountain", name: "UT074", address: "4276 North 1620 East, Suite 130", zip: "84005", url: "https://locations.papamurphys.com/ut/eagle-mountain/4276-north-1620-east" }
```

- `city` is used to group stores on the page.
- `name` is the official store number (for example UT074).
- `address` is the street address, including the suite if there is one.
- `zip` is the 5-digit ZIP code.
- `url` is the official Papa Murphy’s location page.

**To add a store:** copy an existing line, paste it so the list stays sorted by city, and change those five values. Keep a comma after every store except the last one.

**To remove a store:** delete that store’s whole line. If it was the last store in the list, also remove the extra comma on the new last line.

Only list stores you can verify on [locations.papamurphys.com/ut](https://locations.papamurphys.com/ut). Do not invent an address or store number.

## Paste the Web3Forms key (so the form can send email)

Until a real key is pasted, the page will show **Form not connected yet** and will not send applications.

1. Go to [https://web3forms.com](https://web3forms.com).
2. Create a free access key using **aydonmcphee@gmail.com**. That is the inbox that should receive applications.
3. Copy the access key.
4. In `content.js`, find `web3formsAccessKey`.
5. Replace `PASTE_WEB3FORMS_ACCESS_KEY_HERE` with your key, keeping the quotes around it.
6. Save the file and refresh the page. The yellow notice should disappear.

**Never share this key in chat, in an email thread, or in a screenshot.** Treat it like a password. If it leaks, create a new key in Web3Forms and paste the new one here.

After the key is in place, fill out the form once yourself and confirm a clean email arrives at aydonmcphee@gmail.com.

## Preview the page on your computer

From this folder, run:

```
cd /workspace/utah-pm-careers && python3 -m http.server 8080
```

Then open [http://localhost:8080](http://localhost:8080) in your browser.

If you are already in the `/workspace/utah-pm-careers` folder, you can just run `python3 -m http.server 8080`.

You can also open `index.html` as a file in your browser to check the look, but sending a test application works more reliably through the local server.

To stop the preview, go back to the terminal and press Ctrl+C.

## Common mistakes

- **Forgot a comma or a quote in `content.js`.** The page may go blank or show a warning that content.js did not load. Look at the line you just edited, compare it with the line above, and check the browser’s developer console (View → Developer → JavaScript Console) for a clue.
- **Left the Web3Forms placeholder in place.** The form will show “Form not connected yet” and will not submit. Paste a real key, still inside the quotes.
- **Shared the access key in chat.** Make a new key on web3forms.com and update `content.js`.
- **Edited `index.html` for wording.** Put wording changes in `content.js` instead, or they may be overwritten later.
- **Updated `content.js` but not `utah-locations.csv` (or the other way around).** Update both when stores change.
- **Broke the last-line comma rule.** Every store line except the last one needs a comma at the end. The last one should not have a comma after the closing `}`.
- **Added an official logo file.** Do not do this until brand use is cleared with corporate. The text wordmark is intentional.

## What this page does not do

- It does not store applications on the website, in the browser, or in a public list. Each submission is emailed to Aydon.
- Sending an automatic confirmation copy to the applicant is a **Web3Forms Pro** feature (not included on the free plan). See the note in the project handoff if you want to turn that on later.
