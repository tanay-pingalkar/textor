import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from "next/document";

class MyDocument extends Document {
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <title>Textor</title>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="icon" href="/logo.svg" type="image/svg"></link>
          <link
            href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;500&display=swap"
            rel="stylesheet"
          />
        </Head>
        <Main></Main>
        <NextScript></NextScript>
      </Html>
    );
  }
}

export default MyDocument;
