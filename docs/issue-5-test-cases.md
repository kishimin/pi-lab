# Issue #5: π receipt test cases

| Case | User behavior | Expected result | Level |
| --- | --- | --- | --- |
| Multiple items | Add products with names and whole-yen prices | Both items and the correct subtotal appear | Acceptance |
| Invalid entry | Submit an empty name or an invalid price | The relevant error is visible and no receipt is created | Component |
| Receipt | Create a receipt from valid items | Item details, subtotal, fictional tax, total, and π points appear | Acceptance |
| Rounding | Create a receipt with a total that produces fractional points | π points are rounded down at 3.14% of the total | Unit |
| Regeneration | Create the receipt again | A receipt is displayed again for the entered items | Acceptance |
| Download | Save the generated receipt | A PNG image is downloaded | Acceptance |
| Share | Share on a supported device | The image is offered to the system share sheet | Component |
| No sharing support | Open the result without image sharing support | The save action remains usable | Acceptance |
