import Image from "next/image";
import styles from './loader.module.css';

const Loader = ({width, height}) => {
    return <Image 
        src="/the-avengers.svg"
        alt="loading.."
        height={height}
        width={width}
        className={styles.spinner}
     />
}

export default Loader;