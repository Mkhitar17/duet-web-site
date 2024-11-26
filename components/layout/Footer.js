import styles from "./layout.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} My Next.js App. All rights reserved.</p>
    </footer>
  );
}