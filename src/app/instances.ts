import KernelMessenger from "./lib/kernelmessenger";
import Dispatcher from "../common/dispatcher";

const dispatcher = new Dispatcher();
const kernelmessenger = new KernelMessenger(dispatcher);

export { dispatcher, kernelmessenger };
