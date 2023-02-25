import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import { isEmpty } from "lodash";
import styles from "./coffee-store.module.scss";
import Image from "next/image";
import cls from "classnames";
import { getListCoffee } from "../../service/coffee-store";
import { StoreContext } from "../../store/store-context";
import useSWR from "swr";

const DetailCoffeeStore = ({ coffeeStore }) => {
  const router = useRouter();
  const id = router.query.id;

  const {
    dispatch,
    state: { coffeeStores },
  } = useContext(StoreContext);
  const [coffeeStoreDetail, setCoffeeStoreDetail] = useState(coffeeStore || {});
  const [voting, setVoting] = useState(0);
  const { name, address, region, imgUrl = "", upvote } = coffeeStoreDetail;
  const { data, error } = useSWR(
    `/api/get-coffee-store-by-id?id=${id}`,
    (url) => fetch(url).then((res) => res.json())
  );
  const handleUpvote = async () => {
    try {
      const response = await fetch("/api/update-coffee-store", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
        }),
      });
      const dbCoffeeStore = await response.json();
      if (dbCoffeeStore.record) {
        const count = voting + 1;
        setVoting(count);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setCoffeeStoreDetail(data[0]);
      setVoting(data[0].upvote || 0);
    }
  }, [data]);

  useEffect(() => {
    if (isEmpty(coffeeStore)) {
      if (coffeeStores.length > 0) {
        const findCoffeeStoreFromContext = coffeeStores.find(
          (coffeeStore) => coffeeStore.id.toString() === id
        );
        handleCreateCoffeeStore(findCoffeeStoreFromContext);
        setCoffeeStoreDetail(findCoffeeStoreFromContext);
      }
    } else {
      // SSG
      handleCreateCoffeeStore(coffeeStore);
    }
  }, [id, coffeeStores, coffeeStore]);

  if (router?.isFallback) {
    return <div>loading....</div>;
  }
  if (error) {
    return <div>Some thing err {error}</div>;
  }

  return (
    <div className={styles.layout}>
      <Head>{name}</Head>

      {!isEmpty(coffeeStoreDetail) && (
        <div className={styles.container}>
          <div className={styles.col1}>
            <div className={styles.backToHomeLink}>
              <Link href="/">← Back to home</Link>
            </div>
            <div className={styles.nameWrapper}>
              <p className={styles.name}>{name}</p>
            </div>
            <Image
              src={
                imgUrl ||
                "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
              }
              width="600"
              height="400"
              className={styles.storeImg}
              alt={name}
            ></Image>
          </div>
          <div className={cls("glass", styles.col2)}>
            {address && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/asset/icons/nearMe.svg"
                  width="24"
                  height="24"
                  className={styles.icon}
                  alt={name}
                />
                <p className={styles.storeDes}>{address}</p>
              </div>
            )}
            {region && (
              <div className={styles.iconWrapper}>
                <Image
                  src="/asset/icons/location.svg"
                  width="24"
                  height="24"
                  className={styles.icon}
                  alt={name}
                />
                <p className={styles.storeDes}>{region}</p>
              </div>
            )}

            <div className={styles.iconWrapper}>
              <Image
                src="/asset/icons/star.svg"
                width="24"
                height="24"
                className={styles.icon}
                alt={name}
              />

              <p className={styles.storeDes}>{voting}</p>
            </div>

            <button className={styles.upvoteButton} onClick={handleUpvote}>
              Upvote
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const handleCreateCoffeeStore = async (coffeeStore) => {
  try {
    const { id, name, address, region, imgUrl, upvote } = coffeeStore;
    const response = await fetch("/api/create-coffee-store", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        name: name || "",
        address: address || "",
        region: region || "",
        imgUrl: imgUrl || "",
        upvote: upvote || 0,
      }),
    });
    const dbCoffeeStore = await response.json();
  } catch (error) {}
};

export async function getStaticProps({ params }) {
  const coffeeStoresData = await getListCoffee();
  const findCoffeeStoreById = coffeeStoresData.find(
    (coffeeStore) => coffeeStore.id.toString() === params?.id.toString()
  );
  return {
    props: {
      coffeeStore: findCoffeeStoreById ? findCoffeeStoreById : {},
    },
  };
}

export async function getStaticPaths() {
  const coffeeStoresData = await getListCoffee();
  const paths = coffeeStoresData.map((coffeeStore) => ({
    params: { id: coffeeStore.id.toString() },
  }));
  return {
    paths,
    fallback: true,
  };
}

DetailCoffeeStore.propTypes = {};

export default DetailCoffeeStore;
