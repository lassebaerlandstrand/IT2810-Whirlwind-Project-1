import styles from './InfoDisplay.module.css';

interface InfoDisplayItemProps {
  icon: React.ReactNode;
  infoText: string;
  amount: number | undefined;
  unit: string;
  rotation: number | undefined;
}

export const InfoDisplayItem = ({ icon, infoText, amount, unit, rotation }: InfoDisplayItemProps) => {
  return (
    <article className={styles.container}>
      <header className={styles.titleContainer}>
        <figure
          className={styles.iconContainer}
          style={{
            transform: `rotate(${rotation !== undefined ? rotation : 0}deg)`,
            transition: 'transform 2s',
          }}
        >
          {icon}
        </figure>
        <h3 className={styles.title}>{infoText}</h3>
      </header>
      <section className={styles.infoContainer}>
        <p className={styles.infoText}>{amount !== undefined ? amount.toString() : '--.-'}</p>
        <p className={styles.infoUnit}>{unit}</p>
      </section>
    </article>
  );
};

interface InfoDisplayProps {
  infos: InfoDisplayItemProps[];
}

const InfoDisplay = ({ infos }: InfoDisplayProps) => {
  return (
    <ul className={styles.weatherDetailsContainer}>
      {infos.map((item, index) => (
        <li key={index} className={styles.listItemContainer}>
          <InfoDisplayItem
            icon={item.icon}
            infoText={item.infoText}
            amount={item.amount}
            unit={item.unit}
            rotation={item.rotation}
          />
        </li>
      ))}
    </ul>
  );
};

export default InfoDisplay;
