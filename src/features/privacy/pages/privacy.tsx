import { Layout } from "../../../components/layout";

export const PrivacyPage = () => {
  return (
    <Layout title={"プライバシーポリシー"}>
      <main className={"mx-auto w-full max-w-3xl flex-1 space-y-8 px-6 py-10 leading-relaxed"}>
        <p>{"割り切れない研究所（以下「当サイト」）における利用者の情報の取り扱いについてご案内します。"}</p>
        <section className={"space-y-3"}>
          <h2 className={"text-xl font-bold"}>{"アクセス解析について"}</h2>
          <p>{"当サイトでは、利用状況の把握とサービスの改善のため、Google Analytics を利用しています。Google Analytics は Cookie 等を使用し、閲覧ページや利用状況などのデータを収集します。Google により IP アドレスなどの情報が処理される場合があります。"}</p>
          <p><a className={"underline"} href={"https://support.google.com/analytics/answer/6004245?hl=ja"}>{"Google Analytics によるデータの収集と利用について、Google の説明を詳しく見る"}</a></p>
          <p>{"Cookie はブラウザの設定で無効にできます。また、"}<a className={"underline"} href={"https://tools.google.com/dlpage/gaoptout?hl=ja"}>{"Google アナリティクス オプトアウト アドオン"}</a>{"を利用することもできます。"}</p>
        </section>
        <section className={"space-y-3"}>
          <h2 className={"text-xl font-bold"}>{"プライバシーポリシーの変更"}</h2>
          <p>{"情報の取り扱いやサービス内容の変更に合わせ、本ポリシーを見直すことがあります。変更後の内容はこのページに掲載します。"}</p>
        </section>
      </main>
    </Layout>
  );
};
