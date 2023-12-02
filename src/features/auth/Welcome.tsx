import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logOut, selectCurrentToken, selectCurrentUser } from "./authSlice";
import { useLogOutMutation } from "./authApiSlice";

const Welcome = () => {
  const user = useAppSelector(selectCurrentUser)
  const token = useAppSelector(selectCurrentToken)
  const [logout] = useLogOutMutation();

  const dispatch = useAppDispatch()
  
  async function handleClick(){
    await logout({}).unwrap()
    dispatch(logOut())
  }

  const welcome = user ? `Welcome ${user.email}` : 'Welcome!'
  const tokenAbbr = token?.slice(0, 6);
  return (
    <section>
      <h1>{welcome}</h1>
      <p>Token: {tokenAbbr}</p>
      <p><Link to={'/users'}>Go to users list</Link></p>
      <button onClick={handleClick}>Logout</button>
    </section>
  )
}

export default Welcome