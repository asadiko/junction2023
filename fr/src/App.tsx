import { useRoute } from "./routes"

function App() {

  const route = useRoute()

  return (
    <div>
      {route}
    </div>
  )
}

export default App