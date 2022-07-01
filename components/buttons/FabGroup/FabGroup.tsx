import styles from './FabGroup.module.scss';

export interface IFabGroup {
  sampleTextProp: String;
}

const FabGroup: React.FC<IFabGroup> = ({ sampleTextProp }) => {
  return <div className={styles.component}>{sampleTextProp}</div>;
};

export default FabGroup;
