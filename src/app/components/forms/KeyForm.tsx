import * as React from "react";
import { connect } from "react-redux";
import { Button, Card, FormGroup, TextArea, Spinner } from "@blueprintjs/core";

import settingsConstants from "../../../common/constants/settings.constants";
import * as SettingsActions from "../../redux/actions/settings.actions";
import * as Types from "../../../common/types";
import { dynalistapi, settings } from "../../instances";

interface IMapDispatchToProps {
    settingsSet: (key: string, value: any) => void;
}

interface IProps {}

type TKeyFormProps = IProps & IMapDispatchToProps;

interface IState {
    isValidatingToken: boolean;
}

class KeyForm extends React.Component<TKeyFormProps, IState> {
    textarea: any;

    constructor(props: TKeyFormProps) {
        super(props);

        this.textarea = React.createRef();

        this.state = {
            isValidatingToken: false
        };
    }

    handleContinue = () => {
        const token = this.textarea.current.value;

        if (token === "") return;

        this.setState({ isValidatingToken: true });

        dynalistapi.isTokenValid(token).then((isValid: boolean) => {
            this.setState({
                isValidatingToken: false
            });
            if (isValid) {
                settings.set(settingsConstants.token, token).then(() => {
                    settings.debug();
                    this.props.settingsSet(settingsConstants.token, token);
                });
            }
        });
    };

    private _domForm() {
        return (
            <div>
                <FormGroup
                    label="Dynalist API Secret Token"
                    labelFor="dynalist-token"
                >
                    <textarea
                        className="dkmks-keyform-textarea"
                        id="dynalist-token"
                        ref={this.textarea}
                    />
                </FormGroup>
                <div className="dkmks-keyform-button-container">
                    <Button
                        onClick={this.handleContinue}
                        rightIcon="arrow-right"
                        intent="success"
                    >
                        Continue
                    </Button>
                </div>
                <div className="dkmks-keyform-infolink">
                    <a href="https://dynalist.io/developer" target="_blank">
                        Generate your API secret token.
                    </a>
                </div>
            </div>
        );
    }

    render() {
        const { isValidatingToken } = this.state;

        let view = <Spinner />;
        if (!isValidatingToken) {
            view = this._domForm();
        }
        return <Card elevation={2}>{view}</Card>;
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
)(KeyForm);
