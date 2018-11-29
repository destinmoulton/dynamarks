import * as React from "react";
import * as platform from "platform";

interface IProps {}
interface IState {
    os: string;
    browser: string;
    name: string;
}
class InstallationForm extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            os: platform.os.toString(),
            browser: platform.name.toString(),
            name: platform.os.toString() + platform.name.toString()
        };
    }

    private _onChange(name: string, evt: React.FormEvent<HTMLInputElement>) {
        let obj: any = {};
        obj[name] = evt.currentTarget.value;
        this.setState(obj);
    }

    render() {
        const { os, browser, name } = this.state;
        return (
            <div>
                <label>OS</label>
                <input
                    type="text"
                    value={os}
                    onChange={this._onChange.bind(this, "os")}
                />
                <label>Browser</label>
                <input
                    type="text"
                    value={browser}
                    onChange={this._onChange.bind(this, "browser")}
                />
                <label>Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={this._onChange.bind(this, "name")}
                />
            </div>
        );
    }
}

export default InstallationForm;
