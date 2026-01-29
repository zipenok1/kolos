import { useContext } from 'react'
import { Context } from './main'
import { observer } from 'mobx-react-lite'
import AppRouter from './components/AppRouter'

const App = observer(() => {
  const { user } = useContext(Context)

  if (user.isLoading) {
    return <> загрузка... </>
  }

  return (
    <div>
      <AppRouter/>
    </div>
  )
})

export default App


