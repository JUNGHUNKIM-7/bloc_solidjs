import { Match, Switch, createSignal } from 'solid-js'
import CounterBloc, {
	CounterStatus,
	DecrementEvent,
	IncrementEvent,
} from '../bloc/counter/bloc'
import ChildCounter from './ChildCounter'
import AnotherCounter from './AnotherCounter'

export default function Counter() {
	const counterBloc: CounterBloc = new CounterBloc()

	return (
		<>
			<Switch fallback={<div>no State</div>}>
				<Match when={counterBloc.state.status === CounterStatus.Added}>
					state: added
				</Match>
				<Match
					when={counterBloc.state.status === CounterStatus.Substract}
				>
					state: substracted
				</Match>
			</Switch>

			<div>{counterBloc.state.counterValue}</div>

			<ChildCounter counterBloc={counterBloc} />

			<AnotherCounter />

			<div>
				<button
					onClick={() =>
						counterBloc.eventSink = new IncrementEvent(1)}
				>
					+
				</button>
			</div>

			<div>
				<button
					onClick={() =>
						counterBloc.eventSink = new DecrementEvent(1)}
				>
					-
				</button>
			</div>
		</>
	)
}
