import { ProChat } from '@ant-design/pro-chat';
import { useTheme } from 'antd-style';
import './index.less';
import { example } from './mocks/fullFeature';
import { qwenStream } from './services';

export default () => {
  const theme = useTheme();

  const readableStream = new ReadableStream({
    async start(controller) {
      function push() {
        // reader
        //   .read()
        //   .then(({ done, value }) => {
        //     if (done) {
        //       controller.close();
        //       return;
        //     }
        //     const chunk = decoder.decode(value, { stream: true });
        //     const message = chunk.replace('data: ', '');
        //     const parsed = JSON.parse(message);
        //     controller.enqueue(encoder.encode(parsed.choices[0].delta.content));
        //     push();
        //   })
        //   .catch((err: any) => {
        //     console.error('读取流中的数据时发生错误', err);
        //     controller.error(err);
        //   });
      }
      push();
    },
  });

  return (
    <div className={'container'} style={{ background: theme.colorBgLayout }}>
      <ProChat
        helloMessage={
          '欢迎使用 ProChat ，我是你的专属机器人，这是我们的 Github：[ProChat](https://github.com/ant-design/pro-chat)'
        }
        request={async (messages) => {
          // 获取 reader
          const encoder = new TextEncoder();

          const readableStream = new ReadableStream({
            async start(controller) {
              qwenStream(messages, (msg) => {
                const text = msg.data;
                try {
                  const json = JSON.parse(text);
                  const choices = json.choices as Array<{
                    finish_reason: string;
                    delta: { content: string };
                  }>;
                  const delta = choices[0]?.delta?.content;
                  
                  if (delta) {
                    controller.enqueue(encoder.encode(delta));
                  }

                  if (choices[0]?.finish_reason === 'stop') {
                    controller.close();
                  }
                } catch (e) {
                  console.error('[Request] parse error', text, msg);
                }
              });
            },
          });

          return new Response(readableStream);
        }}
        chats={example.chats}
        config={example.config}
      />
    </div>
  );
};
