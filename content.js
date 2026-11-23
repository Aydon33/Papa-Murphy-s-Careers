/*
  ============================================================
  EDITABLE SITE CONTENT
  ============================================================
  This is the only file you should need to change for wording,
  hours-style details, store list, form labels, or the email key.

  How to add a store:
    1. Copy one existing line inside the "locations" list.
    2. Paste it where it belongs so the list stays sorted by city.
    3. Change city, name (store number, like UT074), address, zip,
       and url (the official locations.papamurphys.com page).
    4. Keep the commas exactly as they are: a comma after every
       store except the last one, and quotes around each value.

  How to remove a store:
    Delete that store's whole line, and if you deleted the last
    store, also remove the extra comma on the new last line.

  Only list stores you can verify on the official Papa Murphy's
  location pages. Do not invent addresses or store numbers.

  Source (compiled Nov 23, 2026):
    - https://locations.papamurphys.com/ut  (Utah city directory)
    - https://locations.papamurphys.com/sitemap.xml  (store page URLs)
    - Each store's official page (address, ZIP, and store number)

  BRAND / LOGO NOTE:
    This draft uses a text wordmark only ("Papa Murphy's Utah
    Careers"). Do not add official Papa Murphy's logo files until
    brand use is cleared with corporate.
  ============================================================
*/

