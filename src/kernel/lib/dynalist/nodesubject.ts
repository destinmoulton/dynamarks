/**
 * NodeSubject is the Subject for
 * data Observables
 **/
import debug from "debug";
import * as Types from "../../../common/types";
import DynalistAPI from "../../../common/dynalistapi";

const log = debug("kernel:nodesubject");
class NodeSubject extends Types.OOSubject {
    protected observers: Types.OOObserver[];
    private iDynalistAPI: DynalistAPI;
    private nodes: Types.IDynalistNode[];

    constructor(dynalistapi: DynalistAPI) {
        super();

        this.iDynalistAPI = dynalistapi;
    }

    public registerObserver(observer: Types.OOObserver) {
        this.observers.push(observer);
    }

    protected notifyObservers() {
        for (let obs of this.observers) {
            obs.update(this.nodes);
        }
    }

    public async getNodes() {
        await this.populateNodes();
        this.notifyObservers();
    }

    private async populateNodes() {
        try {
            this.nodes = await this.iDynalistAPI.getNodes();
            log("populateNodes() :: nodes", this.nodes);
        } catch (err) {
            log("ERROR :: populateNodes() :: Error getting the nodes.", err);
        }
    }
}

export default NodeSubject;
