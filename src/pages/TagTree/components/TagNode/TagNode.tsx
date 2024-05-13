import { Button } from 'antd';
import classNames from 'classnames';
import { NODE_TYPE } from '../../enums';
import './index.less';

interface TagNodeProps {
  nodeType: NODE_TYPE;
  item: any;
  add?: (values: any) => void;
  children?: React.ReactNode;
}

/**
 * @description TagNode component 标签树的基本节点
 * 基本节点包括 根节点 ROOT、叶子节点LEAF、中间节点MIDDLE
 * @returns {JSX.Element}
 */

const TagNode: React.FC<TagNodeProps> = (props) => {
  const { nodeType, add, item, children } = props;

  return (
    <div
      id={item.id}
      className="tagNode"
      draggable
      onDrag={(e) => {
        e.currentTarget.style.border = "dashed";
        e.dataTransfer.setData("text", e.target.id);
      }}
    >
      <div className={classNames('selfNode')}>
        <Button
          onClick={() => {
            add?.({
              parentId: item.id,
              name: nodeType,
            });
          }}
        >
          {nodeType}
        </Button>
      </div>
      {children && <div className="childNode">{children}</div>}
    </div>
  );
};

export default TagNode;
