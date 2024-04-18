import PointCloudCanvas from '@/components/PointCloudCanvas';
import styles from './index.less';


const PointCloud = () => {
  return (
    <div className={styles.container}>
      <PointCloudCanvas />
    </div>
  )
}

export default PointCloud;