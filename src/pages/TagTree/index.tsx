import TagNode from "./components/TagNode/TagNode";
import { NODE_TYPE } from "./enums";
import { tags } from "./mock";


const TagTree = () => {

  const tagJson = tags;

  const renderTagTree = (tagJson: any) => {
    return tagJson.map((tag: any) => {
      return (
        <TagNode nodeType={tag.name as NODE_TYPE} key={tag.id}>
          {tag.children && renderTagTree(tag.children)}
        </TagNode>
      )
    })
  }

  return (
    <div>
      {renderTagTree(tagJson)}
    </div>
  )
}

export default TagTree;