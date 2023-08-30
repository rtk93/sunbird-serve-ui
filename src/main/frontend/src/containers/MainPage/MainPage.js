import './MainPage.css'
import { BrowserRouter, Switch, Route} from 'react-router-dom'
import SideNav from '../../components/SideNav/SideNav'
import Header from '../../components/Header/Header'
import Dashboard from '../../components/Dashboard/Dashboard'
import Needs from '../../components/Needs/Needs'
import Settings from '../../components/Settings/Settings'
import Accounts from '../../components/Accounts/Accounts'
import Help from '../../components/Help/Help'
import NeedPlans from '../../components/Need Plans/NeedPlans'
import Registration from '../../components/Registration/Registration'
import RegFormHeader from '../../components/RegFormHeader/RegFormHeader'
import RegFormFooter from '../../components/RegFormFooter/RegFormFooter'
import RegFormSuccess from '../../components/RegFormSuccess/RegFormSuccess'
import RegFormFailure from '../../components/RegFormFailure/RegFormFailure'
const MainPage = () => {
    return(
        <BrowserRouter>
            {/* <div className="mainPage">
                <SideNav/>
                <div className="wrapDisplay">
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route path="/needs" component={Needs} />
                        <Route path="/settings" component={Settings} />
                        <Route path="/accounts" component={Accounts} />
                        <Route path="/help" component={Help} />
                        <Route path="/needPlans" component={NeedPlans} />
                    </Switch>
                </div>
            </div> */}
            <RegFormHeader />
            <Registration />
            {/* <RegFormSuccess /> */}
            {/* <RegFormFailure /> */}
            <RegFormFooter />
        </BrowserRouter>
    )
}

export default MainPage

