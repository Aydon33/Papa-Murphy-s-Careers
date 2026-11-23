/*
  Page behavior for the Papa Murphy's Utah Careers site.

  - Fills in all wording from SITE_CONTENT in content.js
  - Renders the store list, grouped by city, with inline expansion
  - Walks the interest form through validated steps
  - Sends the form to Web3Forms (nothing is stored here)
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
  var DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  var STEP_COUNT = 5;
  var currentStep = 0;

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

  function cityCounts(list) {
    var counts = {};
    (list || []).forEach(function (store) {
      var city = store.city || "";
      counts[city] = (counts[city] || 0) + 1;
    });
    return counts;
  }

  function storeSortKey(name) {
    var raw = String(name || "");
    var match = raw.match(/(\d+)/);
    if (!match) return [raw.toLowerCase(), 0];
    return [raw.slice(0, match.index).toLowerCase(), parseInt(match[1], 10)];
  }

  function sortStoresByNumber(list) {
    return (list || []).slice().sort(function (a, b) {
      var ka = storeSortKey(a.name);
      var kb = storeSortKey(b.name);
      if (ka[0] !== kb[0]) return ka[0] < kb[0] ? -1 : 1;
      if (ka[1] !== kb[1]) return ka[1] - kb[1];
      return String(a.name).localeCompare(String(b.name));
    });
  }

  function storeChoiceLabel(store, counts) {
    var label = (store.name || "") + " " + (store.city || "");
    if ((counts[store.city] || 0) > 1 && store.address) {
      label += " (" + store.address + ")";
    }
    return label.trim();
  }

  function findStoreByName(name) {
    var list = content.locations || [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].name === name) return list[i];
    }
    return null;
  }

  function phoneHref(phone) {
    var digits = String(phone || "").replace(/\D/g, "");
    if (digits.length === 10) return "tel:+1" + digits;
    if (digits.length === 11 && digits.charAt(0) === "1") return "tel:+" + digits;
    if (digits.length) return "tel:" + digits;
    return "";
  }

  function hoursForStore(store) {
    var raw = store && store.hours;
    if (!raw) return [];
    if (Array.isArray(raw)) {
      return raw
        .map(function (row) {
          if (!row) return null;
          if (typeof row === "string") return row;
          if (row.day) return { day: row.day, time: row.time || "" };
          return null;
        })
        .filter(Boolean);
    }
    var rows = [];
    DAYS.forEach(function (day) {
      if (Object.prototype.hasOwnProperty.call(raw, day) && raw[day]) {
        rows.push({ day: day, time: raw[day] });
      }
    });
    return rows;
  }

  function fillStaticText() {
    document.title = content.pageTitle || content.wordmark || document.title;

    text("wordmark", content.wordmark);
    text("wordmark-tag", content.wordmarkTagline);
    text("nav-locations", content.navLocationsLabel);
    text("nav-apply", content.navApplyLabel);

    text("hero-eyebrow", content.heroEyebrow);
    text("hero-title-main", content.heroTitle ? content.heroTitle + " " : "");
    text("hero-accent", content.heroAccent);
    text("hero-intro", content.heroIntro);
    text("hero-button", content.heroButtonLabel);

    var count = (content.locations || []).length;
    text("hero-stat-number", String(count));
    text("hero-stat-label", content.heroStatLabel);

    text("why-title", content.whyTitle);
    text("why-intro", content.whyIntro);

    var pointsWrap = document.getElementById("why-points");
    pointsWrap.innerHTML = "";
    (content.whyPoints || []).forEach(function (point) {
      var li = document.createElement("li");
      var h = document.createElement("h3");
      h.textContent = point.title;
      var p = document.createElement("p");
      p.textContent = point.text;
      li.appendChild(h);
      li.appendChild(p);
      pointsWrap.appendChild(li);
    });

    text("how-title", content.howTitle);
    var howWrap = document.getElementById("how-steps");
    howWrap.innerHTML = "";
    (content.howSteps || []).forEach(function (step, index) {
      var li = document.createElement("li");
      li.className = "how-step";
      var num = document.createElement("span");
      num.className = "how-num";
      num.textContent = String(index + 1);
      var body = document.createElement("div");
      var h = document.createElement("h3");
      h.textContent = step.title;
      var p = document.createElement("p");
      p.textContent = step.text;
      body.appendChild(h);
      body.appendChild(p);
      li.appendChild(num);
      li.appendChild(body);
      howWrap.appendChild(li);
    });

    text("locations-title", content.locationsTitle);
    text("locations-intro", content.locationsIntro);
    text("location-search-label", content.locationsSearchLabel);
    document.getElementById("location-search").placeholder =
      content.locationsSearchPlaceholder || "";
    text("locations-empty", content.locationsEmpty);
    text(
      "locations-count",
      String(content.locationsCountTemplate || "").replace(/\{count\}/g, String(count))
    );

    text("form-eyebrow", content.formEyebrow);
    text("form-title", content.formTitle);
    text("form-intro", content.formIntro);
    text("form-required-note", content.formRequiredNote);
    text("label-first", content.formFirstNameLabel);
    text("label-last", content.formLastNameLabel);
    text("label-phone", content.formPhoneLabel);
    text("label-email", content.formEmailLabel);
    text("label-store", content.formStoreLabel);
    text("store-hint", content.formStoreHint);
    text("store-placeholder", content.formStorePlaceholder);
    text("label-rank", content.formRankLabel);
    text("rank-hint", content.formRankHint);
    text("label-shifts", content.formShiftsLabel);
    text("shifts-hint", content.formShiftsHint);
    text("about-title", content.formAboutTitle);
    text("review-title", content.formReviewTitle);
    text("review-store-label", content.formReviewStoreLabel);
    text("review-rank-label", content.formReviewRankLabel);
    text("review-shifts-label", content.formReviewShiftsLabel);
    text("label-extra", content.formExtraLabel);
    text("extra-hint", content.formExtraHint);
    text("form-back", content.formBackLabel);
    text("form-continue", content.formContinueLabel);
    text("form-submit", content.formSubmitLabel);
    text("form-privacy", content.formPrivacy);
    text("phone-error", content.formPhoneError);
    text("email-error", content.formEmailError);
    text("store-error", content.formStoreError);
    text("rank-error", content.formRankError);
    text("shifts-error", content.formShiftsError);
    text("thank-you-title", content.thankYouTitle);
    text("thank-you-body", content.thankYouBody);
    text("footer-brand", content.wordmark + (content.wordmarkTagline ? " · " + content.wordmarkTagline : ""));
    text("footer-independent", content.footerIndependent);
    text("footer-draft", content.footerDraftNote);

    var contactEl = document.getElementById("footer-contact");
    if (contactEl && content.contactEmail) {
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

    populateStoreSelect();
    populateRankOptions();
    populateShiftOptions();
    renderStepper();
    showStep(0);
  }

  function populateStoreSelect() {
    var select = document.getElementById("store");
    if (!select) return;

    var current = select.value;
    var placeholderLabel = content.formStorePlaceholder || "Select a store";
    select.innerHTML = "";

    var placeholder = document.createElement("option");
    placeholder.value = "";
    placeholder.disabled = true;
    placeholder.selected = true;
    placeholder.id = "store-placeholder";
    placeholder.textContent = placeholderLabel;
    select.appendChild(placeholder);

    var list = sortStoresByNumber(content.locations || []);
    var counts = cityCounts(content.locations || []);
    list.forEach(function (store) {
      if (!store || !store.name) return;
      var opt = document.createElement("option");
      opt.value = store.name;
      opt.textContent = storeChoiceLabel(store, counts);
      select.appendChild(opt);
    });

    if (current && findStoreByName(current)) {
      select.value = current;
    }
  }


  function populateRankOptions() {
    var wrap = document.getElementById("rank-options");
    if (!wrap) return;
    wrap.innerHTML = "";
    (content.formRankOptions || []).forEach(function (label, index) {
      var id = "rank-option-" + index;
      var lab = document.createElement("label");
      lab.className = "rank-option";
      lab.setAttribute("for", id);
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "rank";
      input.value = label;
      input.id = id;
      var card = document.createElement("span");
      card.className = "rank-card";
      card.textContent = label;
      lab.appendChild(input);
      lab.appendChild(card);
      wrap.appendChild(lab);
    });
  }

  function populateShiftOptions() {
    var wrap = document.getElementById("shift-options");
    if (!wrap) return;
    wrap.innerHTML = "";
    (content.formShiftsOptions || []).forEach(function (label, index) {
      var id = "shift-option-" + index;
      var lab = document.createElement("label");
      lab.className = "shift-option";
      lab.setAttribute("for", id);
      var input = document.createElement("input");
      input.type = "checkbox";
      input.name = "shifts";
      input.value = label;
      input.id = id;
      var card = document.createElement("span");
      card.className = "shift-card";
      card.textContent = label;
      lab.appendChild(input);
      lab.appendChild(card);
      wrap.appendChild(lab);
    });
  }

  function renderStepper() {
    var wrap = document.getElementById("stepper");
    wrap.innerHTML = "";
    var labels = content.formSteps || ["Store", "Rank", "Shifts", "About you", "Review"];
    labels.forEach(function (label, index) {
      var li = document.createElement("li");
      var btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-step", String(index));
      var num = document.createElement("span");
      num.className = "step-num";
      num.textContent = String(index + 1);
      var name = document.createElement("span");
      name.className = "step-label";
      name.textContent = label;
      btn.appendChild(num);
      btn.appendChild(name);
      if (index === currentStep) {
        btn.className = "is-current";
        btn.setAttribute("aria-current", "step");
      } else if (index < currentStep) {
        btn.className = "is-done";
      } else {
        btn.disabled = true;
      }
      li.appendChild(btn);
      wrap.appendChild(li);
    });
  }

  function showStep(step) {
    currentStep = Math.max(0, Math.min(STEP_COUNT - 1, step));
    for (var i = 0; i < STEP_COUNT; i++) {
      var panel = document.getElementById("step-" + i);
      if (panel) panel.hidden = i !== currentStep;
    }
    var back = document.getElementById("form-back");
    var cont = document.getElementById("form-continue");
    var submit = document.getElementById("form-submit");
    back.disabled = currentStep === 0;
    var last = currentStep === STEP_COUNT - 1;
    cont.hidden = last;
    submit.hidden = !last;
    if (last) updateReview();
    renderStepper();
    setStepError("");
  }

  function setStepError(message) {
    var el = document.getElementById("step-error");
    if (!message) {
      el.hidden = true;
      el.textContent = "";
      return;
    }
    el.hidden = false;
    el.textContent = message;
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
    var hay = [store.city, store.name, store.address, store.zip, store.phone]
      .join(" ")
      .toLowerCase();
    return hay.indexOf(query) !== -1;
  }

  function fullAddress(store) {
    return store.address + ", " + store.city + ", UT " + store.zip;
  }

  function renderStoreDetails(store) {
    var details = document.createElement("div");
    details.className = "store-details";
    details.id = "store-panel-" + store.name;
    details.hidden = true;

    var addr = document.createElement("p");
    addr.className = "store-detail-line";
    addr.textContent = fullAddress(store);
    details.appendChild(addr);

    if (store.phone) {
      var phoneLine = document.createElement("p");
      phoneLine.className = "store-detail-line";
      var phoneLabel = document.createElement("span");
      phoneLabel.className = "store-detail-label";
      phoneLabel.textContent = (content.locationsPhoneLabel || "Phone") + ": ";
      phoneLine.appendChild(phoneLabel);
      var tel = document.createElement("a");
      tel.className = "store-phone";
      tel.href = phoneHref(store.phone);
      tel.textContent = store.phone;
      phoneLine.appendChild(tel);
      details.appendChild(phoneLine);
    } else {
      var missingPhone = document.createElement("p");
      missingPhone.className = "store-detail-line store-detail-missing";
      missingPhone.textContent = content.locationsPhoneMissing || "Phone not listed";
      details.appendChild(missingPhone);
    }

    var hoursHeading = document.createElement("h4");
    hoursHeading.className = "store-details-label";
    hoursHeading.id = "store-hours-label-" + store.name;
    hoursHeading.textContent = content.locationsHoursLabel || "Hours";
    details.appendChild(hoursHeading);

    var hours = hoursForStore(store);
    if (!hours.length) {
      var missingHours = document.createElement("p");
      missingHours.className = "store-detail-missing";
      missingHours.textContent = content.locationsHoursMissing || "Hours not listed";
      details.appendChild(missingHours);
    } else {
      var table = document.createElement("table");
      table.className = "store-hours";
      table.setAttribute("aria-labelledby", hoursHeading.id);
      var tbody = document.createElement("tbody");
      hours.forEach(function (row) {
        var tr = document.createElement("tr");
        if (String(row.time).toLowerCase() === "closed") {
          tr.className = "is-closed";
        }
        var th = document.createElement("th");
        th.scope = "row";
        th.textContent = row.day;
        var td = document.createElement("td");
        td.textContent = row.time;
        tr.appendChild(th);
        tr.appendChild(td);
        tbody.appendChild(tr);
      });
      table.appendChild(tbody);
      details.appendChild(table);
    }

    if (store.services) {
      var services = document.createElement("p");
      services.className = "store-services";
      var servicesLabel = document.createElement("span");
      servicesLabel.className = "store-detail-label";
      servicesLabel.textContent = (content.locationsServicesLabel || "Services") + ": ";
      services.appendChild(servicesLabel);
      services.appendChild(document.createTextNode(store.services));
      details.appendChild(services);
    }

    var applyBtn = document.createElement("button");
    applyBtn.type = "button";
    applyBtn.className = "store-apply";
    applyBtn.setAttribute("data-apply-store", store.name);
    applyBtn.textContent = content.locationsApplyLabel || "Apply at this store";
    details.appendChild(applyBtn);

    return details;
  }

  function toggleStore(button, expanded) {
    var panelId = button.getAttribute("aria-controls");
    var panel = panelId ? document.getElementById(panelId) : null;
    button.setAttribute("aria-expanded", expanded ? "true" : "false");
    if (panel) panel.hidden = !expanded;
    var storeName = button.getAttribute("data-store-name") || "";
    var address = button.getAttribute("data-store-address") || "";
    var hint = expanded
      ? content.locationsCollapseHint || "Hide hours and details"
      : content.locationsExpandHint || "Show hours and details";
    button.setAttribute("aria-label", [storeName, address, hint].filter(Boolean).join(". ") + ".");
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

        var button = document.createElement("button");
        button.type = "button";
        button.className = "store-toggle";
        button.id = "store-toggle-" + store.name;
        button.setAttribute("aria-expanded", "false");
        button.setAttribute("aria-controls", "store-panel-" + store.name);
        button.setAttribute("data-store-name", store.name);
        button.setAttribute("data-store-address", fullAddress(store));

        var main = document.createElement("span");
        main.className = "store-toggle-main";

        var name = document.createElement("span");
        name.className = "store-name";
        name.textContent = store.name;
        main.appendChild(name);

        var addr = document.createElement("span");
        addr.className = "store-address";
        addr.textContent = fullAddress(store);
        main.appendChild(addr);

        button.appendChild(main);

        var chevron = document.createElement("span");
        chevron.className = "store-chevron";
        chevron.setAttribute("aria-hidden", "true");
        button.appendChild(chevron);

        toggleStore(button, false);

        li.appendChild(button);
        li.appendChild(renderStoreDetails(store));
        ul.appendChild(li);
      });

      section.appendChild(ul);
      wrap.appendChild(section);
    });
  }

  function applyAtStore(storeName) {
    var store = findStoreByName(storeName);
    if (!store) return;
    var select = document.getElementById("store");
    select.value = storeName;
    showFieldError("store", false);
    showStep(0);
    var apply = document.getElementById("apply");
    if (apply) apply.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  var PHONE_RE = /^\s*(?:\+1[\s.\-]?)?(?:\(?\d{3}\)?[\s.\-]?)\d{3}[\s.\-]?\d{4}\s*$/;
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function showFieldError(id, on) {
    var input = document.getElementById(id);
    var err = document.getElementById(id + "-error");
    if (input) input.setAttribute("aria-invalid", on ? "true" : "false");
    if (err) err.hidden = !on;
  }

  function selectedRank() {
    var box = document.querySelector("#rank-options input[type='radio']:checked");
    return box ? box.value : "";
  }

  function showRankError(on) {
    var err = document.getElementById("rank-error");
    var fieldset = document.getElementById("rank-fieldset");
    if (err) err.hidden = !on;
    if (fieldset) fieldset.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function selectedShifts() {
    var boxes = document.querySelectorAll("#shift-options input[type='checkbox']");
    var values = [];
    boxes.forEach(function (box) {
      if (box.checked) values.push(box.value);
    });
    return values;
  }

  function showShiftsError(on) {
    var err = document.getElementById("shifts-error");
    var fieldset = document.getElementById("shifts-fieldset");
    if (err) err.hidden = !on;
    if (fieldset) fieldset.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function chosenStoreLabel() {
    var value = document.getElementById("store").value;
    var store = findStoreByName(value);
    if (!store) return "";
    return storeChoiceLabel(store, cityCounts(content.locations || []));
  }

  function validateStep(step) {
    var form = document.getElementById("interest-form");
    if (step === 0) {
      var storeOk = !!findStoreByName(form.preferred_store.value);
      showFieldError("store", !storeOk);
      return storeOk ? "" : content.formStoreError || "Please choose a store.";
    }
    if (step === 1) {
      var rankOk = !!selectedRank();
      showRankError(!rankOk);
      return rankOk ? "" : content.formRankError || "Please choose what you want to apply for.";
    }
    if (step === 2) {
      var shiftsOk = selectedShifts().length > 0;
      showShiftsError(!shiftsOk);
      return shiftsOk ? "" : content.formShiftsError || "Please choose at least one shift.";
    }
    if (step === 3) {
      var first = form.first_name.value.trim();
      var last = form.last_name.value.trim();
      var phone = form.phone.value.trim();
      var email = form.email.value.trim();
      var phoneOk = PHONE_RE.test(phone);
      var emailOk = EMAIL_RE.test(email);
      showFieldError("phone", !phoneOk);
      showFieldError("email", !emailOk);
      if (!first || !last) return "Please enter your first and last name.";
      if (!phoneOk) return content.formPhoneError || "Please enter a valid phone number.";
      if (!emailOk) return content.formEmailError || "Please enter a valid email address.";
      return "";
    }
    return "";
  }

  function tryContinue() {
    var message = validateStep(currentStep);
    if (message) {
      setStepError(message);
      return false;
    }
    setStepError("");
    showStep(currentStep + 1);
    return true;
  }

  function updateReview() {
    text("review-store-value", chosenStoreLabel() || "—");
    text("review-rank-value", selectedRank() || "—");
    var shifts = selectedShifts();
    text("review-shifts-value", shifts.length ? shifts.join(", ") : "—");
  }

  function validateForm(form) {
    var ok = true;
    var i;
    for (i = 0; i < STEP_COUNT - 1; i++) {
      if (validateStep(i)) ok = false;
    }
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

  function buildSubmissionPayload(form) {
    var first = form.first_name.value.trim();
    var last = form.last_name.value.trim();
    var phone = form.phone.value.trim();
    var email = form.email.value.trim();
    var extra = form.message.value.trim();
    var fullName = first + " " + last;
    var storeLabel = chosenStoreLabel();
    var shifts = selectedShifts().join(", ");

    return {
      access_key: content.web3formsAccessKey.trim(),
      subject: "New Papa Murphy's Utah application: " + fullName + " – " + selectedRank() + " – " + storeLabel,
      from_name: fullName,
      replyto: email,
      botcheck: "",
      email: email,
      "First name": first,
      "Last name": last,
      Phone: phone,
      Email: email,
      "Which store are you applying to?": storeLabel,
      "What do you want to apply for?": selectedRank(),
      "Shift preference": shifts,
      "Anything else you'd like to share before we schedule an interview?": extra || "(none)"
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    var form = event.target;

    if (currentStep < STEP_COUNT - 1) {
      tryContinue();
      return;
    }

    if (form.botcheck && form.botcheck.checked) {
      return;
    }

    if (!isFormConnected()) {
      document.getElementById("form-not-connected").hidden = false;
      setStatus(content.formNotConnected, true);
      return;
    }

    var stepMessage = validateStep(0) || validateStep(1) || validateStep(2) || validateStep(3);
    if (stepMessage) {
      setStatus(stepMessage, true);
      if (validateStep(0)) showStep(0);
      else if (validateStep(1)) showStep(1);
      else if (validateStep(2)) showStep(2);
      else showStep(3);
      return;
    }
    if (!validateForm(form)) {
      return;
    }

    var payload = buildSubmissionPayload(form);

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
        document.getElementById("apply-card").hidden = true;
        document.getElementById("form-not-connected").hidden = true;
        document.getElementById("form-required-note").hidden = true;
        document.getElementById("form-intro").hidden = true;
        document.getElementById("stepper").hidden = true;
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

    document.getElementById("locations-list").addEventListener("click", function (event) {
      var applyBtn = event.target.closest("[data-apply-store]");
      if (applyBtn) {
        applyAtStore(applyBtn.getAttribute("data-apply-store"));
        return;
      }
      var button = event.target.closest(".store-toggle");
      if (!button || !document.getElementById("locations-list").contains(button)) return;
      var expanded = button.getAttribute("aria-expanded") === "true";
      toggleStore(button, !expanded);
    });

    document.getElementById("phone").addEventListener("input", function () {
      if (this.value.trim()) showFieldError("phone", !PHONE_RE.test(this.value));
    });
    document.getElementById("email").addEventListener("input", function () {
      if (this.value.trim()) showFieldError("email", !EMAIL_RE.test(this.value));
    });
    document.getElementById("store").addEventListener("change", function () {
      showFieldError("store", !findStoreByName(this.value));
      if (findStoreByName(this.value)) setStepError("");
    });
    document.getElementById("rank-options").addEventListener("change", function () {
      if (selectedRank()) {
        showRankError(false);
        setStepError("");
      }
    });
    document.getElementById("shift-options").addEventListener("change", function () {
      if (selectedShifts().length) {
        showShiftsError(false);
        setStepError("");
      }
    });

    document.getElementById("form-continue").addEventListener("click", function () {
      tryContinue();
    });
    document.getElementById("form-back").addEventListener("click", function () {
      showStep(currentStep - 1);
    });
    document.getElementById("stepper").addEventListener("click", function (event) {
      var btn = event.target.closest("button[data-step]");
      if (!btn) return;
      var step = parseInt(btn.getAttribute("data-step"), 10);
      if (step < currentStep) showStep(step);
    });

    document.getElementById("interest-form").addEventListener("submit", handleSubmit);
    document.getElementById("interest-form").addEventListener("keydown", function (event) {
      if (event.key !== "Enter") return;
      if (event.target && event.target.tagName === "TEXTAREA") return;
      event.preventDefault();
      if (currentStep < STEP_COUNT - 1) tryContinue();
      else document.getElementById("interest-form").requestSubmit();
    });

    var thankYou = document.getElementById("thank-you");
    thankYou.setAttribute("tabindex", "-1");
  });
})();
