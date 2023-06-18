
# signal
- run update
```ts
const [object, setObject] = createSignal({ count: 0 }, { equals: false });

setObject((current) => {
  current.count += 1;
  current.updated = new Date();
  return current;
});


-- Conditional update!
const [myString, setMyString] = createSignal("string", {
  equals: (newVal, oldVal) => newVal.length === oldVal.length,
});

```

# store(when [] or {}) update
- no key(list)
```ts
setTodo(0, "key", (value) => !value) // by index
or
setTodo((todo)=> todo.id === id, "key", (value) => !value) // by cond
or
setTodo([...todo, {id: 1, title: "title"}]) //override
```
- no key(object)
```ts
변경 함수는 이전 상태를 받아서 새 상태나 값을 반환하는 함수의 형태를 취할 수 있습니다. 객체는 항상 얕게 머지됩니다. 스토어에서 값을 삭제하려면 값을 undefined로 설정하세요.

//setState((prev) => {...prev, key: value}) // use prev object -> make new object (new key is optional)
//setState({all: value1, of: value2}) // make new object (new key is optional)
//default value is undefined.

//<Show when={!$store.name || $store.name?.length < 3}>
//...
//</Show>

const [state, setState] = createStore({
  firstName: "John",
  lastName: "Miller",
});

setState({ firstName: "Johnny", middleName: "Lee" });
// ({ firstName: 'Johnny', middleName: 'Lee', lastName: 'Miller' })

setState((state) => ({ preferredName: state.firstName, lastName: "Milner" }));
// ({ firstName: 'Johnny', preferredName: 'Johnny', middleName: 'Lee', lastName: 'Milner' })
```

- has key(object)
- list - INDEX or RANGE parameter
- if not, (prev) => { ...prev } // (prev) => [...prev, 1, 2] // (prev) => prev + 1 ..
```ts
const [state, setState] = createStore({
  counter: 2,
  list: [
    { id: 23, title: 'Birds' }
    { id: 27, title: 'Fish' }
  ]
});


// setState(key, (prev) => ..);
setState('counter', c => c + 1);
setState('list', l => [...l, {id: 43, title: 'Marsupials'}]); //or l.push({id: 43, title: 'Marsupials'}) ?

// key(list), INDEX or RANGE, key, set value
setState('list', 2, 'read', true);

// {
//   counter: 3,
//   list: [
//     { id: 23, title: 'Birds' }
//     { id: 27, title: 'Fish' }
//     { id: 43, title: 'Marsupials', read: true }
//   ]
// }
```

- LIST PROP: INDEX/RANGE/COND/ALL
```tsx
const [state, setState] = createStore({
  todos: [
    { task: 'Finish work', completed: false }
    { task: 'Go grocery shopping', completed: false }
    { task: 'Make dinner', completed: false }
  ]
});



// key(list), INDEX or RANGE, key, set value
setState('todos', [0, 2], 'completed', true);
// {
//   todos: [
//     { task: 'Finish work', completed: true }
//     { task: 'Go grocery shopping', completed: false }
//     { task: 'Make dinner', completed: true }
//   ]
// }

// key(list), INDEX or RANGE, key, set value
setState('todos', { from: 0, to: 1 }, 'completed', c => !c);
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping', completed: true }
//     { task: 'Make dinner', completed: true }
//   ]
// }

// key(list), COND, key, set value
setState('todos', todo => todo.completed, 'task', t => t + '!')
// {
//   todos: [
//     { task: 'Finish work', completed: false }
//     { task: 'Go grocery shopping!', completed: true }
//     { task: 'Make dinner!', completed: true }
//   ]
// }


// key(list), ALL, key, set value
setState('todos', {}, todo => ({ marked: true, completed: !todo.completed }))
// {
//   todos: [
//     { task: 'Finish work', completed: true, marked: true }
//     { task: 'Go grocery shopping!', completed: false, marked: true }
//     { task: 'Make dinner!', completed: false, marked: true }
//   ]
// }

const [category, setCategory] = createStore<Category>({} as Category)

export default function Store2() {
	let inputRef!: HTMLInputElement

	function updateSub() {
		setCategory('sub', (prev) => ({ ...prev, name: inputRef.value }))
	}

	function insertTag(s: string) {
		setCategory('tags', (prev) => [...prev ?? [], s])

    //update one by one
		setCategory(produce((category) => {
			category.sub.name = 'hi'
			;(category.tags ?? []).push(s)
		}))
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
```

