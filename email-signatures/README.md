# HG Care email signatures

A tidy, on-brand HTML email signature: HG Care logo, contact details, and the
four ISO accreditation badges (9001, 14001, 27001, 45001).

The images are served from the HG Care website, so they load for everyone who
receives an email — no attachments, no broken-image boxes.

## Files

| File | What it is |
|------|------------|
| `dave-jones.html` | Ready-to-use signature for Dave Jones. Open it in a browser, copy, paste. |
| `signature-template.html` | Blank template with `{{PLACEHOLDERS}}` for adding other staff. |
| `_signature.partial.html` | Just the signature markup (no page wrapper) if you'd rather embed it. |

The images live in the website repo at `public/email-signature/` and are
published at:

- `https://www.hgcare.co.uk/email-signature/hgcare-logo.png`
- `https://www.hgcare.co.uk/email-signature/iso-9001.jpg`
- `https://www.hgcare.co.uk/email-signature/iso-14001.jpg`
- `https://www.hgcare.co.uk/email-signature/iso-27001.jpg`
- `https://www.hgcare.co.uk/email-signature/iso-45001.jpg`

> **Important:** the images only load once this branch is deployed to the live
> site. Deploy first, then the signature will display correctly for recipients.

## Add a new person (from the template)

1. Open `signature-template.html` and replace the placeholders:
   - `{{FULL_NAME}}` — e.g. `Dave Jones`
   - `{{JOB_TITLE}}` — e.g. `Compliance & Quality`
   - `{{PHONE}}` — the number to display, e.g. `0161 975 5999`
   - `{{PHONE_E164}}` — same number for the click-to-call link, international
     format with no spaces, e.g. `+441619755999`
   - `{{EMAIL}}` — e.g. `firstname@hgcare.co.uk`
2. Save as `firstname-lastname.html`.

## Install the signature

**Outlook (Windows/Mac desktop)**
1. Open `dave-jones.html` in a web browser.
2. Select the whole signature (Ctrl/Cmd+A), copy (Ctrl/Cmd+C).
3. Outlook → **Settings / Preferences → Mail → Signatures → New**.
4. Paste into the editing box, name it, and set it as the default for new
   emails and replies.

**Outlook on the web / Microsoft 365**
1. Open and copy the signature as above.
2. **Settings → Mail → Compose and reply → Email signature**.
3. Paste, then **Save**.

**Gmail**
1. Open and copy the signature as above.
2. **Settings (gear) → See all settings → General → Signature → Create new**.
3. Paste, then **Save changes** at the bottom.

**Apple Mail**
1. **Mail → Settings → Signatures**, create a new signature, and untick
   *"Always match my default message font"*.
2. Open `dave-jones.html` in Safari, copy the signature, and paste it over the
   placeholder text.

## Notes

- The logo PNG has a transparent background and is retina-sharp.
- The confidentiality line at the bottom is optional — delete that table row if
  you don't want it. Update the registered-company wording if needed.
- To change the badge size, edit the `height="50"` values in the accreditation
  row.
