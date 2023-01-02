import { useDispatch } from 'react-redux'
import { deleteWish } from '../features/wish/wishSlice'

function WishItem({ wish }) {
  const dispatch = useDispatch()

  return (
    <div className='goal'>
      <div>{new Date(wish.createdAt).toLocaleString('en-US')}</div>
      <h2>{wish.text}</h2>
      <button onClick={() => dispatch(deleteWish(wish._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default WishItem