import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Image from "next/image";
import styles from "./card.module.scss";
import cls from "classnames";

const Card = ({ link, title, imageUrl, className }) => {
  return (
    <Link href={link} className={className}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{title}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={imageUrl}
              width={260}
              height={160}
              alt={title}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

Card.propTypes = {};

export default Card;
