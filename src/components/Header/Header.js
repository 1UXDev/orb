import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./Header.module.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Header() {
  const router = useRouter();
  const currentSite = router.pathname;

  return (
    <header className={`${styles.navbar}`}>
      <div className={`${styles.logo}`}>⊚ ORB</div>
      <nav className={`${styles.navbarWrapper}`}>
        <ul className={`${inter.className}`}>
          <li className={currentSite === "/" ? `${styles.liActive}` : null}>
            <Link href="/" alt="Link to Home">
              Overview
            </Link>
          </li>
          <li
            className={currentSite === "/learn" ? `${styles.liActive}` : null}
          >
            <Link href="/learn" alt="Link to Learn">
              Learn
            </Link>
          </li>
          <li
            className={currentSite === "/train" ? `${styles.liActive}` : null}
          >
            <Link href="/train" alt="Link to Train">
              Train
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`${styles.usersArea}`}>
        <div className={`${styles.notifications}`}>🔔</div>
        <div className={`${styles.user}`}>💁‍♀️</div>
        <div className={`${styles.settings}`}>⚙️</div>
      </div>
    </header>
  );
}
