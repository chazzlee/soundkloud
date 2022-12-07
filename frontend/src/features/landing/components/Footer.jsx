import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        <a href="#directory">Directory</a>
        <a href="#about-us">About us</a>
        <a href="#artist-resources">Artist Resources</a>
        <a href="#blog">Blog</a>
        <a href="#jobs">Jobs</a>
        <a href="#developers">Developers</a>
        <a href="#help">Help</a>
        <a href="#legal">Legal</a>
        <a href="#privacy">Privacy</a>
        <a href="#cookie-policy">Cookie Policy</a>
        <a href="#cookie-manager">Cookie Manager</a>
        <a href="#imprint">Imprint</a>
        <a href="#charts  ">Charts</a>
      </div>
      <button className={styles.languageBtn}>
        Language: <span style={{ color: "#333" }}>English (US)</span>
      </button>
    </footer>
  );
}