# effect memorize with return keyword
```ts
createEffect((prev) => {
  const sum = a() + b();
  if (sum !== prev) console.log("sum changed to", sum);

  return sum; //momorize
}, 0); //value?
```

# update with signal with MEMO
- update시에 effect에 넣어 사용주의(무한실행)

```ts
const user = createMemo(() => searchForUser(username()));

Your email is <code>{user()?.email}</code>

만일 user 정의를 () => searchForUser(username()) 일반 함수로 교체하면, searchForUser는 두 번(각 리스트 아이템 업데이트시마다) 호출됩니다.

const sum = createMemo((prev) => input() + prev, 0); //value, like reduce()
```

```ts
export interface Wrapper {
    children: JSXElement
}

export interface TestProps extends Wrapper {
    title: string
    age: number
}
```
mutable list- for. i() - index subscribed list.

Can combine signal with property in store.

SetStore(primitive / function, key, value)

claaList={{ prop: signal() }}

const [Data] = CreateResource(getter - fn type not invoke, fetcher)
Data.loading : bool
Concept: Fetch + createEffect
```

# prop destructing 금지
- use mergeProps, separateProps
- use children(() => props.children)


# derived
```tsx
const double = () => coutner() * 2

```
# store
```tsx
const [user, setUser] = createStore({
    name: "Dave",
    age: 0
})
setUser("age", 1)
```

# default prop
```tsx
- astro
const props: MyComp = {
	title: "titles",
	age: 12,
};
---

<Layout title="Welcome to Astro.">
	<main>
		<Test {...props} client:load />

- tsx
export default function Test(prop: MyComp) {
    const { title, age } = mergeProps({ title: "default prop", age: 0 }, prop)
}
```

# sep prop with reactivity
```tsx
<Greeting greeting="Yo" name={name()} style="color: teal;" />

export default function Greeting(props) {
  const [local, others] = splitProps(props, ["greeting", "name"])
  return <h3 {...others}>{local.greeting} {local.name}</h3>
}
```

# CreateRenderEffect (Run with MicroStack)
```tsx
createRenderEffect(() => {
  console.log(counter())
})

//INGORE
setCounter(1)
setCounter(2)

//START RUN
queueMicrotask(() => {
  // 이제 `count = 2` 출력
  console.log("microtask");
  setCounter(3);  // 즉시 `count = 3` 출력
  console.log("goodbye");
});
```

# control
```tsx
- for
//mutable
<For each={} fallback={<div>fallback</div>}>
{(item, index) => (
  <div>
    #{index()} {item} // index is reactive
  </div>
)}

//immutable
<Index each={state.list} fallback={<div>Loading...</div>}>
  {(item, index) => (
    <div>
      #{index} {item()} // index is fixed
    </div>
  )}
</Index>

- switch
<Switch fallback={<p>{x()} is between 5 and 10</p>}>
  <Match when={x() > 10}>
    <p>{x()} is greater than 10</p>
  </Match>
  <Match when={5 > x()}>
    <p>{x()} is less than 5</p>
  </Match>
</Switch>

- Conditional render with dynamic
const RedThing = () => <strong style="color: red">Red Thing</strong>;
const GreenThing = () => <strong style="color: green">Green Thing</strong>;
const BlueThing = () => <strong style="color: blue">Blue Thing</strong>;

