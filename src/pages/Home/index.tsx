import { Paper } from '@/components/Paper/Paper';
import { useModel } from '@umijs/max';
import styles from './index.less';

const HomePage: React.FC = () => {
  const {} = useModel('global');

  return (
    <div className={styles.container}>
      <Paper
        image={{
          id: '',
          url: 'http://image.izaiqi.com:4003/images/2023/0719/%E5%9B%BE%E7%89%87%E6%95%88%E7%8E%87%E6%B5%8B%E8%AF%95/HT_TRAIN_004053_SH_000.jpg',
          width: 400,
          height: 400,
          routes: [],
        }}
      />
    </div>
  );
};

export default HomePage;
