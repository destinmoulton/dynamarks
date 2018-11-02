import KernelMessenger from "./lib/kernelmessenger";
import Dispatcher from "../common/dispatcher";

const kernelmessenger = new KernelMessenger();
const dispatcher = new Dispatcher();

export { dispatcher, kernelmessenger };
