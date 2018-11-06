import * as React from "react";
import { connect } from "react-redux";
import { List } from "immutable";

import Loading from "../shared/Loading";
import Confirm from "../shared/Confirm";
import { dynalistapi } from "../../instances";
import * as Types from "../../../common/types";
import * as SettingsActions from "../../redux/actions/settings.actions";
import SettingsConstants from "../../../common/constants/settings.constants";

import text from "../../constants/text";

interface IMapDispatchToProps {
    settingsSet: (key: string, value: any) => void;
}
interface IProps {}
type TSelectDocProps = IProps & IMapDispatchToProps;
interface IState {
    docs: List<Types.IDynalistDocument>;
    isGettingDocs: boolean;
    isConfirmingDoc: boolean;
    selectedDoc: Types.IDynalistDocument;
}

class SelectDoc extends React.Component<TSelectDocProps, IState> {
    constructor(props: TSelectDocProps) {
        super(props);

        this.state = {
            docs: List<Types.IDynalistDocument>(),
            isConfirmingDoc: false,
            isGettingDocs: false,
            selectedDoc: null
        };
    }

    componentDidMount() {
        this.loadDocs();
    }

    private loadDocs() {
        this.setState({
            isGettingDocs: true
        });

        return dynalistapi.getTopDocs().then(docs => {
            this.setState({
                docs,
                isGettingDocs: false
            });
        });
    }

    private renderDocList() {
        const { docs } = this.state;

        const doclist = docs.map(doc => {
            return (
                <li
                    className="dkmks-selectdoc-list-item"
                    key={doc.id}
                    onClick={this.handleClickDoc.bind(this, doc)}
                >
                    {doc.title}
                </li>
            );
        });

        return (
            <div>
                Select a Dynalist Bookmarks Document
                <ul className="dkmks-selectdoc-list">{doclist}</ul>
            </div>
        );
    }

    private handleClickDoc(doc: Types.IDynalistDocument) {
        this.setState({
            isConfirmingDoc: true,
            selectedDoc: doc
        });
    }

    private handleConfirmCancel = () => {
        this.setState({
            isConfirmingDoc: false,
            selectedDoc: null
        });
    };

    private handleConfirmOk = () => {
        this.setState({
            isConfirmingDoc: false
        });
        return this.props.settingsSet(
            SettingsConstants.doc,
            this.state.selectedDoc
        );
    };

    render() {
        const {
            docs,
            isGettingDocs,
            isConfirmingDoc,
            selectedDoc
        } = this.state;
        let view = (
            <div>
                <Loading message={text.selectdoc.loading} />
            </div>
        );
        if (docs.size > 0 && !isGettingDocs) {
            if (!isConfirmingDoc) {
                view = this.renderDocList();
            } else {
                const message = `You have selected "${
                    selectedDoc.title
                }" as the bookmarks document. Three headings: 'Menu', 'Toolbar', and 'Unsorted' will be created (if they don't already exist). Are you sure you want to use this document?`;
                view = (
                    <Confirm
                        message={message}
                        cancelHandler={this.handleConfirmCancel}
                        okHandler={this.handleConfirmOk}
                    />
                );
            }
        }

        return view;
    }
}

const mapStateToProps = (state: Types.IRootStoreState) => {
    return {};
};

const mapDispatchToProps = (dispatch: Types.IDispatch): IMapDispatchToProps => {
    return {
        settingsSet: (key: string, value: any) =>
            dispatch(SettingsActions.set(key, value))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SelectDoc);
