import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import WishForm from '../components/WishForm'
import WishItem from '../components/WishItem'
import Spinner from '../components/Spinner'
import { getWish, reset } from '../features/wish/wishSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { wish, isLoading, isError, message } = useSelector(
    (state) => state.wish
  )

  useEffect(() => {
    if (isError) {
      console.log(message)
    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getWish())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Wish list Dashboard</p>
      </section>

      <WishForm />

      <section className='content'>
        {wish.length > 0 ? (
          <div className='goals'>
            {wish.map((myWish) => (
              <WishItem key={myWish._id} wish={wish} />
            ))}
          </div>
        ) : (
          <h3>You haven't list any wish</h3>
        )}
      </section>
    </>
  )
}

export default Dashboard