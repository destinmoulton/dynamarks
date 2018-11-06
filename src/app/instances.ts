import DynalistAPI from "../common/dynalistapi";
import KernelMessenger from "./lib/kernelmessenger";
import Dispatcher from "../common/dispatcher";
import Settings from "../common/settings";

const dispatcher = new Dispatcher();

const kernelmessenger = new KernelMessenger(dispatcher);
const settings = new Settings();
const dynalistapi = new DynalistAPI(settings);

export { dispatcher, dynalistapi, kernelmessenger, settings };
