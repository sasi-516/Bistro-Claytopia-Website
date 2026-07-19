/**
 * Bistro Claytopia — Google Apps Script Web App
 *
 * Full setup guide: see SETUP.md in this folder.
 */

const OWNER_EMAIL = "owner@bistroclaytopia.com"; // ← change to your Gmail / business email
const BOOKINGS_SHEET = "Bookings";
const ORDERS_SHEET = "Orders";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    let result;

    if (data.type === "booking") {
      result = handleBooking_(data);
    } else if (data.type === "order") {
      result = handleOrder_(data);
    } else {
      result = { success: false, message: "Unknown type" };
    }

    return jsonOutput_(result);
  } catch (err) {
    return jsonOutput_({ success: false, message: String(err) });
  }
}

function doGet() {
  return jsonOutput_({ ok: true, service: "Bistro Claytopia submissions" });
}

function jsonOutput_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function handleBooking_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(BOOKINGS_SHEET) || ss.insertSheet(BOOKINGS_SHEET);
  ensureBookingHeaders_(sheet);

  const bookingId = nextBookingId_(sheet);
  const timestamp = new Date();

  sheet.appendRow([
    timestamp,
    bookingId,
    data.name || "",
    data.phone || "",
    data.email || "",
    data.date || "",
    data.time || "",
    data.guests || "",
    data.occasion || "",
    data.experience || "",
    data.notes || "",
    "Pending",
  ]);

  if (data.email) {
    MailApp.sendEmail({
      to: data.email,
      subject: "Booking Request Received – Bistro Claytopia",
      body: buildCustomerBookingEmail_(data, bookingId),
    });
  }

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "New Table Booking – " + bookingId,
    body: buildOwnerBookingEmail_(data, bookingId),
  });

  return { success: true, bookingId: bookingId };
}

function handleOrder_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(ORDERS_SHEET) || ss.insertSheet(ORDERS_SHEET);
  ensureOrderHeaders_(sheet);

  const orderRef = data.orderRef || nextOrderRef_();
  const timestamp = new Date();

  sheet.appendRow([
    timestamp,
    orderRef,
    data.customerName || "",
    data.customerPhone || "",
    data.customerEmail || "",
    data.itemsSummary || "",
    data.subtotal || 0,
    "Pending",
  ]);

  MailApp.sendEmail({
    to: OWNER_EMAIL,
    subject: "New Café Order – " + orderRef,
    body: buildOwnerOrderEmail_(data, orderRef),
  });

  return { success: true, orderRef: orderRef };
}

function nextBookingId_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return "BC0001";
  const ids = sheet.getRange(2, 2, lastRow - 1, 1).getValues().flat();
  let max = 0;
  ids.forEach(function (id) {
    const m = String(id).match(/BC(\d+)/i);
    if (m) max = Math.max(max, parseInt(m[1], 10));
  });
  return "BC" + String(max + 1).padStart(4, "0");
}

function nextOrderRef_() {
  return "OR" + String(Math.floor(Math.random() * 9000) + 1000);
}

function ensureBookingHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Timestamp",
    "Booking ID",
    "Name",
    "Phone",
    "Email",
    "Date",
    "Time",
    "Guests",
    "Occasion",
    "Experience",
    "Special Request",
    "Status",
  ]);
}

function ensureOrderHeaders_(sheet) {
  if (sheet.getLastRow() > 0) return;
  sheet.appendRow([
    "Timestamp",
    "Order Ref",
    "Customer Name",
    "Phone",
    "Email",
    "Items",
    "Subtotal",
    "Status",
  ]);
}

function buildCustomerBookingEmail_(data, bookingId) {
  return (
    "Hi " +
    (data.name || "there") +
    ",\n\n" +
    "Thank you for booking with Bistro Claytopia.\n\n" +
    "We have received your reservation request.\n\n" +
    "Booking ID : " +
    bookingId +
    "\n" +
    "Date     : " +
    (data.date || "") +
    "\n" +
    "Time     : " +
    (data.time || "") +
    "\n" +
    "Guests   : " +
    (data.guests || "") +
    "\n" +
    "Occasion : " +
    (data.occasion || "") +
    "\n\n" +
    "Our team will contact you shortly to confirm your reservation.\n\n" +
    "Regards,\nBistro Claytopia"
  );
}

function buildOwnerBookingEmail_(data, bookingId) {
  return (
    "New Booking Received\n\n" +
    "Booking ID : " +
    bookingId +
    "\n" +
    "Customer : " +
    (data.name || "") +
    "\n" +
    "Phone    : " +
    (data.phone || "") +
    "\n" +
    "Email    : " +
    (data.email || "") +
    "\n" +
    "Date     : " +
    (data.date || "") +
    "\n" +
    "Time     : " +
    (data.time || "") +
    "\n" +
    "Guests   : " +
    (data.guests || "") +
    "\n" +
    "Occasion : " +
    (data.occasion || "") +
    "\n" +
    "Experience: " +
    (data.experience || "") +
    "\n" +
    "Special Request: " +
    (data.notes || "")
  );
}

function buildOwnerOrderEmail_(data, orderRef) {
  return (
    "New Order Received\n\n" +
    "Order Ref : " +
    orderRef +
    "\n" +
    "Customer  : " +
    (data.customerName || "") +
    "\n" +
    "Phone     : " +
    (data.customerPhone || "") +
    "\n" +
    "Email     : " +
    (data.customerEmail || "") +
    "\n\n" +
    (data.itemsSummary || "") +
    "\n\n" +
    "Subtotal  : ₹" +
    (data.subtotal || 0) +
    "\n" +
    "(GST will be added when the customer pays at the counter)\n\n" +
    "Payment: Pay at counter"
  );
}
