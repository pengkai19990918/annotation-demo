import { Segmented } from 'antd';
import _ from 'lodash';
import { TOOL_TYPE_ARR, ToolName } from '../tools';
import { Context } from './../context';

import React, { useContext } from 'react';

const Toolbar: React.FC<any> = () => {
  const options = _.map(TOOL_TYPE_ARR, (toolType) => {
    return {
      value: toolType.code,
      label: toolType.name,
    };
  });

  const value = useContext(Context);
  const [state, dispatch] = value;

  const handleToolChange = (value: ToolName) => {
    dispatch({
      type: 'setTool',
      tool: value,
    });
  };

  return (
    <div>
      <Segmented
        value={state.tool}
        options={options}
        onChange={handleToolChange}
      />
    </div>
  );
};

export default Toolbar;
