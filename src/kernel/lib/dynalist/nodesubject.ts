/**
 * NodeSubject is the Subject for
 * data Observables
 **/
import debug from "debug";
import * as Types from "../../../common/types";
import DocumentChanges from "./documentchanges";
import DynalistAPI from "../../../common/dynalistapi";
import NodeList from "./nodelist";

const log = debug("kernel:nodesubject");
class NodeSubject extends Types.OOSubject {
    protected observers: Types.OOObserver[];
    private iDynalistAPI: DynalistAPI;
    private nodelist: NodeList = null;

    constructor(dynalistapi: DynalistAPI) {
        super();

        this.iDynalistAPI = dynalistapi;
    }

    public registerObserver(observer: Types.OOObserver) {
        this.observers.push(observer);
    }

    protected notifyObservers() {
        for (let obs of this.observers) {
            obs.update(this.nodelist);
        }
    }

    public async getData() {
        await this.populateNodes();
        this.notifyObservers();
    }

    public async modifyData(changes: DocumentChanges) {
        await this.iDynalistAPI.submitChanges(changes);
        await this.getData();
    }

    private async populateNodes() {
        try {
            const nodes = await this.iDynalistAPI.getNodes();
            this.nodelist = new NodeList(nodes);
        } catch (err) {
            log("ERROR :: populateNodes() :: Error getting the nodes.", err);
        }
    }
}

export default NodeSubject;
