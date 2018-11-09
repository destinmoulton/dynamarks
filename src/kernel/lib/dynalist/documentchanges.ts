import { node } from "prop-types";

interface INodeChange {
    action: string;
    parent_id?: string;
    node_id?: string;
    content?: string;
    note?: string;
}

class DocumentChanges {
    changes: INodeChange[] = null;

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

    private addChange(change: INodeChange) {
        this.changes.push(change);
    }

    public getChanges() {
        return this.changes;
    }
}

export default DocumentChanges;
