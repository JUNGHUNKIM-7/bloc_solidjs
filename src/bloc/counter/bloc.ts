import { IncrementEvent, DecrementEvent, CounterEvent } from "./event";
import { $state } from "./state";


export default class CounterBloc {
    private constructor() { }

    static get stateGetter() {
        return $state()
    }

    static set eventSink(e: CounterEvent) {
        if (e instanceof IncrementEvent) e.increment()
        else if (e instanceof DecrementEvent) e.decrement()
    }
}
