import styles from "./AuthModalFooter.module.css";

export function AuthModalFooter({
  showSuggestions = false,
  showTerms = false,
  showPrivacyPolicy = false,
}) {
  return (
    <div className={styles.modalFooter}>
      {showPrivacyPolicy ? (
        <>
          <a href="#help" className={styles.needHelpLink}>
            Need help?
          </a>
          <p className={styles.privacyPolicy}>
            When registering, you agree that we may use your provided data for
            the registration and to send you notifications on our products and
            services. You can unsubscribe from notifications at any time in your
            settings. For additional info please refer to our{" "}
            <a href="#privacy-policy" style={{ textDecoration: "none" }}>
              Privacy Policy
            </a>
            .
          </p>
        </>
      ) : null}
      {showSuggestions ? (
        <div className={styles.suggestions}>
          <p>Are you trying to sign in?</p>
          <p>The email address that you entered was not found.</p>
          <p>Double-check your email address.</p>
        </div>
      ) : null}
      {showTerms ? (
        <div className={styles.terms}>
          <p>
            By signing up I accept the <span>Terms of Use.</span> I have read
            and understood the <span>Privacy</span> Policy and{" "}
            <span>Cookies Policy</span>.
          </p>
        </div>
      ) : null}
    </div>
  );
}
