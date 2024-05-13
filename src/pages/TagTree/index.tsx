import { Button } from 'antd';
import TagNode from './components/TagNode/TagNode';
import { NODE_TYPE } from './enums';
import { useTagList } from './hooks/useTagList';
import './index.less';

const TagTree = () => {
  const { tagTree, add, update, remove } = useTagList();

  const renderTagTree = (values: any) => {
    return values.map((tag: any) => {
      return (
        <TagNode 
          nodeType={tag.name as NODE_TYPE}
          key={tag.id}
          item={tag}
          add={add}
        >
          {tag.children && renderTagTree(tag.children)}
        </TagNode>
      );
    });
  };

  return <div className='tag_content'>
    <Button
      onClick={() => {
        add({
          name: 'ROOT'
        });
      }}
    >
      添加根节点
    </Button>
    {renderTagTree(tagTree)}
  </div>;
};

export default TagTree;
