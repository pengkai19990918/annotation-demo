import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';
import { Access, useAccess } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';

const AccessPage: React.FC = () => {
  const access = useAccess();

  const inputCanvasRef = useRef<any>();
  const outputCanvasRef = useRef<any>();


  useEffect(() => {

  }, []);

  return (
    <PageContainer
      ghost
      header={{
        title: '权限示例',
      }}
    >
      <Access accessible={access.canSeeAdmin}>
        <Button>只有 Admin 可以看到这个按钮</Button>
      </Access>
      <canvas ref={inputCanvasRef} />
      <canvas ref={outputCanvasRef} />
    </PageContainer>
  );
};

export default AccessPage;
