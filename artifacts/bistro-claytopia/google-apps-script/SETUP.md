# Google Sheets + Apps Script setup (Bistro Claytopia)

This connects **Book a Table** and **Place Order** on the website to a Google Sheet and email notifications.

---

## What Google account to use

Use the **café owner’s Gmail** (or a dedicated business Google account), for example:

- `bistroclaytopia@gmail.com`, or  
- your personal Gmail if you manage the café

**Important:** The same Google account must own:

1. The Google Sheet (database)  
2. The Apps Script project (backend)  
3. The email address that receives owner notifications (`OWNER_EMAIL` in `Code.gs`)

You do **not** need a separate “Google ID” product. A normal **free Gmail / Google account** is enough.

---

## Step 1 — Create the Google Sheet

1. Go to [https://sheets.google.com](https://sheets.google.com) and sign in with the owner account.  
2. Click **Blank spreadsheet**.  
3. Rename it (top left), e.g. **Bistro Claytopia — Bookings & Orders**.  
4. Rename the first tab to **Bookings**.  
5. Click **+** at the bottom to add a second tab named **Orders**.

### Bookings tab — row 1 headers

| A | B | C | D | E | F | G | H | I | J | K | L |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Timestamp | Booking ID | Name | Phone | Email | Date | Time | Guests | Occasion | Experience | Special Request | Status |

### Orders tab — row 1 headers

| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| Timestamp | Order Ref | Customer Name | Phone | Email | Items | Subtotal | Status |

> If you leave row 1 empty, the script will create these headers automatically on the first submission.

---

## Step 2 — Add the Apps Script

1. In the spreadsheet: **Extensions → Apps Script**.  
2. Delete any default code in `Code.gs`.  
3. Copy the full contents of `Code.gs` from this folder into the editor.  
4. Change line 7:

   ```javascript
   const OWNER_EMAIL = "your-email@gmail.com";
   ```

   Use the email where you want booking and order alerts.

5. Click **Save** (disk icon). Name the project e.g. **Bistro Claytopia API**.

---

## Step 3 — Authorize the script (first time only)

1. In Apps Script, select `doGet` in the function dropdown and click **Run**.  
2. Google will ask for permissions → **Review permissions** → choose your account → **Advanced** → **Go to Bistro Claytopia API (unsafe)** → **Allow**.  
3. This grants access to: Spreadsheet (read/write), Gmail send (for notifications).

---

## Step 4 — Deploy as Web App

1. **Deploy → New deployment**.  
2. Click the gear icon → **Web app**.  
3. Settings:
   - **Description:** Bistro Claytopia submissions  
   - **Execute as:** Me  
   - **Who has access:** Anyone  
4. Click **Deploy**.  
5. Copy the **Web app URL** (ends with `/exec`).  
   Example: `https://script.google.com/macros/s/AKfycb.../exec`

> After you change `Code.gs`, use **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy** so the live URL picks up changes.

---

## Step 5 — Connect the website

1. In `artifacts/bistro-claytopia/`, copy `.env.example` to `.env` (if you don’t have one yet).  
2. Paste your Web App URL:

   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ID/exec
   ```

3. Restart the dev server (`npm run dev` from repo root or `artifacts/bistro-claytopia`).

---

## Step 6 — Test

### Quick API check

Open the Web App URL in a browser. You should see:

```json
{"ok":true,"service":"Bistro Claytopia submissions"}
```

### Book a Table

1. On the site, submit a test booking.  
2. Check the **Bookings** sheet for a new row.  
3. Customer gets a confirmation email (if email was entered).  
4. Owner gets a “New Table Booking” email.

### Place Order

1. Add items → **Place Order · Pay at Counter**.  
2. Enter **name, phone, and email** (all required).  
3. Check the **Orders** sheet and owner email.  
4. GST is **not** calculated on the website — only subtotal is stored; GST is added at the counter.

---

## Troubleshooting

| Problem | Fix |
|--------|-----|
| Sheet stays empty | Confirm `.env` URL is correct; restart dev server; redeploy script as new version |
| “Could not reach server” | Web app must be **Anyone** access; URL must end with `/exec` |
| No emails | Check spam; confirm `OWNER_EMAIL`; re-run script to re-authorize Gmail |
| CORS / fetch errors in browser | Normal for some setups — script still receives POST; check Sheet |
| Old Orders sheet has CGST columns | Create a fresh **Orders** tab with the new headers above, or add an **Email** column manually |

---

## What customers see

- **Orders:** Subtotal only + note: *“GST will be added when you pay the bill at the counter.”*  
- **Checkout:** Required name, phone, email before confirming.  
- **Payment:** Pay at counter only (online payment disabled).

---

## Security note

The Web App URL is public (anyone can POST). For a small café site this is usually fine. For stricter control later, add a shared secret in the script and `.env`.
