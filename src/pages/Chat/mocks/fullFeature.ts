export const example = {
  initialChats: [
    {
      content: '你是谁？',
      createAt: 1697862242452,
      id: 'ZGxiX2p4',
      role: 'user',
      updateAt: 1697862243540,
    },
    {
      content: '请回复我！我要生气了！',
      createAt: 1697862242453,
      id: 'ZGxiX2JQ',
      role: 'user',
      updateAt: 1697862243540,
    },
    {
      content: `我怎么知道我是谁！`,
      createAt: 1697862242458,
      id: 'Sb5pAzLL',
      role: 'assistant',
      updateAt: 1697862243540,
    },
  ],
  chats: [],
  config: {
    model: 'gpt-3.5-turbo',
    params: {
      frequency_penalty: 0,
      presence_penalty: 0,
      temperature: 0.6,
      top_p: 1,
    },
    systemRole: '',
  },
};