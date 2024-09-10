var _a;
(_a = document.getElementById("form")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", function (event) {
    var _a;
    event.preventDefault();
    var profileInput = document.getElementById('pro');
    var nameElement = document.getElementById("first-name");
    var nameElementsec = document.getElementById("last-name");
    var emailElement = document.getElementById("em");
    var phoneElement = document.getElementById("ph");
    var eduElement = document.getElementById("edu");
    var expElement = document.getElementById("experience");
    var skillElement = document.getElementById("skills");
    var userEl = document.getElementById("username");
    if (profileInput && nameElement && nameElementsec && emailElement && phoneElement && eduElement && expElement && skillElement && userEl) {
        var name_1 = nameElement.value;
        var namesec = nameElementsec.value;
        var em = emailElement.value;
        var ph = phoneElement.value;
        var edu = eduElement.value;
        var experience = expElement.value;
        var skills = skillElement.value;
        var useName = userEl.value;
        var unq_1 = "resume/".concat(useName.replace(/\s+/g, '_'), "_cv.html");
        // Handle profile picture
        var proFl = (_a = profileInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var proURL = proFl ? URL.createObjectURL(proFl) : "";
        // Corrected template for image
        var output = "\n      <h2>Resume</h2>\n      ".concat(proURL ? "<img src=\"".concat(proURL, "\" alt=\"profile\" class=\"profile\">") : '', "\n      <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\"> ").concat(name_1, " ").concat(namesec, "</span></p>\n      <p><strong>Email:</strong><span id=\"edit-email\" class=\"editable\"> ").concat(em, "</span></p>\n      <p><strong>Phone:</strong><span id=\"edit-phone\" class=\"editable\"> ").concat(ph, "</span></p>\n\n      <h3>Education</h3>\n      <p id=\"edit-edu\" class=\"editable\">").concat(edu, "</p>\n\n      <h3>Experience</h3>\n      <p id=\"edit-exp\" class=\"editable\">").concat(experience, "</p>\n\n      <h3>Skills</h3>\n      <p id=\"edit-skill\" class=\"editable\">").concat(skills, "</p>\n    ");
        var elres = document.getElementById("output");
        if (elres) {
            elres.innerHTML = output;
            var buttonContainer = document.getElementById("button-container");
            if (buttonContainer) {
                buttonContainer.innerHTML = '';
                var downloadPdfBtn = document.createElement('button');
                downloadPdfBtn.textContent = 'Download Resume';
                downloadPdfBtn.addEventListener('click', function () { return downloadResumeAsPDF(); });
                var shareLinkBtn = document.createElement('button');
                shareLinkBtn.textContent = 'Share Resume';
                shareLinkBtn.addEventListener('click', function () {
                    var shareableUrl = window.location.origin + '/' + unq_1;
                    navigator.clipboard.writeText(shareableUrl).then(function () {
                        alert('Resume link copied to clipboard!');
                    });
                });
                buttonContainer.appendChild(downloadPdfBtn);
                buttonContainer.appendChild(shareLinkBtn);
                makeEdit();
            }
        }
    }
    else {
        console.error("One or more element outputs are missing");
    }
});
function makeEdit() {
    var editElmt = document.querySelectorAll('.editable');
    editElmt.forEach(function (elm) {
        elm.addEventListener('click', function () {
            var _a;
            var currentEl = elm;
            var currentValue = currentEl.textContent || "";
            if (currentEl.tagName === "P" || currentEl.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing', 'input');
                input_1.addEventListener('blur', function () {
                    currentEl.textContent = input_1.value;
                    currentEl.style.display = 'inline';
                    input_1.remove();
                });
                currentEl.style.display = 'none';
                (_a = currentEl.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentEl);
                input_1.focus();
            }
        });
    });
}
function downloadResumeAsPDF() {
    var resumeElement = document.getElementById("output");
    var options = {
        margin: 1,
        filename: 'Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    if (resumeElement) {
        // Ensure html2pdf is included
        window.html2pdf().from(resumeElement).set(options).save();
    }
    else {
        console.error('Resume content is missing.');
    }
}
