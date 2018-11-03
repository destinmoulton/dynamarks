import KernelMessenger from "./lib/kernelmessenger";
import Dispatcher from "../common/dispatcher";
import Settings from "../common/settings";

const dispatcher = new Dispatcher();
const kernelmessenger = new KernelMessenger(dispatcher);
const settings = new Settings();

export { dispatcher, kernelmessenger, settings };
