import classNames from 'classnames';

import styles from './InfoCard.module.scss';

interface InfoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string;
}

export function InfoCard({ title, value, ...rest }: InfoCardProps) {
  return (
    <div className={classNames(styles['info-card'], rest.className)}>
      <div className={styles['title']}>{title}</div>
      <div className={styles['value']}>{value}</div>
    </div>
  );
}
