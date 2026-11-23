/*
  Page behavior for the Papa Murphy's Utah Careers draft.

  - Fills in all wording from SITE_CONTENT in content.js
  - Renders the store list, grouped by city, with a search box
  - Sends the interest form to Web3Forms (nothing is stored here)
  - Shows an inline thank-you on success

  Do not add localStorage, cookies, or a public list of applications.
*/

(function () {
  "use strict";

  var content = window.SITE_CONTENT;
  if (!content) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      "<p class='notice notice-warn'>content.js did not load. Check that the file is in the same folder as this page.</p>"
    );
    return;
  }

  var KEY_PLACEHOLDER = "PASTE_WEB3FORMS_ACCESS_KEY_HERE";

  function text(id, value) {
    var el = document.getElementById(id);
    if (el && value != null) el.textContent = value;
  }

  function withEmail(template) {
    return String(template || "").replace(/\{email\}/g, content.contactEmail || "");
  }

  function isFormConnected() {
    var key = (content.web3formsAccessKey || "").trim();
    return key.length > 0 && key !== KEY_PLACEHOLDER;
  }

  function fillStaticText() {
    document.title = content.wordmark || document.title;

    text("wordmark", content.wordmark);
    text("nav-locations", content.navLocationsLabel);
    text("nav-apply", content.navApplyLabel);

    text("hero-title", content.heroTitle);
    text("hero-intro", content.heroIntro);
    text("hero-button", content.heroButtonLabel);

    text("why-title", content.whyTitle);
    text("why-intro", content.whyIntro);

    var pointsWrap = document.getElementById("why-points");
    pointsWrap.innerHTML = "";
    (content.whyPoints || []).forEach(function (point) {
      var card = document.createElement("article");
      card.className = "why-card";
      var h = document.createElement("h3");
      h.textContent = point.title;
      var p = document.createElement("p");
      p.textContent = point.text;
      card.appendChild(h);
      card.appendChild(p);
      pointsWrap.appendChild(card);
    });

    text("locations-title", content.locationsTitle);
    text("locations-intro", content.locationsIntro);
    text("location-search-label", content.locationsSearchLabel);
    document.getElementById("location-search").placeholder =
      content.locationsSearchPlaceholder || "";
    text("locations-empty", content.locationsEmpty);

    var count = (content.locations || []).length;
    text(
      "locations-count",
      String(content.locationsCountTemplate || "").replace(/\{count\}/g, String(count))
    );

    text("form-title", content.formTitle);
    text("form-intro", content.formIntro);
    text("form-required-note", content.formRequiredNote);
    text("label-first", content.formFirstNameLabel);
    text("label-last", content.formLastNameLabel);
    text("label-phone", content.formPhoneLabel);
    text("label-email", content.formEmailLabel);
    text("label-extra", content.formExtraLabel);
    text("extra-hint", content.formExtraHint);
    text("form-submit", content.formSubmitLabel);
    text("form-privacy", content.formPrivacy);
    text("phone-error", content.formPhoneError);
    text("email-error", content.formEmailError);
    text("thank-you-title", content.thankYouTitle);
    text("thank-you-body", content.thankYouBody);
    text("footer-independent", content.footerIndependent);
    text("footer-contact", withEmail(content.footerContactTemplate));
    text("footer-draft", content.footerDraftNote);

    var contactEl = document.getElementById("footer-contact");
    if (contactEl && content.contactEmail) {
      contactEl.innerHTML = "";
      contactEl.appendChild(document.createTextNode("Questions? Email "));
      // Rebuild from the template if it contains {email}.
      var template = content.footerContactTemplate || "Questions? Email {email}";
      var parts = template.split("{email}");
      contactEl.innerHTML = "";
      var before = parts[0] || "Questions? Email ";
      if (before && !/\s$/.test(before)) before += " ";
      contactEl.appendChild(document.createTextNode(before));
      var mail = document.createElement("a");
      mail.href = "mailto:" + content.contactEmail;
      mail.textContent = content.contactEmail;
      contactEl.appendChild(mail);
      if (parts[1]) contactEl.appendChild(document.createTextNode(parts[1]));
    }

    var notConnected = document.getElementById("form-not-connected");
    notConnected.textContent = content.formNotConnected;
    if (!isFormConnected()) {
      notConnected.hidden = false;
      document.getElementById("form-submit").disabled = true;
    } else {
      notConnected.hidden = true;
    }
  }

  function groupByCity(list) {
    var groups = [];
    var map = {};
    list.forEach(function (store) {
      var city = store.city || "";
      if (!map[city]) {
        map[city] = { city: city, stores: [] };
        groups.push(map[city]);
      }
      map[city].stores.push(store);
    });
    return groups;
  }

  function storeMatches(store, query) {
    if (!query) return true;
    var hay = [store.city, store.name, store.address, store.zip]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function renderLocations(query) {
    var q = (query || "").trim().toLowerCase();
    var matches = (content.locations || []).filter(function (store) {
      return storeMatches(store, q);
    });
    var wrap = document.getElementById("locations-list");
    var empty = document.getElementById("locations-empty");
    wrap.innerHTML = "";

    if (!matches.length) {
      empty.hidden = false;
      return;
    }
    empty.hidden = true;

    groupByCity(matches).forEach(function (group) {
      var section = document.createElement("section");
      section.className = "city-group";
      section.setAttribute("aria-label", group.city);

      var heading = document.createElement("h3");
      heading.textContent = group.city;
      section.appendChild(heading);

      var ul = document.createElement("ul");
      ul.className = "store-list";

      group.stores.forEach(function (store) {
        var li = document.createElement("li");
        li.className = "store";

        var name = document.createElement("span");
        name.className = "store-name";
        name.textContent = store.name;
        li.appendChild(name);

        var addr = document.createElement("span");
        addr.className = "store-address";
        addr.textContent = store.address + ", " + store.city + ", UT " + store.zip;
        li.appendChild(addr);

        if (store.url) {
          var link = document.createElement("a");
          link.className = "store-link";
          link.href = store.url;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = content.locationsOfficialLinkLabel || "Store page";
          li.appendChild(link);
        }

        ul.appendChild(li);
      });

      section.appendChild(ul);
      wrap.appendChild(section);
    });
  }

  var PHONE_RE = /^\s*(?:\+1[\s.\-]?)?(?:\(?\d{3}\)?[\s.\-]?)\d{3}[\s.\-]?\d{4}\s*$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(id, on) {
    var input = document.getElementById(id);
    var err = document.getElementById(id + "-error");
    input.setAttribute("aria-invalid", on ? "true" : "false");
    if (err) err.hidden = !on;
  }

  function validateForm(form) {
    var first = form.first_name.value.trim();
    var last = form.last_name.value.trim();
    var phone = form.phone.value.trim();
    var email = form.email.value.trim();
    var ok = true;

    if (!first) ok = false;
    if (!last) ok = false;

    var phoneOk = PHONE_RE.test(phone);
    showFieldError("phone", !phoneOk);
    if (!phoneOk) ok = false;

    var emailOk = EMAIL_RE.test(email);
    showFieldError("email", !emailOk);
    if (!emailOk) ok = false;

    return ok;
  }

  function setStatus(message, isError) {
    var el = document.getElementById("form-status");
    if (!message) {
      el.hidden = true;
      el.textContent = "";
      el.className = "form-status";
      return;
    }
    el.hidden = false;
    el.textContent = message;
    el.className = "form-status" + (isError ? " is-error" : "");
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.target;

    // If a bot filled the honeypot, quietly stop. Do not store anything.
    if (form.botcheck && form.botcheck.checked) {
      return;
    }

    if (!isFormConnected()) {
      document.getElementById("form-not-connected").hidden = false;
      setStatus(content.formNotConnected, true);
      return;
    }

    if (!form.reportValidity()) {
      validateForm(form);
      return;
    }
    if (!validateForm(form)) {
      return;
    }

    var first = form.first_name.value.trim();
    var last = form.last_name.value.trim();
    var phone = form.phone.value.trim();
    var email = form.email.value.trim();
    var extra = form.message.value.trim();
    var fullName = first + " " + last;

    var payload = {
      access_key: content.web3formsAccessKey.trim(),
      subject: "New Papa Murphy's Utah application: " + fullName,
      from_name: fullName,
      replyto: email,
      botcheck: "",
      email: email,
      "First name": first,
      "Last name": last,
      Phone: phone,
      Email: email,
      "Anything else you'd like to share": extra || "(none)"
    };

    var button = document.getElementById("form-submit");
    button.disabled = true;
    button.textContent = content.formSendingLabel || "Sending…";
    setStatus("");

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        return res.json().then(function (data) {
          return { ok: res.ok && data && data.success, data: data };
        });
      })
      .then(function (result) {
        if (!result.ok) {
          throw new Error((result.data && result.data.message) || "submit failed");
        }
        form.hidden = true;
        document.getElementById("form-not-connected").hidden = true;
        document.getElementById("form-required-note").hidden = true;
        document.getElementById("form-intro").hidden = true;
        document.getElementById("thank-you").hidden = false;
        document.getElementById("thank-you").focus();
        document.getElementById("thank-you-title").focus();
      })
      .catch(function () {
        setStatus(withEmail(content.formError), true);
        button.disabled = false;
        button.textContent = content.formSubmitLabel;
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillStaticText();
    renderLocations("");

    var search = document.getElementById("location-search");
    search.addEventListener("input", function () {
      renderLocations(search.value);
    });

    document.getElementById("phone").addEventListener("input", function () {
      if (this.value.trim()) showFieldError("phone", !PHONE_RE.test(this.value));
    });
    document.getElementById("email").addEventListener("input", function () {
      if (this.value.trim()) showFieldError("email", !EMAIL_RE.test(this.value));
    });

    document.getElementById("interest-form").addEventListener("submit", handleSubmit);

    var thankYou = document.getElementById("thank-you");
    thankYou.setAttribute("tabindex", "-1");
  });
})();
