import { createSignal } from "solid-js";

export enum States {
    Initial,
    Added,
    Substract
}

class State {
    constructor(public status: States, public value: number) { }
}

class Event { }

export class IncrementEvent extends Event {
    constructor(private value: number) {
        super()
    }

    increment() {
        setState(new State(States.Added, state().value + this.value))
    }
}

export class DecrementEvent extends Event {
    constructor(private value: number) {
        super()
    }

    decrement() {
        setState(new State(States.Substract, state().value - this.value))
    }
}

const [state, setState] = createSignal<State>(new State(States.Initial, 0))
const [event, setEvent] = createSignal<Event | null>(null)

export default class CounterBloc {
    private constructor() { }

    static eventSink(e: Event) {
        setEvent(e);

        if (e instanceof IncrementEvent) {
            (event() as IncrementEvent).increment()
        } else if (e instanceof DecrementEvent) {
            (event() as DecrementEvent).decrement()
        }
    }

    static get getter() {
        return state()
    }
}
