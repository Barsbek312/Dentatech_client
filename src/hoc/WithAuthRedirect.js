import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";

export const WithAuthRedirect = (Component) => {

    const RedirectComponent = (props) => {

        const navigate = useNavigate();
        const {isAuth, loadingUser} = useSelector(state => state.user);

        if(!isAuth && !loadingUser) return navigate('/login');
        return <Component {...props} />

    }

    return RedirectComponent;

    //WithAuthRedirect.js:11 You should call navigate() in a React.useEffect(), not when your component is first rendered.

} 