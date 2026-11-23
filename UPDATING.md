# How to update the Utah careers page

This is a short guide for changing wording, stores, or the form. You usually only need to edit **content.js**. You do not need to change the layout files (`index.html`, `styles.css`, or `script.js`) for ordinary updates.

The page is a stepped application (Store → Rank → Shifts → About you → Review) with a store list you can expand for hours. Layout and typography follow a hiring-site template, rethemed in Papa Murphy’s colors: white background, red `#da291c`, teal accent `#0e7c86`, and grayish-black text `#2b2b2b`. Do not add official logo files.

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
- Form questions also live here: the store dropdown label, the rank choices (`formRankOptions`: Crew Member, Shift Lead, Supervisor, Assistant Manager, Manager), the shift choices (`formShiftsOptions`), the optional “Anything else…” box, and the step names in `formSteps` (`Store`, `Rank`, `Shifts`, `About you`, `Review`). Changing a store in the `locations` list updates the dropdown automatically.
- The application walks through those five steps. Each step has to be valid before Continue will move on. Labels for Continue, Back, and the review summary are also in `content.js`.
- Header wording is split into `wordmark` and `wordmarkTagline`. The hero heading is `heroTitle` plus the italic accent `heroAccent`.


## Add or remove a store

Stores live in the `locations` list in `content.js`. There is also a spreadsheet-style copy of the address list in `utah-locations.csv`. If you change a store’s city, name, address, ZIP, or official page, update both files so they stay in sync. Phone, hours, and services are only in `content.js`.

Each store looks like this:

```
{
  city: "Eagle Mountain",
  name: "UT074",
  address: "4276 North 1620 East, Suite 130",
  zip: "84005",
  phone: "(801) 789-2140",
  hours: {
    Monday: "10:00 AM – 9:00 PM",
    Tuesday: "10:00 AM – 9:00 PM",
    Wednesday: "10:00 AM – 9:00 PM",
    Thursday: "10:00 AM – 9:00 PM",
    Friday: "10:00 AM – 9:00 PM",
    Saturday: "10:00 AM – 9:00 PM",
    Sunday: "11:00 AM – 7:00 PM"
  },
  services: "Walk-ins welcome, Kid’s Meal, Takeout, Online Pizza Deals, Delivery, Fundraising, SNAP EBT restaurant",
  url: "https://locations.papamurphys.com/ut/eagle-mountain/4276-north-1620-east"
}
```

- `city` is used to group stores on the page.
- `name` is the official store number (for example UT074).
- `address` is the street address, including the suite if there is one.
- `zip` is the 5-digit ZIP code.
- `phone` is the store phone number from the official page.
- `hours` is the weekly schedule from the official page. Use `"Closed"` only if that page lists the day as closed.
- `services` is the services line from the official page (optional).
- `url` is the official Papa Murphy’s location page. Use it when you need to recheck hours. The careers page does not link out to it.

On the page, tapping a store expands it in place and shows the address, phone, hours, and services. There is no “Store page” link.

The application form’s “Which store are you applying to?” dropdown is built automatically from this list. It is sorted by store number and labeled like `UT074 Eagle Mountain`. If a city has more than one store, the street address is added so they can be told apart.

**To add a store:** copy an existing store block, paste it so the list stays sorted by city, and change the values. Keep a comma after every store except the last one.

**To remove a store:** delete that store’s whole block. If it was the last store in the list, also remove the extra comma on the new last block.

**To update hours or phone:** open the official page in `url`, copy the phone and the Monday–Sunday hours, and paste them here. Do not invent hours. If a store’s hours are not listed, leave the `hours` field off. The page will show “Hours not listed”. Hours and phone in this file were copied from the official pages on November 23, 2026, and should be rechecked from time to time, especially around holidays.

Only list stores you can verify on [locations.papamurphys.com/ut](https://locations.papamurphys.com/ut). Do not invent an address, store number, or hours.

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
- **Broke the last-store comma rule.** Every store block except the last one needs a comma after the closing `}`. The last one should not.
- **Guessed a store’s hours.** If the official page does not list hours, leave the `hours` field off so the page shows “Hours not listed”.
- **Added an official logo file.** Do not do this until brand use is cleared with corporate. The text wordmark is intentional.

## What this page does not do

- It does not store applications on the website, in the browser, or in a public list. Each submission is emailed to Aydon.
- Sending an automatic confirmation copy to the applicant is a **Web3Forms Pro** feature (not included on the free plan). See the note in the project handoff if you want to turn that on later.
