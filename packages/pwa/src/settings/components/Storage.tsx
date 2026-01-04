"use client";

import { DEFAULT_CLASSES, MESSAGES } from "../constants";
import { confirmAction, clearAllStorage, reloadPage } from "../utils";
import type { StorageProps } from "../types";

export function Storage({
  className = "",
  titleClassName = "",
  descriptionClassName = "",
  buttonClassName = "",
  renderButton,
  onClearCookies,
}: StorageProps) {
  const clearStorage = async () => {
    if (confirmAction(MESSAGES.storage.confirm)) {
      await clearAllStorage(onClearCookies);
      reloadPage();
    }
  };

  const defaultButton = (
    <button
      onClick={clearStorage}
      className={buttonClassName || DEFAULT_CLASSES.button.danger}
    >
      {MESSAGES.storage.button}
    </button>
  );

  return (
    <div className={className || DEFAULT_CLASSES.container}>
      <h3 className={titleClassName || DEFAULT_CLASSES.title}>
        {MESSAGES.storage.title}
      </h3>
      <p className={descriptionClassName || DEFAULT_CLASSES.description}>
        {MESSAGES.storage.description}
      </p>
      {renderButton ? renderButton({ clearStorage }) : defaultButton}
    </div>
  );
}

