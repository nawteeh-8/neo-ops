# Neo Ops Website

This repository contains the static files for the Neo Ops demo site. Each service page includes a simple lead form. Submitting these forms now routes the user to the main contact page and passes along the originating service.

## Form Flow

- Every service form has an `action` pointing to `fabs/contact.html`.
- A hidden `service` field indicates which page the user came from.
- `contact.html` reads this query parameter and pre-selects the corresponding option in the "interest" drop‑down.

This makes it clear to the sales team which service the visitor was viewing before opening the contact form.
