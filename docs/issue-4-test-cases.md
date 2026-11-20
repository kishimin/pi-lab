# Issue #4 Test Cases

| ID | Scenario | Expected result | Level | Status |
| --- | --- | --- | --- | --- |
| 1 | Copy a result link and open it in another browser | The recipient sees the analysis and the same result, then can retry | Acceptance | Existing locked AT |
| 2 | Share a result after entering a message | The shared URL does not include the entered text | Acceptance | Existing locked AT, representative input |
| 3 | Web Share is unavailable | The result link can still be copied | Browser | Follow-up #16 |
| 4 | Clipboard API fails | The displayed result link can be selected for manual copying | Browser | Follow-up #16 |
| 5 | A shared URL contains an invalid result | The invalid value is not treated as a result | Unit | Existing test |
| 6 | Sharing is cancelled | The copy action remains available | Component | Existing test |

