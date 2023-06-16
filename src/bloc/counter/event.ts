import { setState, state } from "./bloc"
import { CounterState, Status } from "./state"

export class CounterEvent { }

export class IncrementEvent extends CounterEvent {
    constructor(private counterValue: number) {
        super()
    }

    increment() {
        setState(CounterState.copyWith(Status.Added, state().counterValue + this.counterValue))
    }
}

export class DecrementEvent extends CounterEvent {
    constructor(private counterValue: number) {
        super()
    }

    decrement() {
        setState(CounterState.copyWith(Status.Substract, state().counterValue - this.counterValue))
    }
}
