import { Match, Switch } from "solid-js"
import CounterBloc, { DecrementEvent, IncrementEvent, States } from "../bloc/Counter"

export default function Test() {
    return (
        <>
            <Switch fallback={ <div>no State</div> }>
                <Match when={ CounterBloc.getter.status == States.Added }>state: added</Match>
                <Match when={ CounterBloc.getter.status == States.Substract }>state: substracted</Match>
            </Switch>
            <div>{ CounterBloc.getter.value }</div>
            <div>
                <button onClick={ () => CounterBloc.eventSink(new IncrementEvent(1)) }>+</button>
            </div>
            <div>
                <button onClick={ () => CounterBloc.eventSink(new IncrementEvent(1)) }>+</button>
            </div>
            <div>
                <button onClick={ () => CounterBloc.eventSink(new DecrementEvent(1)) }>-</button>
            </div>
            <div>
                <button onClick={ () => CounterBloc.eventSink(new DecrementEvent(1)) }>-</button>
            </div>
        </>
    )
}
