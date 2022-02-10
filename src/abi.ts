export default [
    {
      inputs: [
        {
          internalType: 'string',
          name: '_tweet',
          type: 'string',
        },
      ],
      name: 'addTweet',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '_address',
          type: 'address',
        },
      ],
      name: 'getTweets',
      outputs: [
        {
          internalType: 'string[]',
          name: '',
          type: 'string[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'string',
          name: '_tweet',
          type: 'string',
        },
      ],
      name: 'removeTweet',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
  ];