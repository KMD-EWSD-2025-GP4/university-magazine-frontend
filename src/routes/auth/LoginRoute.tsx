export function LoginRoute() {
  console.log(import.meta.env.VITE_API_URL);

  return (
    <div>
      <form>
        <input type="text" placeholder="username" />
        <input type="text" placeholder="password" />
        <button>login</button>
      </form>
    </div>
  );
}