//obj to dynamic comp
const options = {
  red: RedThing,
  green: GreenThing,
  blue: BlueThing
}
<Dynamic component={options[selected()]} />
```

# toggle
```tsx
const isSelected = createSelector(selectedId);
<For each={list()}>
  {(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>;

<div classList={ { [style.active]: loading() } }>
```

# portal
- below document.body
- behave like z-index
```tsx
<Portal>
  <div class="popup">
    <h1>Popup</h1>
    <p>Some text you might need for something or other.</p>
  </div>
</Portal>
```

# err handling / if throw err in component
- throw Error("err")
```tsx
const Broken = (props) => {
  throw new Error("Oh No");
  return <>Never Getting Here</>
}

<Comp1>
//non block error
<ErrorBoundary fallback={err => err}>
    <Broken />
</ErrorBoundary>
<Comp2>
```

# onMount + onCleanup(LifeCycle)
- only run on client side!

# conditional
- use classList
- double curly brace, { {cssName: COND} }

```tsx
<button
  classList={{selected: current() === 'foo'}}
```

# ref
```tsx
let htmlElem

<tag ref={htmlElem}>
```

# Wrapper With <For></For>
```tsx
<ColoredList color={color()}>
  <For each={["Most", "Interesting", "Thing"]}>{item => <div>{item}</div>}</For>
</ColoredList>

export default function ColoredList(props) {
  const c = children(() => props.children);
  return <>{c()}</>
}

//set childrens
createEffect(() => c().forEach(item => item.style.color = props.color))
```

# commit multiple at once (batch)
```tsx
batch(() => {
  setFirstName(firstName() + "n");
  setLastName(lastName() + "!");
})
```

# createReaction - run only once, exclusive way
```tsx
const [s, set] = createSignal("start");

//아래의 EFFECT 실행!!! once!
const track = createReaction(() => console.log("something"));

// 다음에 s가 변경되면 리액션을 실행합니다. - make dependency
track(() => s());
set("end"); // "something"
set("final"); // 리액션은 첫 업데이트에서만 실행되기 때문에 작동하지 않으며, track 을 다시 호출해야 합니다.
```

# on/untrack - include/exclude only(signal)
```tsx
createEffect(on(a, (a) => {
  a 가 변하면, 아래 함수 실행
  console.log(a, b());
}, { defer: true }));
# untrack - off signal - untrack

a / b is signal
createEffect(() => {
  console.log(a(), untrack(b))
});
```

# Asyncronous
# lazy
```tsx
const Greeting = lazy(() => import("./greeting"));
```

# createResource
```tsx
const [data] = createResource<User[]>(async () => {
    return [{ name: "John" }, { name: "Dave" }]
}, { initialValue: [] as User[] })

const [user] = createResource(userId, fetchUser); //userId is dependency, changed, run fetchUser

const [user, {mutate - ??, refresh - refresh?}]

- PROPERTY
data.loading
data.error
```

# delayed loading(placeholder ) -> for lazy, createResource
```tsx
<Suspense fallback={<p>Loading...</p>}>
  <Greeting name="Jake" />
</Suspense>
```

# nested suspense or multiple suspend (rendering order ..)
```tsx
<Suspense fallback={<h1>Loading...</h1>}>
  <ProfilePage user={user()} posts={posts()} trivia={trivia()} />
</Suspense>

- ProfilePage (runBlocking + mutlple launches + join all)
revealOrder="forward"(정방향)/"backward"(역방향) / "together"(join all)
<SuspenseList revealOrder="together" tail="collapsed">
  <ProfileDetails user={props.user} />
  <Suspense fallback={<h2>Loading posts...</h2>}>
    <ProfileTimeline posts={props.posts} />
  </Suspense>
  <Suspense fallback={<h2>Loading fun facts...</h2>}>
    <ProfileTrivia trivia={props.trivia} />
  </Suspense>
</SuspenseList>
```

# handle form
```tsx
<form action="" method='post' onSubmit={ (e: Event) => {
  e.preventDefault()
  const form = e.target as HTMLFormElement
  const formData = new FormData(form)
  const name = formData.get("name")
  console.log(name)
  setLoading(true)
} }>
  <input type="text" name="name" />
  <button formaction="" aria-busy={ loading() }>submit button</button>
</form>
```

ref, onInput
```tsx
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

  <input
    ref={inputRef}
    type='text'
    id='name'
    value={$store.name ?? ''}
    onInput={(e) => {
      setStore(
        (prev) => ({
          ...prev,
          name: e.target.value,
        }),
      )
    }}
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

```