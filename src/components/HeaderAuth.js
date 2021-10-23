import { Button } from "@material-ui/core"
import StringUtil from "../utils/StringUtil"

const HeaderAuth = (prop) => {
    return (
        <div>
          <Button size="small" variant="contained" color="primary" onClick={() => prop.logout()}>{StringUtil.shortenWallet(prop.wallet)}</Button>
          <h5>{prop.balance}</h5>
          <Button size="small" variant="contained" color="primary">getBalance()</Button>
        </div>
    )
}

const walletWrapper={
    fontWeight:100,
    fontSize:'1em',
    fontSmooth:"auto",
    border:"1px solid grey",
    padding:'10px',
    margin:'auto',
    position:'relative',
    borderRadius:'10px 10px 10px 10px',
    
}
export default HeaderAuth