import { createStore, produce } from 'solid-js/store'

interface Category {
	sub: SubCategory
	tags: string[]
}

interface SubCategory {
	name: string
}

const [category, setCategory] = createStore<Category>({} as Category)

export default function Store2() {
	let inputRef!: HTMLInputElement
	let inputRef2!: HTMLInputElement

	function updateSub() {
		setCategory('sub', (prev) => ({ ...prev, name: inputRef.value }))
	}

	function insertTag() {
		setCategory('tags', (prev) => [...prev ?? [], inputRef2.value])
		setCategory(produce((category) => {
			category.sub.name = 'hi'
			;(category.tags ?? []).push(inputRef2.value)
		}))
	}

	return (
		<div>
			<input ref={inputRef} type='text' name='sub' id='sub' />
			<button onClick={updateSub}>update subcategory</button>
			<input ref={inputRef2} type='text' name='tag' id='tag' />
			<button onClick={insertTag}>insert tag</button>
			<div>
				{JSON.stringify(category, null, 2)}
			</div>
		</div>
	)
}
