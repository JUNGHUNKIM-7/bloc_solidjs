import { createSignal } from "solid-js";
import { CounterState, CounterStatus } from "./state";
import { IncrementEvent, DecrementEvent, CounterEvent } from "./event";

export const [state, setState] = createSignal<CounterState>(new CounterState(CounterStatus.Initial, 0))

export default class CounterBloc {
    private constructor() { }

    static get stateGetter() {
        return state()
    }

    static eventSink(e: CounterEvent) {
        if (e instanceof IncrementEvent) e.increment()
        else if (e instanceof DecrementEvent) e.decrement()
    }
}

export const e = (e: CounterEvent) => CounterBloc.eventSink(e)