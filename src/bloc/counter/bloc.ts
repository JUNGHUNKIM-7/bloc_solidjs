import { createSignal } from 'solid-js'
import { CounterState } from './state'

export enum CounterStatus {
	Initial,
	Added,
	Substract,
}

export const [$state, setState] = createSignal<CounterState>(
	new CounterState(CounterStatus.Initial, 0),
)

class CounterEvent {}

export class IncrementEvent implements CounterEvent {
	constructor(private counterValue: number) {}

	increment() {
		setState(
			CounterState.copyWith(
				CounterStatus.Added,
				$state().counterValue + this.counterValue,
			),
		)
	}
}

export class DecrementEvent implements CounterEvent {
	constructor(private counterValue: number) {}

	decrement() {
		setState(
			CounterState.copyWith(
				CounterStatus.Substract,
				$state().counterValue - this.counterValue,
			),
		)
	}
}

export default class CounterBloc {
	constructor() {}

	get state() {
		return $state()
	}

	set eventSink(e: CounterEvent) {
		if (e instanceof IncrementEvent) e.increment()
		else if (e instanceof DecrementEvent) e.decrement()
	}
}
