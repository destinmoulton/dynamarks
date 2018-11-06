import DynalistAPI from "../common/dynalistapi";
import KernelMessenger from "./lib/kernelmessenger";
import Dispatcher from "../common/dispatcher";
import Settings from "../common/settings";

const dispatcher = new Dispatcher();
const dynalistapi = new DynalistAPI();
const kernelmessenger = new KernelMessenger(dispatcher);
const settings = new Settings();

export { dispatcher, dynalistapi, kernelmessenger, settings };
