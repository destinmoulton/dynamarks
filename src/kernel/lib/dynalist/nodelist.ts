import debug from "debug";
import { find, isArray, isObject, keys, remove, values } from "lodash";

import * as Types from "../../../common/types";

const log = debug("kernel:nodelist");
class NodeList extends Types.OONodeList {
    protected nodes: Types.IDynalistNode[];

    constructor(nodes: Types.IDynalistNode[]) {
        super();
        this.nodes = nodes;
    }
    public getSingleByName(name: string): Types.IDynalistNode {
        return find(this.nodes, { content: name });
    }

    public getSingleById(id: string): Types.IDynalistNode {
        return find(this.nodes, { id });
    }

    public getChildByIndex(
        parent_id: string,
        child_index: number
    ): Types.IDynalistNode {
        const parent = this.getSingleById(parent_id);
        if (isArray(parent.children) && parent.children.length > 0) {
            return this.getSingleById(parent.children[child_index]);
        }
        return null;
    }

    public getChildren(parent_node_id: string) {
        const node = this.getSingleById(parent_node_id);
        let children: Types.IDynalistNode[] = [];
        if (node.children instanceof Array && node.children.length > 0) {
            for (let childId of node.children) {
                children.push(this.getSingleById(childId));
            }
        }
        return children;
    }
}

export default NodeList;
