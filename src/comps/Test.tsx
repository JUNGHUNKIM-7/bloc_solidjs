import { Match, Switch } from "solid-js"
import CounterBloc, { DecrementEvent, IncrementEvent, States, Event } from "../bloc/Counter"

export default function Test() {
    const s = CounterBloc.getter
    const e = (e: Event) => CounterBloc.eventSink(e)


    return (
        <>
            <Switch fallback={ <div>no State</div> }>
                <Match when={ s.status == States.Added }>state: added</Match>
                <Match when={ s.status == States.Substract }>state: substracted</Match>
            </Switch>
            <div>{ s.value }</div>

            <div>
                <button onClick={ () => e(new IncrementEvent(1)) }>+</button>
            </div>
            <div>
                <button onClick={ () => e(new IncrementEvent(1)) }>+</button>
            </div>
            <div>
                <button onClick={ () => e(new DecrementEvent(1)) }>-</button>
            </div>
            <div>
                <button onClick={ () => e(new DecrementEvent(1)) }>-</button>
            </div>
        </>
    )
}
