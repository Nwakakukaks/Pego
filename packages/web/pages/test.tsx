import { Blockchains } from '@core/enums/blockchains';
import axios from 'axios';
import type { NextPage } from 'next';

/**
 * Steps:
- Choose a template
- Enter details or fields
- Review code
- Code analysis (Pro)
- Deploy
 */
const TestPage: NextPage = () => {
  const handleClick = async () => {
    console.log('handleClick');

    // const response = await fetch('/api/compile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({}),
    // });
    // const { bytecode, abi } = await response.json();

    // console.log('bytecode');
    // console.log(bytecode);

    // console.log('abi');
    // console.log(abi);

    const blockchain = Blockchains.Network;
    const walletAddress = 'testwallet1';
    const signature = 'testsignature1';

    const response = await axios.post('/api/auth/signin', {
      blockchain,
      walletAddress,
      signature,
    });

    console.log(response);
  };

  return (
    <div>
      <button onClick={() => handleClick()}>Execute</button>
    </div>
  );
};

export default TestPage;
