import { createSignal } from "solid-js";
import { CounterState, Status } from "./state";
import { IncrementEvent, DecrementEvent, CounterEvent } from "./event";

export const [state, setState] = createSignal<CounterState>(new CounterState(Status.Initial, 0))
export const [event, setEvent] = createSignal<CounterEvent | null>(null)

export default class CounterBloc {
    private constructor() { }

    static get stateGetter() {
        return state()
    }

    static get eventGetter() {
        return event()
    }

    static eventSink(e: CounterEvent) {
        setEvent(e);

        if (e instanceof IncrementEvent) e.increment()
        else if (e instanceof DecrementEvent) e.decrement()
    }
}

export const e = (e: CounterEvent) => CounterBloc.eventSink(e)