var SITE_CONTENT = {
  // Text wordmark shown in the header. Official logo files need
  // brand-use approval before they can replace this.
  wordmark: "Papa Murphy's Utah Careers",

  // Hiring contact. Form submissions are emailed here once the
  // Web3Forms key below is pasted in.
  contactEmail: "aydonmcphee@gmail.com",

  /* ----------------------------------------------------------
     WEB3FORMS ACCESS KEY
     Get a free key at https://web3forms.com by entering
     aydonmcphee@gmail.com, then paste the key below in place
     of the placeholder. Never share this key in chat or email
     it to anyone you do not trust.
     Until a real key is pasted, the form will show
     "Form not connected yet" and will not send applications.
     ---------------------------------------------------------- */
  web3formsAccessKey: "8c0df400-6a46-4020-9f5e-d1461dbf56ca",

  // ----- Header / navigation -----
  navApplyLabel: "Apply",
  navLocationsLabel: "Locations",

  // ----- Hero -----
  heroTitle: "Join the Papa Murphy's Utah team",
  heroIntro: "We're hiring at Papa Murphy's stores across Utah. If you like a busy shift, a friendly crew, and pizza (we figure you do), we'd love to hear from you.",
  heroButtonLabel: "Apply now",

  // ----- Why work with us -----
  whyTitle: "Why work with us",
  whyIntro: "Whether this is your first job or your next one, you'll be part of a crew that takes the work seriously and still has a good time.",
  whyPoints: [
    {
      title: "A crew that has your back",
      text: "You'll work with people who show up, help each other out, and keep the shift moving. New teammates are welcome here — we'll help you get the hang of things."
    },
    {
      title: "Shifts that can fit your life",
      text: "Stores have morning, afternoon, and evening hours, so you can often work around school, another job, or family. Tell us what kind of schedule you're looking for."
    },
    {
      title: "Skills you'll actually use",
      text: "You'll learn food prep, customer service, and teamwork — the kind of real-world skills that help whether you stay with us or go on to something new."
    },
    {
      title: "A place in your community",
      text: "Utah stores from Logan to St. George are neighborhood shops. Browse the locations below and mention the store or city you'd like to join."
    }
  ],

  // ----- Locations list -----
  locationsTitle: "Our Utah locations",
  locationsIntro: "We're looking for teammates at Papa Murphy's stores across Utah. Search by city, address, or store number, and mention your preferred location when you apply.",
  locationsSearchLabel: "Search locations",
  locationsSearchPlaceholder: "City, address, ZIP, or store number",
  locationsEmpty: "No stores match that search. Try a city name or store number.",
  locationsCountTemplate: "{count} locations in Utah",
  locationsOfficialLinkLabel: "Store page",

  /*
    LOCATIONS LIST
    Each item needs: city, name, address, zip, url
      city    — city name, used to group stores
      name    — official store number from the location page (for example UT074)
      address — street address, including suite when there is one
      zip     — 5-digit ZIP code
      url     — official Papa Murphy's location page

    Keep this list sorted by city. See the header comment for
    how to add or remove a store.
  */
  locations: [
    { city: "Bountiful", name: "UT029", address: "91 West 500 South", zip: "84010", url: "https://locations.papamurphys.com/ut/bountiful/91-west-500-south" },
    { city: "Brigham City", name: "UT012", address: "285 North Main Street", zip: "84302", url: "https://locations.papamurphys.com/ut/brigham-city/285-north-main-street" },
    { city: "Cedar City", name: "UT017", address: "70 East 200 North, Suite 1", zip: "84720", url: "https://locations.papamurphys.com/ut/cedar-city/70-east-200-north" },
    { city: "Centerville", name: "UT025", address: "388 North Main Street", zip: "84014", url: "https://locations.papamurphys.com/ut/centerville/388-north-main-street" },
    { city: "Clinton", name: "UT051", address: "1952 North 2000 West, Suite C", zip: "84015", url: "https://locations.papamurphys.com/ut/clinton/1952-north-2000-west" },
    { city: "Cottonwood Heights", name: "UT026", address: "1933 7000 South", zip: "84121", url: "https://locations.papamurphys.com/ut/cottonwood-heights/1933-7000-south" },
    { city: "Draper", name: "UT034", address: "408 East 12300 South", zip: "84020", url: "https://locations.papamurphys.com/ut/draper/408-east-12300-south" },
    { city: "Eagle Mountain", name: "UT074", address: "4276 North 1620 East, Suite 130", zip: "84005", url: "https://locations.papamurphys.com/ut/eagle-mountain/4276-north-1620-east" },
    { city: "Farmington", name: "UT063", address: "1298 North, US-89", zip: "84025", url: "https://locations.papamurphys.com/ut/farmington/1298-north-us-89" },
    { city: "Heber City", name: "UT024", address: "509 North Main Street", zip: "84032", url: "https://locations.papamurphys.com/ut/heber-city/509-north-main-street" },
    { city: "Herriman", name: "UT048", address: "5532 West 13400 South", zip: "84096", url: "https://locations.papamurphys.com/ut/herriman/5532-west-13400-south" },
    { city: "Highland", name: "UT047", address: "5435 West 11000 North, Suite 13", zip: "84003", url: "https://locations.papamurphys.com/ut/highland/5435-west-11000-north" },
    { city: "Holladay", name: "UT010", address: "3932 South 2300 East", zip: "84124", url: "https://locations.papamurphys.com/ut/holladay/3932-south-2300-east" },
    { city: "Hurricane", name: "UT035", address: "535 West State Street", zip: "84737", url: "https://locations.papamurphys.com/ut/hurricane/535-west-state-street" },
    { city: "Layton", name: "UT066", address: "1330 E Highway 193, Ste D-3", zip: "84040", url: "https://locations.papamurphys.com/ut/layton/1330-e-highway-193" },
    { city: "Layton", name: "UT015", address: "210 South Fort Lane", zip: "84041", url: "https://locations.papamurphys.com/ut/layton/210-south-fort-lane" },
    { city: "Layton", name: "UT052", address: "765 West Antelope Drive, Suite C", zip: "84041", url: "https://locations.papamurphys.com/ut/layton/765-west-antelope-drive" },
    { city: "Lehi", name: "UT020", address: "770 East Main Street, Suite C", zip: "84043", url: "https://locations.papamurphys.com/ut/lehi/770-east-main-street" },
    { city: "Logan", name: "UT006", address: "618 North Main Street", zip: "84321", url: "https://locations.papamurphys.com/ut/logan/618-north-main-street" },
    { city: "Magna", name: "UT039", address: "8045 W 3500 S", zip: "84044", url: "https://locations.papamurphys.com/ut/magna/8045-w-3500-s" },
    { city: "Murray", name: "UT014", address: "659 West 5300 South", zip: "84123", url: "https://locations.papamurphys.com/ut/murray/659-west-5300-south" },
    { city: "North Ogden", name: "UT038", address: "2641 North Washington Blvd", zip: "84414", url: "https://locations.papamurphys.com/ut/north-ogden/2641-north-washington-blvd" },
    { city: "Ogden", name: "UT040", address: "1263 Wall Ave, B-2", zip: "84404", url: "https://locations.papamurphys.com/ut/ogden/1263-wall-ave-b-2" },
    { city: "Orem", name: "UT067", address: "1659 N State Street", zip: "84057", url: "https://locations.papamurphys.com/ut/orem/1659-n-state-street" },
    { city: "Orem", name: "UT019", address: "190 West Center Street", zip: "84057", url: "https://locations.papamurphys.com/ut/orem/190-west-center-street" },
    { city: "Park City", name: "UT064", address: "1678 Redstone Center Drive, Suite 120", zip: "84098", url: "https://locations.papamurphys.com/ut/park-city/1678-redstone-center-drive" },
    { city: "Payson", name: "UT045", address: "791 South 930 West, Suite 102", zip: "84651", url: "https://locations.papamurphys.com/ut/payson/791-south-930-west-suite-102" },
    { city: "Pleasant Grove", name: "UT030", address: "981 W State St #130", zip: "84062", url: "https://locations.papamurphys.com/ut/pleasant-grove/981-w-state-st-130" },
    { city: "Providence", name: "UT044", address: "2 North Highway 165, Suite 101", zip: "84332", url: "https://locations.papamurphys.com/ut/providence/2-north-highway-165" },
    { city: "Provo", name: "UT036", address: "979 South University Avenue, Suite 6", zip: "84601", url: "https://locations.papamurphys.com/ut/provo/979-south-university-avenue" },
    { city: "Richfield", name: "UT033", address: "42 North Main Street", zip: "84701", url: "https://locations.papamurphys.com/ut/richfield/42-north-main-street" },
    { city: "Riverton", name: "UT027", address: "1821 West 12600 South", zip: "84065", url: "https://locations.papamurphys.com/ut/riverton/1821-west-12600-south" },
    { city: "Roy", name: "UT002", address: "5697 South 1900 West", zip: "84067", url: "https://locations.papamurphys.com/ut/roy/5697-south-1900-west" },
    { city: "Salt Lake City", name: "UT053", address: "1645 West 700 North, Suite L", zip: "84116", url: "https://locations.papamurphys.com/ut/salt-lake-city/1645-west-700-north" },
    { city: "Salt Lake City", name: "UT001", address: "2286 East 2100 South", zip: "84109", url: "https://locations.papamurphys.com/ut/salt-lake-city/2286-east-2100-south" },
    { city: "Sandy", name: "UT055", address: "7828 South 1300 East", zip: "84094", url: "https://locations.papamurphys.com/ut/sandy/7828-south-1300-east" },
    { city: "Sandy", name: "UT005", address: "9413 Union Square", zip: "84070", url: "https://locations.papamurphys.com/ut/sandy/9413-union-square" },
    { city: "Saratoga Springs", name: "UT056", address: "649 Redwood Rd suite 100", zip: "84045", url: "https://locations.papamurphys.com/ut/saratoga-springs/649-redwood-rd-suite-100" },
    { city: "Smithfield", name: "UT065", address: "840 South Main Street, Suite 102", zip: "84335", url: "https://locations.papamurphys.com/ut/smithfield/840-south-main-street" },
    { city: "South Jordan", name: "UT059", address: "11521 South 4000 West", zip: "84095", url: "https://locations.papamurphys.com/ut/south-jordan/11521-south-4000-west" },
    { city: "South Ogden", name: "UT008", address: "335 36th St.", zip: "84405", url: "https://locations.papamurphys.com/ut/south-ogden/335-36th-st." },
    { city: "South Ogden", name: "UT011", address: "5695 Harrison Blvd.", zip: "84403", url: "https://locations.papamurphys.com/ut/south-ogden/5695-harrison-blvd." },
    { city: "Spanish Fork", name: "UT003", address: "790 North 800 East", zip: "84660", url: "https://locations.papamurphys.com/ut/spanish-fork/790-north-800-east" },
    { city: "Springville", name: "UT054", address: "655 East 400 South, Suite E", zip: "84663", url: "https://locations.papamurphys.com/ut/springville/655-east-400-south" },
    { city: "St. George", name: "UT042", address: "1006 West Sunset Blvd.", zip: "84770", url: "https://locations.papamurphys.com/ut/st.-george/1006-west-sunset-blvd." },
    { city: "St. George", name: "UT004", address: "720 South River Road, Suite A-100", zip: "84790", url: "https://locations.papamurphys.com/ut/st.-george/720-south-river-road" },
    { city: "Syracuse", name: "UT023", address: "2052 West 1700 South, Suite B-2", zip: "84075", url: "https://locations.papamurphys.com/ut/syracuse/2052-west-1700-south" },
    { city: "Tooele", name: "UT021", address: "1341 North Main", zip: "84074", url: "https://locations.papamurphys.com/ut/tooele/1341-north-main" },
    { city: "Vernal", name: "UT049", address: "1820 W Highway 40", zip: "84078", url: "https://locations.papamurphys.com/ut/vernal/1820-w-highway-40" },
    { city: "Washington", name: "UT075", address: "147 Washington Parkway", zip: "84780", url: "https://locations.papamurphys.com/ut/washington/147-washington-parkway" },
    { city: "West Jordan", name: "UT013", address: "2688 West 9000 South", zip: "84088", url: "https://locations.papamurphys.com/ut/west-jordan/2688-west-9000-south" },
    { city: "West Jordan", name: "UT032", address: "6898 South Redwood Road", zip: "84084", url: "https://locations.papamurphys.com/ut/west-jordan/6898-south-redwood-road" },
    { city: "West Jordan", name: "UT043", address: "7759 South 4800 West", zip: "84084", url: "https://locations.papamurphys.com/ut/west-jordan/7759-south-4800-west" },
    { city: "West Valley City", name: "UT016", address: "3525 West 3500 South", zip: "84119", url: "https://locations.papamurphys.com/ut/west-valley-city/3525-west-3500-south" },
    { city: "West Valley City", name: "UT009", address: "4578 South 4000 West", zip: "84120", url: "https://locations.papamurphys.com/ut/west-valley-city/4578-south-4000-west" },
    { city: "West Valley City", name: "UT069", address: "5633 West 6200 South", zip: "84118", url: "https://locations.papamurphys.com/ut/west-valley-city/5633-west-6200-south" }
  ],

  // ----- Interest form -----
  formTitle: "Tell us you're interested",
  formIntro: "Fill this out and we'll get back to you. It takes about a minute. If you have a preferred store or city, mention it in the box at the bottom.",
  formRequiredNote: "Required fields are marked with an asterisk (*).",
  formFirstNameLabel: "First name",
  formLastNameLabel: "Last name",
  formPhoneLabel: "Phone number",
  formEmailLabel: "Email",
  formExtraLabel: "Anything else you'd like to share?",
  formExtraHint: "Preferred store or city, days you can work, or anything else we should know.",
  formSubmitLabel: "Send my interest",
  formSendingLabel: "Sending…",
  formNotConnected: "Form not connected yet. Applications can't be sent until an access key is added.",
  formError: "Sorry, that didn't go through. Please try again in a minute, or email us directly at {email}.",
  formPrivacy: "Your information is emailed only to our hiring contact. Nothing is stored on this website, and applications are not shown to the public.",
  formPhoneError: "Please enter a valid 10-digit U.S. phone number.",
  formEmailError: "Please enter a valid email address.",

  // ----- Thank-you message (shown after a successful submit) -----
  thankYouTitle: "Thanks for reaching out!",
  thankYouBody: "We've got your info and will be in touch. Keep an eye on your email and phone.",

  // ----- Footer -----
  footerIndependent: "Each Papa Murphy's location is independently owned and operated.",
  footerContactTemplate: "Questions? Email {email}",
  footerDraftNote: "This is a local draft and is not a live public site."
};
