import { $state, type CounterStatus } from './bloc'

export class CounterState {
	constructor(public status: CounterStatus, public counterValue: number) {}

	static copyWith(status?: CounterStatus, value?: number): CounterState {
		return new CounterState(
			status ?? $state().status,
			value ?? $state().counterValue,
		)
	}
}
