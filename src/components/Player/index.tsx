import { CaretLeftOutlined, CaretRightOutlined, LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { Flex, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { db } from './db';

import { PlayerContext } from '@/components/Player/context';
import { request } from '@umijs/max';
import _ from 'lodash';
import './index.less';

async function addFile(url: string, data: any) {
  try {
    // Add the new friend!
    await db.file.add({
      url: url,
      data: data,
    });
  } catch (error) {
  }
}

async function getFile(url: string) {
  try {
    return await db.file.get(url);
  } catch (error) {
  }
}

/**
 * @description 播放组件
 * @param props
 * */

const Player: React.FC<any> = (props) => {
  const { children } = props;

  const urls = Array.from({ length: 20 }, (v, i) => {
    return {
      url: `https://picsum.photos/1200/800?random=${i}`,
      status: false,
    };
  });

  const [sources, setSources] = useState<any>(urls);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevCurrentIndex = () => {
    if (currentIndex === 0) {
      return;
    }
    setCurrentIndex(currentIndex - 1);
  };

  const nextCurrentIndex = () => {
    if (currentIndex === sources.length - 1) {
      return;
    }
    setCurrentIndex(currentIndex + 1);
  };
  const sendRequest = (
    requestList: any[],
    limits: number,
    callback: (index?: number, res?: any) => void,
  ) => {
    const processRequest = async (params: { url: string }) => {
      return request(params.url, {
        method: 'GET',
        getResponse: true,
        responseType: 'blob',
      });
    };
    const requestQueue = [...requestList];
    const sendNextRequest = async () => {
      if (requestQueue.length === 0) {
        callback(); // 所有请求完成后调用回调函数
        return;
      }
      const index = requestList.length - requestQueue.length;
      const req = requestQueue.shift();
      try {
        const res = await getFile(req.url);
        if (res) {
          callback(index, res);
        } else {
          const result = await processRequest(req);
          if (result) {
            await addFile(result.config.url as string, result.data);
          }
          callback(index, result); // 请求完成后调用回调函数
        }
      } catch (error) {
        console.error('Error occurred:', error);
      } finally {
        sendNextRequest(); // 处理下一个请求
      }
    };
    for (let i = 0; i < limits; i++) {
      sendNextRequest(); // 启动请求队列处理
    }
  };

  useEffect(() => {
    const responses = [...sources];
    sendRequest(sources, 3, (index, res) => {
      if (res && !_.isNil(index)) {
        responses[index] = {
          url: res.url || res.config.url,
          data: res.data,
          status: true,
        };
        setSources([...responses]);
      }
    });
  }, []);

  return (
    <div className="player">
      <PlayerContext.Provider value={sources[currentIndex]}>
        {children}
      </PlayerContext.Provider>

      <Flex align={'center'}>
        <Space>
          <CaretLeftOutlined
            onClick={() => {
              prevCurrentIndex();
            }}
          />
          <PlayCircleOutlined />
          <CaretRightOutlined
            onClick={() => {
              nextCurrentIndex();
            }}
          />
        </Space>
        <Flex align={'center'}>
          {sources.map((item: any, index: number) => {
            return (
              <div
                key={item.url}
                style={{
                  width: '24px',
                  height: '24px',
                  margin: '0 3px',
                  lineHeight: '24px',
                  border: '1px solid #000000',
                  borderRadius: '5px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  background: currentIndex === index ? 'yellow' : '',
                }}
                onClick={() => {
                  setCurrentIndex(index);
                }}
              >
                {item.status ? (
                  index + 1
                ) : (
                  <LoadingOutlined style={{ fontSize: '14px' }} />
                )}{' '}
              </div>
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
};

export default Player;
