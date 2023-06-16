import { state } from "./bloc"

export enum Status {
    Initial,
    Added,
    Substract
}

export class CounterState {
    constructor(public status: Status, public counterValue: number) { }

    static copyWith(status?: Status, value?: number): CounterState {
        return new CounterState(status ?? state().status, value ?? state().counterValue)
    }

    static equal(other: CounterState): boolean {
        return other.counterValue === state().counterValue && other.status === state().status
    }
}