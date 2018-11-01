import * as React from "react";

import { Card } from "@blueprintjs/core";

import text from "../../constants/text";
const AboutPanel = () => {
    return <Card>{text.panels.about.info}</Card>;
};

export default AboutPanel;
