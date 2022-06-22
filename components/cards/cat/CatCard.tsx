import styles from './CatCard.module.css';

export interface ICatCard{
    sampleTextProp: String
};

const CatCard:React.FC<ICatCard> = ({sampleTextProp}) => {
    return <div className={styles.component}>{sampleTextProp}</div>
}

export default CatCard