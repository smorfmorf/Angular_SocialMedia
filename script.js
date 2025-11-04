// Робот который выполняет код (Call Stack)

console.log(2);
name();

console.log(1);

async function name() {
  // асинхроное действие
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  const data = await res.json();

  console.log(data);

  for (const obj of data) {
    console.log(`user ${obj.id} message: ${obj.title}`);
  }
}
