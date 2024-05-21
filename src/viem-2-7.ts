import {
  BaseError,
  ContractFunctionExecutionError,
  createPublicClient,
  erc20Abi,
  getContract,
  http,
  zeroAddress,
} from "viem-2.7";
import { mainnet } from "viem-2.7/chains";

const client = createPublicClient({
  chain: mainnet,
  transport: http(),
});

const erc20Contract = getContract({
  address: zeroAddress,
  abi: erc20Abi,
  client,
});

async function query() {
  try {
    const supply = await erc20Contract.read.totalSupply();

    console.log(supply);
  } catch (error) {
    console.log("is instanceof BaseError: ", error instanceof BaseError);
    console.log(
      "is instanceof ContractFunctionExecutionError: ",
      error instanceof ContractFunctionExecutionError
    );

    if (error instanceof BaseError) {
      console.log("error.name: ", error.name);
    }
  }
}

query();
