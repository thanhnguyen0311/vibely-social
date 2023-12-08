import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import GlobalStyles from "./Components/GlobalStyles"
import {Provider} from "react-redux";
import store from "~/app/store"
import {StompClientContextProvider} from "~/components/HOC_SocketClient/index.jsx";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
    <GlobalStyles>
        <Provider store={store}>
            <StompClientContextProvider>
                <App/>
            </StompClientContextProvider>
        </Provider>
    </GlobalStyles>
)

