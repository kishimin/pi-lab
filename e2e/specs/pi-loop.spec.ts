import { expect, test } from "../fixtures/test";

test.describe("割り切れない研究所", async () => {
  test("割り切れない研究所の一覧画面が表示される", async ({
    piLoopPage,
  }) => {
    await expect(piLoopPage.getListItemLink(/πで伝える/)).toBeVisible();
  });

  test("πで伝えるのリンクをクリックするとπで伝える画面に遷移する", async ({
    page,
    piLoopPage,
    piMessagePage,
  }) => {
    await piLoopPage.gotoListItem(/πで伝える/);

    await expect(page).toHaveURL("/pi-message");

    await expect(piMessagePage.getPageTitle).toBeVisible();
  });
});
