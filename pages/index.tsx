import Head from "next/head";
import type { NextPage } from "next";

import styles from "../styles/Home.module.css";
import dynamic from "next/dynamic";

const Tables = dynamic(() => import('../components/tables'))

const Home: NextPage = () => {
 
  return (
    <div className={styles.container}>
      <Head>
        <title>Writers</title>
        <meta name="description" content="Writers Demo App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Tables />
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
};

export default Home;
