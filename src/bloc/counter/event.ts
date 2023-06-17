import { $state, CounterState, CounterStatus, setState } from "./state"

export class CounterEvent { }

export class IncrementEvent implements CounterEvent {
    constructor(private counterValue: number) { }

    increment() {
        setState(CounterState.copyWith(CounterStatus.Added, $state().counterValue + this.counterValue))
    }
}

export class DecrementEvent implements CounterEvent {
    constructor(private counterValue: number) { }

    decrement() {
        setState(CounterState.copyWith(CounterStatus.Substract, $state().counterValue - this.counterValue))
    }
}
