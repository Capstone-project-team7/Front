import React, { useState } from "react";
import styles from "./TutorialPage.module.scss";

export default function TutorialPage() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={styles.tutorialpage}>
      <span>tutorialpage</span>
    </div>
  );
}
