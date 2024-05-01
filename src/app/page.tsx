import styles from "./page.module.css";
import AvatarRender from "@/component/AvatarRender";

export default function Home() {
  return (
    <main className={styles.main}>
      <AvatarRender />
    </main>
  );
}
