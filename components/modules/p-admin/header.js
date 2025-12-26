import styles from "./header.module.css";
import { IoIosSearch, IoIosNotifications } from "react-icons/io";
import Image from "next/image";
import { getMe } from "@/utils/auth";
const Topbar = async () => {
    const me = await getMe()
    return (
        <div className={styles.topbar}>
            <div className={styles.profile}>
                {me.avatar ?
                    <Image
                        height={200}
                        width={200}
                        src={me.avatar}
                        alt="" /> : null}
                <div className="d-flex flex-row gap-1">
                    <p>{me.name}</p>
                    <span className="classic">{me.role}</span>
                </div>
            </div>
            <div>
                <div className={styles.searchBox}>
                    <input type="text" placeholder="Search" />
                    <div>
                        <IoIosSearch />
                    </div>
                </div>
                <div className={styles.notification}>
                    <IoIosNotifications />
                    <span>2</span>
                </div>
            </div>
        </div>
    );
};

export default Topbar;
