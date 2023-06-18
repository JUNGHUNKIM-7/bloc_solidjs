import { Show } from 'solid-js'
import { createStore } from 'solid-js/store'

interface Forms {
	name: string
	first: string
	last: string
}

const [form, setForm] = createStore({} as Forms)

export default function Store() {
	let inputRef!: HTMLInputElement
	let inputRef2!: HTMLInputElement
	let inputRef3!: HTMLInputElement

	const [$store, setStore] = createStore<Forms>({} as Forms)

	return (
		<div>
			<div>
				<Show when={!$store.name || $store.name?.length < 3}>
					<div>name cant be less 3</div>
				</Show>
			</div>
			<div>
				<form>
					<input
						ref={inputRef}
						type='text'
						id='name'
						value={$store.name ?? ''}
						onInput={(e) => {
							console.log(inputRef.value)
							setStore(
								(prev) => ({
									...prev,
									name: e.target.value,
								}),
							)
						}}
					/>
					<input
						type='text'
						id='first'
						ref={inputRef2}
						value={$store.first ?? ''}
						onInput={(e) =>
							setStore(
								(prev) => ({
									...prev,
									first: e.target.value,
								}),
							)}
					/>
					<input
						type='text'
						id={'last'}
						ref={inputRef3}
						value={$store.last ?? ''}
						onInput={(e) =>
							setStore(
								(prev) => ({
									...prev,
									last: e.target.value,
								}),
							)}
					/>

					<button
						onClick={(e) => {
							e.preventDefault()
							setForm({
								first: inputRef2.value,
								last: inputRef3.value,
								name: inputRef.value,
							})
						}}
					>
						added
					</button>
				</form>
				<div>
					{JSON.stringify($store, null, 2)}
				</div>
				<div>
					{JSON.stringify(form, null, 2)}
				</div>
			</div>
		</div>
	)
}
