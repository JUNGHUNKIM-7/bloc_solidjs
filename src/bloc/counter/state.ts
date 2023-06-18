import { counter } from '../bloc'

//Staus with State
export enum CounterStatus {
	Initial,
	Added,
	Substract,
}

export default class CounterState {
	constructor(public status: CounterStatus, public counterValue: number) {}

	static copyWith(status?: CounterStatus, value?: number): CounterState {
		return new CounterState(
			status ?? counter().status,
			value ?? counter().counterValue,
		)
	}
}