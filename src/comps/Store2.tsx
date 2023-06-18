import { createStore, produce } from 'solid-js/store'

interface Category {
	sub: SubCategory
	tags: string[]
}

interface SubCategory {
	name: string
}

const [category, setCategory] = createStore<Category>({} as Category)

export default function MoreComp() {
	let inputRef!: HTMLInputElement

	function updateSub() {
		setCategory('sub', (prev) => ({ ...prev, name: inputRef.value }))
	}

	function insertTag(s: string) {
		setCategory('tags', (prev) => [...prev ?? [], s])
		setCategory(produce((category) => (category.tags ?? []).push(s)))
	}

	return (
		<div>
			<input ref={inputRef} type='text' name='sub' id='sub' />
			<button onClick={updateSub}>update subcategory</button>
			<input type='text' name='tag' id='tag' />
			<button onClick={() => insertTag('hi')}>insert tag</button>
			<div>
				{JSON.stringify(category, null, 2)}
			</div>
		</div>
	)
}
