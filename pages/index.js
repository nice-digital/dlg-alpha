import Head from 'next/head'

import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>DLG Alpha</title>
        <meta name="description" content="Prototype front end build for Digital Living Guidelines" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className={styles.title}>
          Welcome to DLG
        </h1>
      </main>
    </div>
  )
}
