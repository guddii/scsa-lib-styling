import { scsa } from "@scsa/base";
import { ParamsDictionary } from "express-serve-static-core";

interface DropdownOptions {
    label: string;
    text: string;
    items?: DropdownItem[];
}

export class Dropdown {
    private label: string;
    private text: string;
    private items: DropdownItem[];

    constructor(options: DropdownOptions) {
        this.label = options.label;
        this.text = options.text;
        this.items = options.items;
    }
}

interface Route {
    js?: string;
    endpoint?: string;
    construction?: string;
    channel?: string;
    routing?: string;
    transformation?: string;
}

interface DropdownItemOptions {
    text?: string;
    href?: URL;
    route?: Route;
    dom?: string;
}

function buildURL(params: ParamsDictionary, overwrite: Route) {
    const string = {
        ...params,
        ...overwrite
    };
    return new URL(
        // Replace with parameter
        "http://localhost:4010/" +
        Object.values(string)
            .map(i => encodeURIComponent(i))
            .join("/")
    );
}

export class DropdownItem extends scsa.Application {

    constructor(options: DropdownItemOptions, params?: ParamsDictionary) {
        super({
            text: options.text || Object.values(options.route).join(),
            href: options.href || buildURL(params, options.route)
        });
    }

}
