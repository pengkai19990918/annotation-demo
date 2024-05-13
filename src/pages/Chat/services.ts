import {
  EventStreamContentType,
  fetchEventSource,
} from '@microsoft/fetch-event-source';
import { request } from '@umijs/max';

class RetriableError extends Error {}
class FatalError extends Error {}

// 普通输出
export async function qwen(params: any) {
  const model = {
    model: 'qwen-turbo',
    input: {
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant.',
        },
        ...params,
      ],
    },
    parameters: {
      result_format: 'text',
    },
  };

  return request('api/', {
    method: 'POST',
    data: {
      ...model,
    },
  });
}

// stream输出
export async function qwenStream(params: any, onMessage: (msg: any) => void) {
  const model = {
    // model: 'qwen-turbo',
    model: 'qwen-max-0428',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant.',
      },
      ...params,
    ],
    stream: true,
  };

  const ctrl = new AbortController();

  const finish = () => {};

  ctrl.signal.onabort = finish;

  let remainText = '';

  const fetchEvent = fetchEventSource('api/stream', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(model),
    signal: ctrl.signal,
    async onopen(response) {
      if (
        response.ok &&
        response.headers.get('content-type')?.startsWith(EventStreamContentType)
      ) {
        return; // everything's good
      }

      if (
        response.status >= 400 &&
        response.status < 500 &&
        response.status !== 429
      ) {
        // client-side errors are usually non-retriable:
      } else {
      }

      ctrl.abort();
      return finish();
    },
    onmessage(msg) {
      // if the server emits an error message, throw an exception
      // so it gets handled by the onerror callback below:      
      onMessage(msg);
      // if (msg.data === '[DONE]') {
      //   return finish();
      // }

      const text = msg.data;
      try {
        const json = JSON.parse(text);
        const choices = json.choices as Array<{
          finish_reason: string;
          delta: { content: string };
        }>;
        const delta = choices[0]?.delta?.content;

        if (delta) {
          remainText += delta;
        }

        if (choices[0]?.finish_reason === 'stop') {
          return finish();
        }
      } catch (e) {
        console.error('[Request] parse error', text, msg);
      }
    },
    onclose() {
      ctrl.abort();
      finish();
    },
    onerror(err) {
      console.log(err, 222222);
      ctrl.abort();
      finish();
      if (err instanceof FatalError) {
        throw err; // rethrow to stop the operation
      } else {
        // do nothing to automatically retry. You can also
        // return a specific retry interval here.
      }
    },
  });
}
