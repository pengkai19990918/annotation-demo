import _ from "lodash";
import { useCallback, useMemo, useState } from "react"
import { v4 as uuidv4 } from 'uuid';

export function useTagList() {

  const [tagList, setTagList] = useState<any[]>([]);

  const add = (tag: any) => {

    const newTag = {
      ...tag,
      id: uuidv4()
    }

    setTagList([...tagList, newTag]);
  }

  const update = useCallback((key) => {
    
  }, []);

  const remove = useCallback((key) => {

  }, []);

  const tagTree = useMemo(() => {
    const map = new Map();

    const cloneDeepTagList = _.cloneDeep(tagList);

    cloneDeepTagList.forEach(tag => {
      map.set(tag.id, tag);
    });

    cloneDeepTagList.forEach(tag => {
      if (tag.parentId) {
        const parent = map.get(tag.parentId);
        if (parent) {
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(tag);
        }
      }
    });    
    
    return cloneDeepTagList.filter(tag => !tag.parentId);
  }, [tagList])

  return {
    tagTree,
    add,
    update,
    remove
  }
}