import * as Types from "../../../common/types";

class DocumentChanges {
    changes: Types.IDynalistNodeChange[] = null;
    constructor() {
        this.changes = [];
    }

    public addNode(parentId: string, nodeTitle: string, nodeNote: string = "") {
        const change = {
            action: "insert",
            parent_id: parentId,
            content: nodeTitle,
            note: nodeNote
        };

        this.addChange(change);
    }

    public editNode(nodeId: string, nodeTitle: string, nodeNote: string = "") {
        const change = {
            action: "edit",
            node_id: nodeId,
            content: nodeTitle,
            note: nodeNote
        };

        this.addChange(change);
    }

    public deleteNode(nodeId: string) {
        const change = {
            action: "delete",
            node_id: nodeId
        };

        this.addChange(change);
    }

    private addChange(change: Types.IDynalistNodeChange) {
        this.changes.push(change);
    }

    public getChanges() {
        return this.changes;
    }
}

export default DocumentChanges;
