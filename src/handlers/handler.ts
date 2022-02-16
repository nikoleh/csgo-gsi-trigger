import { Action } from "../types";

export interface Handler {
    handle: (action: Action) => void
}