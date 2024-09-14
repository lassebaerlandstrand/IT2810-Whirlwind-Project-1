import styles from './InfoDisplay.module.css';

interface InfoDisplayProps {
  icon: React.ReactNode;
  infoText: string;
  amount: number | undefined;
  unit: string;
  rotation: number | undefined;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({ icon, infoText, amount, unit, rotation }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div
          className={styles.iconContainer}
          style={{
            transform: `rotate(${rotation !== undefined ? rotation : 0}deg)`,
            transition: 'transform 2s',
          }}
        >
          {icon}
        </div>
        <h3 className={styles.title}>{infoText}</h3>
      </div>
      <div className={styles.infoContainer}>
        <p className={styles.infoText}>{amount !== undefined ? amount.toString() : '--.-'}</p>
        <p className={styles.infoUnit}>{unit}</p>
      </div>
    </div>
  );
};

export default InfoDisplay;
//{data.cloud_area_fraction > 0.5 ? <IconCloudFilled /> : <IconSunFilled />}
//className={styles.card}
